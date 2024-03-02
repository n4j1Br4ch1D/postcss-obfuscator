const { getClassNames } = require("../../utils");



function assertClasses(actualSelector, expectedClasses) {
  let foundClasses = getClassNames(actualSelector);
  if (foundClasses.size !== expectedClasses.length) {
    console.log(expectedClasses, foundClasses);
    throw new Error(
      `Assertion failed: expected ${expectedClasses.length} but got ${foundClasses.size}`
    );
  }
  const allClassesMatch = expectedClasses.every((expectedClass) =>
    foundClasses.has(expectedClass)
  );
  if (!allClassesMatch) {
    console.log(expectedClasses, foundClasses);
    throw new Error(
      `Assertion failed: expected classes and found classes do not match.`
    );
  }
}

const matchList = {
  // Simple Selectors
  "h2 #first.second": ["second"],
  "#id": [],
  ".first.second": ["first", "second"],
  ".first .second": ["first", "second"],
  ".first:hover": ["first"],
  ".first::before": ["first"],

  // Advanced Selectors
  ".first > .second#sdsa": ["first", "second"],
  ".btn-slctn:selection": ["btn-slctn"], //psudo elements
  ".btn-slctn::selection": ["btn-slctn"],
  ".btn-moz:-moz-focusring": ["btn-moz"],
  ".btn-moz::-moz-focusring": ["btn-moz"],
  'img[src$=".png"]': [],
  "div:not(.highlight)": ["highlight"],
  "div:not(.highlight, .example) .test :hover": [
    "highlight",
    "example",
    "test",
  ],
  "@keyframes spin": [], // Keyframes
  from: [],
  to: [],
  "0%, 100%": [],
  "50%": [],
  "& .childclass": ["childclass"], // Native CSS & Nasting
  "&:hover": [],

  // Bootsrap Selectors
  ".form-range:disabled::-moz-range-thumb": ["form-range"],
  ".was-validated :valid ~ .valid-feedback,.was-validated :valid ~ .valid-tooltip,.is-valid ~ .valid-feedback,.is-valid ~ .valid-tooltip":
    ["was-validated", "valid-feedback", "valid-tooltip", "is-valid"],
  ".was-validated .form-control:valid, .form-control.is-valid": [
    "was-validated",
    "form-control",
    "is-valid",
  ],
  '.was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size="1"], .form-select.is-valid:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size="1"]':
    ["was-validated", "form-select", "is-valid"],
  ".was-validated .form-check-input:valid:checked, .form-check-input.is-valid:checked":
    ["was-validated", "form-check-input", "is-valid"],
  ".was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label":
    ["was-validated", "form-check-input", "form-check-label", "is-valid"],
  ".btn-check:focus + .btn-light, .btn-light:focus": ["btn-check", "btn-light"],
  ".btn-check:checked + .btn-light, .btn-check:active + .btn-light, .btn-light:active, .btn-light.active, .show > .btn-light.dropdown-toggle":
    ["btn-check", "btn-light", "active", "show", "dropdown-toggle"],
  ".btn-check:checked + .btn-light:focus, .btn-check:active + .btn-light:focus, .btn-light:active:focus, .btn-light.active:focus, .show > .btn-light.dropdown-toggle:focus":
    ["btn-check", "btn-light", "active", "show", "dropdown-toggle"],
  ".dropdown-toggle:empty::after": ["dropdown-toggle"],
  ".dropdown-menu-dark .dropdown-item.disabled, .dropdown-menu-dark .dropdown-item:disabled":
    ["dropdown-menu-dark", "dropdown-item", "disabled"],
  ".btn-group > .btn:not(:last-child):not(.dropdown-toggle),.btn-group > .btn-group:not(:last-child) > .btn":
    ["btn-group", "dropdown-toggle", "btn"],
  ".btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle), .btn-group-vertical > .btn-group:not(:last-child) > .btn":
    ["btn-group-vertical", "dropdown-toggle", "dropdown-toggle", "btn"],
  ".navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus":
    ["navbar-dark", "navbar-nav", "nav-link"],
  ".card-group > .card + .card": ["card-group", "card"],
  ".card-group > .card:not(:last-child)": ["card-group", "card"],
  ".card-group > .card:not(:first-child) .card-img-bottom,.card-group > .card:not(:first-child) .card-footer":
    ["card-group", "card", "card-img-bottom", "card-footer"],
  ".accordion-button:not(.collapsed)::after": ["accordion-button", "collapsed"],
  ".list-group-horizontal-xxl > .list-group-item:last-child": [
    "list-group-horizontal-xxl",
    "list-group-item",
  ],
  ".list-group-horizontal-xxl > .list-group-item + .list-group-item": [
    "list-group-horizontal-xxl",
    "list-group-item",
  ],
  ".list-group-horizontal-xxl > .list-group-item + .list-group-item.active": [
    "list-group-horizontal-xxl",
    "list-group-item",
    "active",
  ],
  ".list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus":
    ["list-group-item-primary", "list-group-item-action"],
  ".bs-tooltip-start .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow::before":
    ["bs-tooltip-start", "tooltip-arrow", "bs-tooltip-auto"],
  ".bs-popover-start > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow::before":
    ["bs-popover-start", "popover-arrow", "bs-popover-auto"],

  // TailwindCss Selectors
  ".xl\\:hover\\:translate-x-0:hover": ["xl:hover:translate-x-0"], //hover
  ".space-x-3 > :not([hidden]) ~ :not([hidden])": ["space-x-3"],
  ".focus\\:ring-gray-100:focus": ["focus:ring-gray-100"],
  ".dark .dark\\:border-gray-700": ["dark", "dark:border-gray-700"],
  ".dark .dark\\:hover\\:bg-gray-600:hover": ["dark", "dark:hover:bg-gray-600"], //dark
  ".md\\:text-3xl": ["md:text-3xl"],
  ".dark .dark\\:bg-gray-800\\/50": ["dark", "dark:bg-gray-800/50"],
  ".py-0\\.5": ["py-0.5"],
  ".\\[\\&_a\\]\\:will-change-\\[padding-left\\2c _color\\] a": [
    "[&_a]:will-change-[padding-left,_color]",
  ],
  ".\\[\\&_a\\]\\:\\[transition\\:padding-left_cubic-bezier\\(\\.15\\2c 1\\.6\\2c \\.75\\2c 1\\)_300ms\\2c color_ease_300ms\\] a":
    [
      "[&_a]:[transition:padding-left_cubic-bezier(.15,1.6,.75,1)_300ms,color_ease_300ms]",
    ],
  ".-translate-x-1\\/2": ["-translate-x-1/2"], //negative
  ".\\32xl\\:grid-cols-3": ["2xl:grid-cols-3"], //octal
  ".\\3exl\\:p-8": [">xl:p-8"],
  ".pt-\\[100px\\]": ["pt-[100px]"], //custome
  ".bg-\\[\\#F6F8F9\\]": ["bg-[#F6F8F9]"],
  ".data-\\[status\\=\\'active\\'\\]\\:bg-green-100[data-status='active']": [
    "data-[status='active']:bg-green-100",
  ],
  ".data-\\[size\\=large\\]\\:p-8[data-size=large]": ["data-[size=large]:p-8"],
  ".data-\\[href\\=\\'active\\'\\]\\:bg-green-100[data-href='active']": [
    "data-[href='active']:bg-green-100",
  ],
  ".data-\\[size\\=large\\]\\:p-8[data-size=large]": ["data-[size=large]:p-8"],
  ".group[data-status='active'] .group-data-\\[status\\=\\'active\\'\\]\\:text-green-700":
    ["group", "group-data-[status='active']:text-green-700"],
  ".group.is-published .group-\\[\\.is-published\\]\\:block": [
    "group",
    "is-published",
    "group-[.is-published]:block",
  ],
  ".peer.is-dirty:required ~ .peer-\\[\\.is-dirty\\]\\:peer-required\\:block": [
    "peer",
    "is-dirty",
    "peer-[.is-dirty]:peer-required:block",
  ],
  ":nth-of-type(3) .group .group-\\[\\:nth-of-type\\(3\\)_\\&\\]\\:block": [
    "group",
    "group-[:nth-of-type(3)_&]:block",
  ],
  ".\\[\\@supports\\(display\\:grid\\)\\]\\:grid": [
    "[@supports(display:grid)]:grid",
  ],
  ".\\[\\@media\\(any-hover\\:hover\\)\\{\\&\\:hover\\}\\]\\:opacity-100:hover":
    ["[@media(any-hover:hover){&:hover}]:opacity-100"],
  ".\\[\\&\\:hover\\]\\:bg-white\\/50:hover": ["[&:hover]:bg-white/50"],
  ".\\[\\@supports\\(backdrop-filter\\:blur\\(0\\)\\)\\]\\:backdrop-blur": [
    "[@supports(backdrop-filter:blur(0))]:backdrop-blur",
  ],
  ".\\[\\@supports\\(backdrop-filter\\:blur\\(0\\)\\)\\]\\:bg-white\\/50": [
    "[@supports(backdrop-filter:blur(0))]:bg-white/50",
  ],
  ".\\*\\:pt-4 > *": ["*:pt-4"], //global
  // <div class="[&>{sth}]:bg-green-50">lol</div>
  // <div class="[&_{sth}]:bg-green-50">lol</div>
  // <div class="[&_.{className}]:bg-green-50">lol</div>
  // <div class="[&_#{id}]:bg-green-50">lol</div>
  // <div class="[&_a]:[transition:padding-left_cubic-bezier(.15,1.6,.75,1)_300ms,color_ease_300ms] [&_a]:will-change-[padding-left,_color]">
  // '.one.h-[0.5rem].two[class*="test"]': [],
  // // const jsonString = '.s-w-0\\.5chat-e';
  // '.s-w-\\[1\\.5rem\\]chat-e';
  // const jsonString = '.s-group-\\[\\.is-published\\.play\\]\\:block-e';
};

Object.entries(matchList).forEach(([selector, classes]) =>
  assertClasses(selector, classes)
);
