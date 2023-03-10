const {
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
} = require("./utils");
const path = require("path");

const pluginName = "PostCSS Obfuscator";
const pluginVersion = "V 1.4.0 Beta";
const pluginWebSite = "https://github.com/n4j1Br4ch1D/postcss-obfuscator";
const pluginHead = `     __                    ${pluginName}                     __     
    (oo)                     ${pluginVersion}                        (xx)    
   //||\\\\   ${pluginWebSite}   //||\\\\   
 ======================================================================> `;
const defaultOptions = {
  enable: true, // Enable plugin
  length: 5, // Random  name length.
  classMethod: "random", // 'random', 'simple', 'none' obfuscation method for classes.
  classPrefix: "", // ClassName prefix.
  classSuffix: "", // ClassName suffix.
  classIgnore: [], // Class to ignore from obfuscation.
  ids: false, //  Obfuscate #IdNames.
  idMethod: "random", // 'random', 'simple', 'none' obfuscation method for ids .
  idPrefix: "", // idName Prefix.
  idSuffix: "", // idName suffix.
  idIgnore: [], // Ids to ignore from obfuscation.
  indicator: null, // Indicator used to replace names.
  jsonsPath: "css-obsucator", // Path and Name where to save obfuscation data.
  srcPath: "src", // Source of your files.
  desPath: "out", // Destination for obfuscated html/js/.. files.
  extensions: ['.html'], // Extesnion of files you want osbfucated ['.html', '.php', '.js', '.svelte'].
  htmlExcludes: [], // Files and paths to exclude from html obfuscation replacement.
  cssExcludes: [], // Files and paths to exclude from css obfuscation.
  fresh: false, // Create New obfuscation data List or use AlreadyExistedOne (to keep Production Cache or prevent data scrapping).
  multi: false, // Generate obsfucated data file for each css file.
  differMulti: false, // Generate differnt Raandom names for each file.
  formatJson: false, // Format obfuscation data JSON file.
  showConfig: false, // Show config on terminal when runinng.
  keepData: true, // Keep or delete Data after osbfucation is finished?
  callBack: function () {}, // Callback function to call after obfuscation is done.
};
let data = {};
let jsonData = {};
let singleFileData = {};
let processedFiles = new Set();
let idList = new Set();
let cssNo = 0;
let classesNo = 0;
let idsNo = 0;
const envMode = process.env.NODE_ENV;

module.exports = (options = {}) => {
  // Get Final Option By Merging the default and user-defined options
  const {
    enable,
    length,
    classMethod,
    classPrefix,
    classSuffix,
    classIgnore,
    ids,
    idMethod,
    idPrefix,
    idSuffix,
    idIgnore,
    indicator,
    jsonsPath,
    srcPath,
    desPath,
    extensions,
    htmlExcludes,
    cssExcludes,
    fresh,
    multi,
    differMulti,
    formatJson,
    showConfig,
    keepData,
    callBack,
  } = { ...defaultOptions, ...options };
  return {
    postcssPlugin: pluginName,
    Once: (root, { result }) => {
      // Add the file path to the set of processed files
      if (!enable) {
        return;
      } else {
        if (processedFiles.size == 0) {
          console.log("\x1b[48;2;103;113;210m%s\x1b[0m", pluginHead);
          if (envMode === "dev" || envMode === "development") {
            logger(
              "warn",
              pluginName,
              "Warning:",
              "You are Running in Dev Mode!"
            );
          }
          if (srcPath === desPath) {
            logger(
              "warn",
              pluginName,
              "Warning:",
              "Are You Sure You wanna Replace this file This my cause you loose your surce data please specify antother folder"
            );
          }
          cssFilesNo = getFileCount(srcPath, [".css"], cssExcludes);
          if (showConfig) {
            console.info("\x1b[34m", "Plug", "\x1b[36m", "Config:", {
              ...defaultOptions,
              ...options,
            });
          }
        }
        let cssFile = getRelativePath(result.opts.from);
        if (isFileOrInDirectory(cssExcludes, cssFile)) {
          logger("info", pluginName, "Ignoring:", cssFile);
          return;
        }
        cssNo++;
        logger("info", pluginName, "processing:", cssFile);
        if (envMode === "dev" || envMode === "development") {
          root.prepend({
            text: `                              __     
                                (oo) 
                               //||\\\\  
                         ${pluginName}
                           ${pluginVersion}
          ${pluginWebSite}
             **     this only appears on Dev Mode     **        
`,
          });
        }
        singleFileData = {};
        if (multi) {
          data = singleFileData;
          if (differMulti) {
            data = singleFileData;
          } else {
            data = jsonData;
          }
        } else {
          data = jsonData;
        }
        root.walkRules((rule) => {
          rule.selectors = rule.selectors.map((selector) => {
            // get List of all classNames in the selector
            const classList = getClassNames(selector);
            classesNo += classList.size;
            classList.forEach((className) => {
              // Generate new className
              let oldClassName = "." + className;
              let newClassName;
              if (classIgnore.includes(className) || classMethod == "none") {
                newClassName = className;
              } else if (classMethod == "simple") {
                newClassName = simplifyString(className);
              } else {
                newClassName = getRandomName(length);
              }
              newClassName = `.${classPrefix}${newClassName}${classSuffix}`;

              // If ClassName already exist replace with its value else generate new : the should have same name.
              if (jsonData.hasOwnProperty(oldClassName)) {
                selector = selector.replace(
                  oldClassName,
                  jsonData[oldClassName]
                );
              } else {
                selector = selector.replace(oldClassName, newClassName);
                jsonData[oldClassName] = newClassName;
              }
              singleFileData[oldClassName] = newClassName;
            });
            if (ids) {
              idList = getIdNames(selector);
              idList.forEach((idName) => {
                idsNo++;
                // Get only idName not other elements or pseudo-element & remove spaces.
                let oldIdName = idName;
                // Generate new idName
                let newIdName;
                if (idIgnore.includes(idName) || idMethod == "none") {
                  newIdName = idName.splice(1);
                } else if (idMethod == "simple") {
                  newIdName = simplifyString(idName);
                } else {
                  newIdName = getRandomName(length);
                }
                newIdName = `#${idPrefix}${newIdName}${idSuffix}`;

                if (jsonData.hasOwnProperty(oldIdName)) {
                  selector = selector.replace(oldIdName, jsonData[oldIdName]);
                } else {
                  selector = selector.replace(oldIdName, newIdName);
                  jsonData[oldIdName] = newIdName;
                }
                singleFileData[oldIdName] = newIdName;
              });
            }
            return selector;
          });
        });
        jsonData = { ...jsonData, ...singleFileData };
        const fileName = path.basename(root.source.input.file, ".css");
        // If mult & keep same get and replace.
        const newjsonsPath = `${jsonsPath}/${multi ? fileName : "main"}.json`;
        writeJsonToFile(data, newjsonsPath, formatJson, fresh, !multi & fresh);
        if (cssNo == cssFilesNo) {
          copyDirectory(srcPath, desPath, true)
            .then(() => {
              logger(
                "info",
                pluginName,
                "Copying:",
                `${srcPath} to ${desPath} finished!`
              );
              replaceJsonKeysInFiles(
                desPath,
                extensions,
                htmlExcludes,
                jsonsPath,
                indicator,
                keepData
              );
              logger(
                "info",
                pluginName,
                "Replacing:",
                `All files have been updated!`
              );
              logger(
                "success",
                pluginName,
                "Processed:",
                `${cssFilesNo}/${getFileCount(
                  srcPath,
                  [".css"],
                  []
                )} CSS| ${getFileCount(
                  srcPath,
                  extensions,
                  htmlExcludes
                )}/${getFileCount(srcPath, extensions, [])} Files| ${
                  classesNo - classIgnore.length
                }/${classesNo} Class| ${idsNo - idIgnore.length}/${idsNo} Id`
              );
              callBack();
              console.info(
                "\x1b[38;2;99;102;241m%s\x1b[0m",
                "==========================================================================>",
                "\x1b[0m"
              );
            })
            .catch((error) => {
              logger(
                "error",
                pluginName,
                "Error copying directory:",
                error.message
              );
            });
        }
      }
      processedFiles.add(jsonsPath);
    },
  };
};

module.exports.postcss = true;
