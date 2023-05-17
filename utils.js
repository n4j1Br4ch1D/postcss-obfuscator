const fs = require("fs");
const path = require("path");
const readline = require("readline");

const pluginName = "PostCSS Obfuscator";

function getRandomName(length) {
  // Generate a random string of characters with the specified length
  const randomString = Math.random()
    .toString(36)
    .substring(2, length - 1 + 2);
  // Combine the random string with a prefix to make it a valid class name (starts with a letter, contains only letters, digits, hyphens, and underscores)
  const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 97 is the ASCII code for lowercase 'a'
  return `${randomLetter}${randomString}`;
}

function simplifyString(str) {
  tempStr = str.replace(/[aeiouw\d_-]/gi, "");
  return tempStr.length < 1
    ? String.fromCharCode(Math.floor(Math.random() * 26) + 97) + tempStr
    : tempStr;
}

function writeJsonToFile(
  data,
  filePath,
  format = true,
  fresh = false,
  startOver = false
) {
  // If startOver is true, remove the directory path
  const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
  if (startOver) {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true });
      logger("info", pluginName, "Directory removed:", dirPath);
    }
  }

  // Create the directory path if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger("info", pluginName, "Directory created:", dirPath);
  }

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // Create the file with an empty object as the default content
    fs.writeFileSync(filePath, "{}");
    logger("info", pluginName, "File created:", filePath);
  }

  // Read the existing JSON data from the file
  let jsonData = fs.readFileSync(filePath);

  // Parse the existing JSON data
  let parsedData = JSON.parse(jsonData);

  // Merge the new data with the existing data
  const mergedData = fresh ? data : { ...data, ...parsedData };

  // Write the merged data to the file
  const outputData = format
    ? JSON.stringify(mergedData, null, 2)
    : JSON.stringify(mergedData);
  fs.writeFileSync(filePath, outputData);
  logger("info", pluginName, "Data written to file:", filePath);
}

function replaceJsonKeysInFiles(
  filesDir,
  htmlExtensions,
  htmlExclude,
  jsonDataPath,
  indicatorStart,
  indicatorEnd,
  keepData
) {
  // Read and merge the JSON data
  const jsonData = {};
  fs.readdirSync(jsonDataPath).forEach((file) => {
    const filePath = path.join(jsonDataPath, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    Object.assign(jsonData, fileData);
  });

  // Read and process the files
  const replaceJsonKeysInFile = (filePath) => {
    const fileExt = path.extname(filePath).toLowerCase();
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively process all files in subdirectories
      fs.readdirSync(filePath).forEach((subFilePath) => {
        replaceJsonKeysInFile(path.join(filePath, subFilePath));
      });
    } else if (
      htmlExtensions.includes(fileExt) &&
      !htmlExclude.includes(path.basename(filePath))
    ) {
      // Replace JSON keys in the file
      let fileContent = fs.readFileSync(filePath, "utf-8");
      Object.keys(jsonData).forEach((key) => {
        let keyUse = escapeRegExp(key.slice(1).replace(/\\/g, ""));
        let regex;                         
        regex = new RegExp(`([\\s"'\\\`]|^)(${keyUse})(?=$|[\\s"'\\\`])`, 'g'); // match exact wording & avoid ` ' ""
        fileContent = fileContent.replace(regex, `$1` + jsonData[key].slice(1).replace(/\\/g, "")); // capture preceding space
        if (indicatorStart || indicatorEnd) {
          regex = new RegExp(`([\\s"'\\\`]|^)(${indicatorStart ?? ''}${keyUse})(?=$|[\\s"'\\\`])`, 'g');
          fileContent = fileContent.replace(regex, `$1` + jsonData[key].slice(1).replace(/\\/g, ""));
          regex = new RegExp(`([\\s"'\\\`]|^)(${keyUse}${indicatorEnd ?? ''})(?=$|[\\s"'\\\`])`, 'g');
          fileContent = fileContent.replace(regex, `$1` + jsonData[key].slice(1).replace(/\\/g, ""));
          regex = new RegExp(`([\\s"'\\\`]|^)(${indicatorStart ?? ''}${keyUse}${indicatorEnd ?? ''})(?=$|[\\s"'\\\`])`, 'g');
          fileContent = fileContent.replace(regex, `$1` + jsonData[key].slice(1).replace(/\\/g, ""));
        }  
      });
      fs.writeFileSync(filePath, fileContent);
    }
    if (!keepData) {
      if (fs.existsSync(jsonDataPath)) {
        fs.rmSync(jsonDataPath, { recursive: true });
        logger("info", pluginName, "Data removed:", jsonDataPath);
      }
    }
  };

  // Process all files in the directory
  replaceJsonKeysInFile(filesDir);
}

function copyDirectory(source, destination, copyHiddenFiles = false) {
  return new Promise((resolve, reject) => {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    // Get a list of all the files and directories in the source directory
    const files = fs.readdirSync(source);

    // Loop through the files and directories
    for (const file of files) {
      // Check if hidden file should be copied
      if (!copyHiddenFiles && file.startsWith(".")) {
        continue;
      }
      const sourcePath = path.join(source, file);
      const destPath = path.join(destination, file);

      // Check if the current item is a directory
      if (fs.statSync(sourcePath).isDirectory()) {
        // Recursively copy the directory
        copyDirectory(sourcePath, destPath);
      } else {
        // Copy the file
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // All files and directories have been copied
    resolve();
  });
}

function getFileCount(directoryPath, extensions, excludePathsOrFiles = []) {
  let count = 0;
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const isExcluded = excludePathsOrFiles.some((excludePathOrFile) => {
      return (
        excludePathOrFile === file ||
        excludePathOrFile === filePath ||
        excludePathOrFile === path.basename(filePath)
      );
    });

    if (fs.statSync(filePath).isDirectory()) {
      count += getFileCount(filePath, extensions, excludePathsOrFiles);
    } else if (
      extensions.some((extension) => file.endsWith(extension)) &&
      !isExcluded
    ) {
      count++;
    }
  });
  return count;
}

function getClassNames(selectorStr) {
  const classes = new Set();
  const escpdSlctrPlchldr = "ESCAPED_SELECTOR_PLACEHOLDER";
  const psudoClasses = [":-moz-broken",":-moz-drag-over",":-moz-first-node",":-moz-focusring",":-moz-handler-blocked",":-moz-handler-crashed",":-moz-handler-disabled",":-moz-last-node",":-moz-loading",":-moz-locale-dir",":-moz-locale-dir",":-moz-only-whitespace",":-moz-submit-invalid",":-moz-suppressed",":-moz-user-disabled",":-moz-window-inactive",":active",":any-link",":autofill",":blankExperimental",":checked",":current",":default",":defined",":dir",":disabled",":empty",":enabled",":first",":first-child",":first-of-type",":focus",":focus-visible",":focus-within",":fullscreen",":futureExperimental",":has",":host",":host-context",":host",":hover",":in-range",":indeterminate",":invalid",":is",":lang",":last-child",":last-of-type",":left",":link",":local-link",":modal",":not",":nth-child",":nth-col",":nth-last-child",":nth-last-col",":nth-last-of-type",":nth-of-type",":only-child",":only-of-type",":optional",":out-of-range",":pastExperimental",":paused",":picture-in-picture",":placeholder-shown",":playing",":read-only",":read-write",":required",":right",":root",":scope",":target",":target-withinExperimental",":user-invalid",":-moz-ui-invalid",":user-valid",":-moz-ui-valid",":valid",":visited",":where"];

  const tempClasses = selectorStr
    .replace(/\.(?=[0-9-])/g, escpdSlctrPlchldr) // Match escaped dot
    .replace("::", " ")
    .replace(/\([^\)]*\)/g, "") // Remove string between starts with ( end with )
    .replace(/(?<!-)\\\[[^\\\]]*\\\]/g, "")  // remove string starts with [ no(-[ "fix tailwindcss arbitrary values") end with ] as css [attribute*=value] Selector
    .replace(/\[\bdata-[^\]]*\]/, "") // Removes [data-*] attribute selectors
    .split(".")
    .slice(1);

  tempClasses.forEach((tempClass) => {
    let theClass = tempClass
      .trim()
      .split(" ")[0]
      .replace(escpdSlctrPlchldr, "\.")
      .replace(".#", ".\\#")
      .replace("-.", ".\\-");
    let lastColonIndex = theClass.lastIndexOf(':');
    if (lastColonIndex !== -1) {
      let lastString = theClass.substring(lastColonIndex + 1);
      if (psudoClasses.includes(":"+lastString)) {
        theClass = theClass.substring(0, lastColonIndex);
        theClass = theClass.replace(/\\$/, "");
      }
    }
    classes.add(theClass);
  });

  return classes;
}

function getIdNames(selectorStr) {
  let ids = selectorStr.replace(".#", " ").replace(".", " ").trim().split(" ");
  ids = ids.filter((id) => id.charAt(0) == "#");
  return ids;
}

function logger(type, issuer, task, data) {
  const mainColor = "\x1b[38;2;99;102;241m%s\x1b[0m";
  switch (type) {
    case "info":
      console.info(mainColor, issuer, "\x1b[36m", task, data, "\x1b[0m");
      break;
    case "warn":
      console.warn(mainColor, issuer, "\x1b[33m", task, data, "\x1b[0m");
      break;
    case "error":
      console.error(mainColor, issuer, "\x1b[31m", task, data, "\x1b[0m");
      break;
    case "success":
      console.log(mainColor, issuer, "\x1b[32m", task, data, "\x1b[0m");
      break;
    default:
      console.log("'\x1b[0m'", issuer, task, data, "\x1b[0m");
      break;
  }
}

function getRelativePath(absolutePath) {
  const currentDirectory = process.cwd();
  const relativePath = path.relative(currentDirectory, absolutePath);
  return relativePath;
}

function isFileOrInDirectory(paths, filePath) {
  const resolvedFilePath = filePath.replace(/\\/g, "/"); // Replace backslashes with forward slashes

  for (const currentPath of paths) {
    const resolvedCurrentPath = currentPath.replace(/\\/g, "/"); // Replace backslashes with forward slashes

    if (resolvedCurrentPath === resolvedFilePath) {
      // The path is one of the items in the array, so it's a file or directory
      return true;
    }

    if (
      resolvedCurrentPath.endsWith("/") &&
      resolvedFilePath.startsWith(resolvedCurrentPath)
    ) {
      // The current path is a directory, so check whether the file is inside it
      const relativeFilePath = resolvedFilePath.substr(
        resolvedCurrentPath.length
      );

      if (!relativeFilePath.startsWith("/") && relativeFilePath !== "") {
        // The file is inside the directory
        return true;
      }
    }
  }

  return false;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = {
  getRandomName,
  simplifyString,
  writeJsonToFile,
  copyDirectory,
  replaceJsonKeysInFiles,
  getFileCount,
  getClassNames,
  getIdNames,
  logger,
  getRelativePath,
  isFileOrInDirectory,
};
