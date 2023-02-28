
const postcss = require("postcss");
const obfuscator = require("../../index");
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
// test default options.



