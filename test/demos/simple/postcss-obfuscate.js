const postcss = require("postcss");
const obfuscator = require("../../index");

postcss([obfuscator({
    /* options */
})])
  .process(css)
  .then((result) => {
    console.log("Task Completed!", result);
  })
  .catch((error) => {
    console.error(error);
  });

