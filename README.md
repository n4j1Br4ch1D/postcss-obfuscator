<a href="#Intro" title="Section Intro">Intro</a>➤<a href="#Motivation" title="Section Motivation">Motivation</a>➤<a href="#Features" title="Section Features">Features</a>➤<a href="#Installation" title="Section Installation">Installation</a>➤<a href="#Usage" title="Section Usage">Usage</a>➤<a href="#Configuration" title="Section Configuration">Configuration</a>➤<a href="#Extras" title="Section Extra">Extra</a>➤<a href="#Releases" title="Section Releases">Releases</a>➤<a href="#Contributing" title="Section Contributing">Contributing</a>
# :space_invader: PostCSS Obfuscator
- :date:**01-03-2023** :pushpin:**Beta Version 1.4.1**
- :computer:<a href="https://github.com/n4j1Br4ch1D" target="_blank" title="NajibRachid: Agile full-stack developer">NajibRachid</a> :purple_circle:<a href="https://anmoonweb.com/?ref=postcss-obfuscator" target="_blank" title="ANMOON: Right talents at the right place ">ANMOON</a> :office: <a href="https://x-hub.io/?ref=anmoon-postcss-obfuscator" target="_blank" title="XHUB: For Developers By Developers">XHUB</a>

<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/postcss-obfuscator/main/assets/postcss-obfuscator.png" alt="postcss-obfuscator cli">

PostCSS plugin that helps you protect your CSS code by obfuscating class names and ids. with customizable configuration.

This plugin provides obfuscation capabilities to your CSS files by replacing class and id selectors with prefixed, simplified or randomly generated strings. This can help to protect your CSS code from reverse engineering and unauthorized copying, while also reducing the file size of your CSS files. plugin offers advanced customizable configuration.

**keywords:** _postcss, plugin, obfuscation, css, css classes, class renamer, postcss-rename-selectors, class prefixer, Postcss obfuscator, PostCSS obfuscation plugin, CSS obfuscation, Class name scrambling, CSS security, Obfuscate CSS code, Protect CSS code, Prevent CSS reverse-engineering, tailwindcss, tailwindcss classes list, tailwindcss classes array json, bootstrap, bootstrap classes array json, Scramble HTML classes, CSS anti-theft protection, code privacy, CSS code obfuscator, CSS class name encryption, anti web scraping, Anti-scraping tools, Anti-scraping technology, Web scraping prevention, Web crawling protection._

**Check Also:** <a href="https://github.com/n4j1Br4ch1D/postcss-prepend" target="_blank" title="postcss-prepend:prepends a comment to the top of your CSS files">PostCSS-prepend</a> | <a href="https://github.com/n4j1Br4ch1D/postcss-mobile-first" target="_blank" title="postcss-mobile-first:converts your desktop-first CSS code to mobile-first CSS code.">PostCSS-mobile-first</a>

**Turn This into this:**

<div style="display:flex">
<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/postcss-obfuscator/main/assets/json-obsfuscation.png" alt="json-Obfuscation" height="300" width="400"/>
<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/postcss-obfuscator/main/assets/css-obsfuscation.png" alt="css-Obfuscation" height="300" width="400"/>
<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/postcss-obfuscator/main/assets/html-obsfuscation.png" alt="html-Obfuscation" height="300" width="400"/>
<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/postcss-obfuscator/main/assets/react-obsfuscation.png" alt="react-Obfuscation" height="300" width="400"/>
</div>

---

## Motivation
- Protecting Intellectual Property, Licensing and Distribution: make it hard for others from stealing it or using it without your permission.
- Protect against Web scraping, data mining or any malicious activities like stealing data or content: make it hard extracting data from websites automatically using software tools, which use class names & ids.
- Minfiy Your code even more: obsfucation/uglify can slightly reduce file size and improve its performance. 

## Features
   - [x] No 3rd parties, Dependencies. Just vanilla Nodejs code.
   - [x] Quicker then you think.
   - [X] Postcss plugin, hence its intended to work with any build tool or task runner.
   - [x] Advanced Customizable configuration (Control is yours).
   - [X] Supports all files: .html, .js, .php, .vue, ... you name it.
   - [x] Supports a wide range of CSS frameworks (Tailwidcss, bootstrap, Bulma).
## Installation

```sh
# npm
npm install postcss-obfuscator --save-dev
```

```sh
# yarn
yarn add postcss-obfuscator --dev
```

## Usage
First, you need to add postcss-obfuscator to your PostCSS configuration. For example, if you're using postcss-cli, you can add it to your postcss.config.js file:

```js
//postcss.config.js 
module.exports = {
  plugins: [
    require('postcss-obfuscator')({
      /* options */
    })
  ]
}
```

You can also make you own custome separate script like so:

First install postcss:

```sh
#npm
npm i postcss --save-dev

#yarn
yarn add postcss --dev
```
Then require postcss and postcss-obfuscator plugin in your script:

```js
//postcss-obfuscate.js 
const postcss = require("postcss");
const obfuscator = require("postcss-obfuscator");

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


```

## Configuartion

The plugin has several options that you can configure to customize its behavior. Here are the available options:
  - **enable:** Enable plugin, __default is true.__
  - **length:** Random name length for both ids and classes, __default is 5.__
  - **classMethod:** Obfuscation method for classes, options are: 'random', 'simple', 'none'. 'simple' will remove pronounced vowels and digits, 'none' will keep original name in case you want to just use prefixes or suffixes. __deafult is 'random'.__
  - **classPrefix:** Prefix for class names, __default is nothig.__
  - **classSuffix:** Suffix for class names, __default is nothig.__
  - **classIgnore:** Array of classes to ignore from obfuscation. __deafult is none.__
  - **ids:** Enable id Obfuscation, __default is false.__
  - **idMethod:** Obfuscation method for ids, options are: 'random', 'simple', 'none', __deafult is 'random'._
  - **idPrefix:** Prefix for id names, __default is nothig.__
  - **idSuffix:** Suffix for id names, __default is nothig.__
  - **idIgnore:** Array of ids to ignore from obfuscation. __deafult is none.__
  - **indicator:** Indicator used to replace names. __default is none.__
  - **jsonsPath:** Path and Name where to save obfuscation data __default is: css-obsucator.__
  - **srcPath:** Path for your source files, __default is: src.__
  - **desPath:**  Destination Path for obfuscated html/js/.. files, __default is: out__.
  - **extensions:** Extesnions Array of files you want osbfucated ['.html', '.php', '.js', '.svelte'], __default is '.html'.__
  - **htmlExcludes:** Files and paths to exclude from html obfuscation replacement, __default is none.__
  - **cssExcludes:** Files and paths to exclude from css obfuscation, __default is none.__
  - **fresh:** Create New obfuscation data List or use already existed one (to keep Production Cache or prevent data scrapping). __deafult is false.__
  - **multi:** Generate obsfucated data file for each css file, __default is false.__
  - **differMulti:** Generate differnt Raandom names for each file,  __default is false.__
  - **formatJson:** Format obfuscation data JSON file, __default is false.__
  - **showConfig:** Show config on terminal when runinng,  __default is false.__
  - **keepData:** Keep or delete Data after osbfucation is finished?  __default is true.__
  - **callBack:** Callback function to call after obfuscation is done. __default is an empty function__

**Here's the default donfiguration:**


```js
  const defaultOptions = {
    enable: true, // Enable plugin
    length: 5, // Random  name length.
    classMethod: 'random', // 'random', 'simple', 'none' obfuscation method for classes.
    classPrefix: "", // ClassName prefix.
    classSuffix: "", // ClassName suffix.
    classIgnore: [], // Class to ignore from obfuscation.
    ids: false, //  Obfuscate #IdNames.
    idMethod: 'random', // 'random', 'simple', 'none' obfuscation method for ids .
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
    keepData: true,  // Keep or delete Data after osbfucation is finished?
    callBack: function () {} // Callback function to call after obfuscation is done.
  };

```

## npm scripts example
Then npm scripts can be something like this:

```json
    "postcss": "postcss src/**/*.css  --dir build",
    "postcss:watch": "postcss src/**/*.css --dir build --watch"
    "obfuscate": "node postcss-obfuscate",  // for custome script.
```
## Extras
   
  ### How it Works Basicly?
  1. Loop over all css files.
  2. Uses Buildting function(regex) to find classes & ids.
  3. Saves Ids & classes in a Json file key represting orginal Names. then genarates  random names as values.
  4. Creates new folder from source folder.
  5. Loops throw files and replaces those keys with values from JSON File.

  ### Caveats?
  - Only CSS Supported so call the extension After your code was converted to css (Example: scss to css). Its generally better to call at as the last plugin.
  - One of  best practices is to avoid naming your ids & classes reserved words like html elemnts name or attributes. (same for JS & CSS).
  - It uses builting function to find divs & css classes. so it may not work perfectly with advanced CSS selectors.
 - I advice to keepData as deafult true and to use a diffrent build directory: using same directory will replace your files and you may loose orginal classes and ids names. you will get a warning for that. 
  - Postcss doesnt support nested dirctories  by default. this is If u intend to work with the plugin's multi option.

  ### Enable based on environment mode

To use based on environment mode variable you may do so like this:

```js
const isDevMode = process.env.NODE_ENV === 'development'; // production

enable: isDevMode, // Force Run on Dev Env or when srcPath equals desPath.
```

  ### Destination Folder:
   Its Better to keep your source files as they are for easy development. Consider specifing another folder for build, if you choose your build directory to be same as source directory you will be replaced and you will loose your orginal files.

  ### Use Indicators?
  As mentioned this plugin uses Regex to replace all apperances of classes & ids on files with extension you specify (be it html, cs, js, ...).
Generally if your classes names are unique and avoids reserved keywords, then you got nothing to worry about, otherwise, we got you covered just use the indicator option

```js
   indicator: "@",
```
Now whenever you mention your ids or classes use like this: so it will only replace ones with the indicator around them.

```html 
<script>
 let anotherClass =  "@anotherClass@"
</script>
<div class="@myClass@">MyClass</div>
```
  ### Support for css Framworks?
- In Beta Tests so far it working fine but we always working on improvements.
   - Tailwindcss: few issues are to be fixed very soon.
   - Bootstrap
   - Bulma
  
  ### How To Use  With?
    
    #### laravel
    #### react/nextjs

## Releases

```txt
 - Initial Version 1.0.0 : 18/02/2023
    - Project Setup.
    - Theory & prove of concept.
  - Initial Version 1.0.3 : 19/02/2023
    - Essential default confugration options (length, jsonPath, placeholder).
    - Settled on a no dependcies solution. built own parser.
    - Developing class finder function.
  - Initial Version 1.0.7 : 20/02/2023
    - Set confugration options.
    - Introduce Id obsfucation.
    - Add prefixers option.
    - Add suffixes option.
  - Initial Version 1.0.9 : 21/02/2023
    - Add srcPath option.
    - Add desPath option.
  - Initial Version 1.1.2 : 21/02/2023
    - Improving class finder method regex.
    - Add showConfig Option.
    - Add formatJson Option.
  - Alpha Version 1.1.5 : 22/02/2023
    - Introducing the Multi option.
    - Refactor & improve code performance.
    - Introduce CLI UI.
  - Alpha Version 1.1.8 : 23/02/2023
    - Introducing the fresh option.
    - Introducing the keepSame option.
    - Adding Logger & logs.
  - Alpha Version 1.2.2 : 24/02/2023
    - Introducing  the callback option.
    - Adding proccess stats/data log.
    - Use a copy method solution.
    - Improve Replace Regex (exclude HTML attributes).
  - Alpha Version 1.2.6 : 24/02/2023
    - Adding Indicator option.
    - deprecate keepSame option.
    - Introduce the differMulti option.
    - Make keepData true as default.
  - Alpha Version 1.3.2 : 25/02/2023
    - Add extensions options.
    - fix differMulti option Bug(class repeation).
    - Deprecate placeholder option.
    - Introducing ExcludeCss option.
    - Introducing ExcludeHTML option.
    - Fix Edge case (Css file count).
  - Alpha Version 1.3.4 : 26/02/2023
    - Fix Files Count (count diffrent extensions).
    - Improve simplify function (add random letter if <1).
  - Alpha Version 1.3.8 : 27/02/2023
    - Add idIgnore/classIgnore Option,
    - Add classMethod option (random/simplify/none).
    - Fix issue (delete data wrong path).
    - Fix bug (Find multiple Ids). 
  - Beta Version 1.4.0 : 28/02/2023
    - Improve Exclude Css Option allow Paths.
    - Improve Exclude HTML Option allow Paths.
  - Beta Version 1.4.1 : 01/03/2023
    - Fix Error copying directory: Invalid regular expression: /(?<!</?)\b(sm\:group-hover\)\b(?!=)/: Unterminated
group 
  - Beta Version 1.4.2 : 02/03/2023
     - Fix default replacement set default extensions to ['.html'].
  - [Agenda] Beta Version 1.x.x : xx/xx/2023
    - Fine tuning for tailwindcss.
    - Fix Files Path (make relative).
    - Set Indicators Start & End.
    - Add Force option (case: dev env or same Path).
    - Ask before preceding (If dev env or srcPath is desPath).
    - Improve custome script(postcss-obsfucator).
    - Refactor tests.

```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

Tests included:

```sh
   npm test
```

### License

This project is licensed under the MIT License. See the LICENSE file for more information. Feel free to use it in your own projects, or contribute to its development on GitHub.
