module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "00et":
/***/ (function(module, exports) {



/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@emotion/core"
var core_ = __webpack_require__("3vLF");

// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: external "@chakra-ui/core"
var external_chakra_ui_core_ = __webpack_require__("WKWs");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "fathom-client"
var external_fathom_client_ = __webpack_require__("ZRTx");

// CONCATENATED MODULE: ./styles/theme.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const theme = _objectSpread(_objectSpread({}, external_chakra_ui_core_["theme"]), {}, {
  fonts: _objectSpread(_objectSpread({}, external_chakra_ui_core_["theme"].fonts), {}, {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  }),
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  icons: _objectSpread(_objectSpread({}, external_chakra_ui_core_["theme"].icons), {}, {
    jj_circle_logo: {
      path: __jsx("svg", {
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 308.3 280.1"
      }, __jsx("path", {
        d: "M152.3 272.4c-72.2 0-130.9-58.7-130.9-130.9S80.1 10.7 152.3 10.7s130.9 58.7 130.9 130.9-58.8 130.8-130.9 130.8zm0-257C82.7 15.4 26.1 72 26.1 141.5c0 69.6 56.6 126.2 126.2 126.2s126.1-56.6 126.1-126.2c0-69.5-56.6-126.1-126.1-126.1z"
      }), __jsx("path", {
        d: "M100.9 80.8c0-.8.4-1.6 1.1-2l29.6-18.4c1.3-.8 3 .1 3 1.7l.1 64.5c0 1.2 1.4 2 2.4 1.4L186 97.7c1.4-.9 3.3.1 3.3 1.8v62.8c0 1.2 1.4 2 2.4 1.4l2.2-1.3 15.6-9.7c1.1-.7 2.6-.4 3.3.8.7 1.1.4 2.6-.8 3.3l-18.9 11.7c-3 1.9-3.8 3.1-3.8 6.8v24.3c0 8.5-5.3 16.2-13.4 18.7-2 .6-4 1-6 1-6.2 0-12.1-3-15.8-8.5-2.5-3.6-3.6-8-3.2-12.4.6-6.2 3.8-11.4 9-14.7l16.3-10.2c1.6-1 3.6.1 3.6 2 0 .8-.4 1.6-1.1 2l-16.3 10.2c-4 2.5-6.4 6.6-6.8 11.4-.2 3.5.8 6.9 3 9.7 4.6 6 11.2 6.5 16 5 4.8-1.6 10-6 10-13.8v-93c0-1.2-1.3-1.9-2.3-1.3L138 133.2c-1.9 1.2-3.1 3.3-3.1 5.6v25.5c0 9.6-6.7 17.6-16.6 19.1-7 1.1-14-2.1-18.2-7.8l-.1-.2c-3.1-4.3-4.3-9.8-3.3-15 1-5.2 4.2-9.8 8.7-12.6l16.2-10.1c1.6-1 3.6.2 3.6 2 0 .8-.4 1.6-1.1 2l-16 9.9c-3.2 2-5.6 5.1-6.6 8.7-1.2 4.3-.3 8.7 2.3 12.3l.1.2c4.6 6.3 11.4 6.9 16.2 5.3 4.9-1.6 10-6 10-13.8v-35.4l-.1-59.1c0-1.2-1.3-1.9-2.3-1.3l-23.1 14.3c-1.6 1-3.7-.1-3.7-2z"
      }), __jsx("circle", {
        cx: "223.1",
        cy: "147.4",
        r: "3.4"
      }))
    },
    instagram: {
      path: __jsx("svg", {
        fill: "currentColor",
        viewBox: "0 0 512.001 512.001",
        xmlns: "http://www.w3.org/2000/svg"
      }, __jsx("path", {
        d: "M373.406 0H138.594C62.172 0 0 62.172 0 138.594V373.41C0 449.828 62.172 512 138.594 512H373.41C449.828 512 512 449.828 512 373.41V138.594C512 62.172 449.828 0 373.406 0zm108.578 373.41c0 59.867-48.707 108.574-108.578 108.574H138.594c-59.871 0-108.578-48.707-108.578-108.574V138.594c0-59.871 48.707-108.578 108.578-108.578H373.41c59.867 0 108.574 48.707 108.574 108.578zm0 0"
      }), __jsx("path", {
        d: "M256 116.004c-77.195 0-139.996 62.8-139.996 139.996S178.804 395.996 256 395.996 395.996 333.196 395.996 256 333.196 116.004 256 116.004zm0 249.976c-60.64 0-109.98-49.335-109.98-109.98 0-60.64 49.34-109.98 109.98-109.98 60.645 0 109.98 49.34 109.98 109.98 0 60.645-49.335 109.98-109.98 109.98zm0 0M399.344 66.285c-22.813 0-41.367 18.559-41.367 41.367 0 22.813 18.554 41.371 41.367 41.371s41.37-18.558 41.37-41.37-18.558-41.368-41.37-41.368zm0 52.719c-6.258 0-11.352-5.094-11.352-11.352 0-6.261 5.094-11.351 11.352-11.351 6.261 0 11.355 5.09 11.355 11.351 0 6.258-5.094 11.352-11.355 11.352zm0 0"
      }))
    },
    twitter: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
      }))
    },
    github: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      }))
    },
    linkedin: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      }), __jsx("rect", {
        x: "2",
        y: "9",
        width: "4",
        height: "12"
      }), __jsx("circle", {
        cx: "4",
        cy: "4",
        r: "2"
      }))
    },
    youtube: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
      }), __jsx("path", {
        d: "M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
      }))
    },
    mail: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      }), __jsx("polyline", {
        points: "22,6 12,13 2,6"
      }))
    },
    jamstackfns: {
      path: __jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M0 161V50.442C.921 36.392 11.61 6.633 46.99 0h127.844c1.382 15.662-5.252 49.475-42.845 59.425-1.843 15.893-14.926 48.369-52.52 51.133C74.403 127.372 51.415 161 0 161zM46.99 10.365c-25.982 5.528-34.782 29.021-35.933 40.077h116.095c27.642-7.186 36.395-29.712 37.316-40.077H46.991zm-35.933 89.828V59.425h109.875c-.921 11.977-10.503 37.037-41.462 41.459l-68.413-.691zm0 10.365v40.077c35.381-3.869 52.058-28.33 55.974-40.077H11.057z",
        clipRule: "evenodd"
      }),
      viewBox: "0 0 175 161"
    },
    nextjs: {
      path: __jsx("g", {
        fill: "currentColor"
      }, __jsx("path", {
        d: "m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z"
      }), __jsx("path", {
        d: "m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z"
      })),
      viewBox: ".5 -.2 1023 1024.1"
    },
    react2025: {
      path: __jsx("g", {
        fill: "currentColor"
      }, __jsx("path", {
        d: "M0 296V8.5H231.5V89L170.5 150L258.5 238H174L86 150L170.5 65.5H58V238L0 296Z"
      })),
      viewBox: "0 0 267 305"
    },
    spotify: {
      path: __jsx("path", {
        fill: "#1ED760",
        d: "M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
      }),
      viewBox: "0 0 168 168"
    },
    check: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("path", {
        d: "M22 11.08V12a10 10 0 11-5.93-9.14"
      }), __jsx("path", {
        d: "M22 4L12 14.01l-3-3"
      }))
    },
    x: {
      path: __jsx("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, __jsx("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), __jsx("path", {
        d: "M15 9l-6 6M9 9l6 6"
      }))
    }
  })
});

/* harmony default export */ var styles_theme = (theme);
// CONCATENATED MODULE: ./styles/prism.js


const prismBaseTheme = core_["css"]`
  code {
    white-space: pre;
  }
  code[class*='language-'],
  pre[class*='language-'] {
    color: ${external_chakra_ui_core_["theme"].colors.gray[800]};
    background: none;
    font-family: ${external_chakra_ui_core_["theme"].fonts.mono};
    font-size: ${external_chakra_ui_core_["theme"].fontSizes[2]};
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: ${external_chakra_ui_core_["theme"].lineHeights[2]};
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    width: 100%;
  }
  /* Code blocks */
  pre[class*='language-'] {
    padding-top: ${external_chakra_ui_core_["theme"].space[4]};
    padding-bottom: ${external_chakra_ui_core_["theme"].space[4]};
    padding-left: ${external_chakra_ui_core_["theme"].space[4]};
    padding-right: ${external_chakra_ui_core_["theme"].space[4]};
    margin: ${external_chakra_ui_core_["theme"].space[6]} 0;
    overflow: auto;
    min-width: 100%;
    font-size: 0.9rem;
    white-space: nowrap;
  }
  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${external_chakra_ui_core_["theme"].colors.gray[50]};
    border: 1px solid ${external_chakra_ui_core_["theme"].colors.gray[200]};
    border-radius: ${external_chakra_ui_core_["theme"].radii.lg};
  }
  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }
  .token.punctuation {
    color: #999;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #905;
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #690;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #9a6e3a;
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
  }
  .token.function,
  .token.class-name {
    color: #dd4a68;
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: #e90;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }

  .mdx-marker {
    display: block;
    margin-left: -${external_chakra_ui_core_["theme"].space[4]};
    margin-right: -${external_chakra_ui_core_["theme"].space[4]};
    padding-left: ${external_chakra_ui_core_["theme"].space[4]};
    padding-right: ${external_chakra_ui_core_["theme"].space[4]};
    background-color: ${external_chakra_ui_core_["theme"].colors.gray[200]};
    box-shadow: inset 3px 0px 0 0px ${external_chakra_ui_core_["theme"].colors.blue[600]};
    min-width: fit-content;
  }

  .remark-code-title {
    padding: ${external_chakra_ui_core_["theme"].space[2]} ${external_chakra_ui_core_["theme"].space[4]};
    font-family: ${external_chakra_ui_core_["theme"].fonts.mono};
    background: ${external_chakra_ui_core_["theme"].colors.gray[200]};
    color: ${external_chakra_ui_core_["theme"].colors.gray[800]};
    border: 1px solid ${external_chakra_ui_core_["theme"].colors.gray[200]};
    border-top-left-radius: ${external_chakra_ui_core_["theme"].radii.lg};
    border-top-right-radius: ${external_chakra_ui_core_["theme"].radii.lg};
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0;
    width: 100%;

    + pre {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 0;
    }
  }
`;
const prismLightTheme = core_["css"]`
  ${prismBaseTheme};

  code[class*='language-'],
  pre[class*='language-'] {
    color: ${external_chakra_ui_core_["theme"].colors.gray[800]};
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${external_chakra_ui_core_["theme"].colors.gray[50]};
    border: 1px solid ${external_chakra_ui_core_["theme"].colors.gray[200]};
  }

  .mdx-marker {
    background-color: hsla(204, 45%, 96%, 1);
  }
`;
const prismDarkTheme = core_["css"]`
  ${prismBaseTheme};

  :not(pre) > code[class*='language-'] {
    background: #011627;
  }

  .token.attr-name {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.comment {
    color: rgb(128, 147, 147);
  }

  .token.string,
  .token.url {
    color: rgb(173, 219, 103);
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: rgb(130, 170, 255);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: 'italic';
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #ffa7c4;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: ${external_chakra_ui_core_["theme"].colors.gray[50]};
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${external_chakra_ui_core_["theme"].colors.gray[800]};
    border: 1px solid ${external_chakra_ui_core_["theme"].colors.gray[700]};
  }

  .mdx-marker {
    background-color: ${external_chakra_ui_core_["theme"].colors.gray[700]};
  }

  .remark-code-title {
    background: ${external_chakra_ui_core_["theme"].colors.gray[700]};
    color: ${external_chakra_ui_core_["theme"].colors.gray[100]};
    border: 1px solid ${external_chakra_ui_core_["theme"].colors.gray[700]};
  }
`;
// CONCATENATED MODULE: ./next-seo.config.js
const title = "Felipe Slaughter-Quintero";
const description = "Felipe Slaughter-Quintero | Web Developer, UI Design and Content Creator";
const SEO = {
  title,
  description,
  canonical: "https://github.com/felipe-sq",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://github.com/felipe-sq",
    title,
    description,
    images: [{
      url: "https://github.com/felipe-sq",
      alt: title,
      width: 1280,
      height: 720
    }]
  }
};
/* harmony default export */ var next_seo_config = (SEO);
// EXTERNAL MODULE: ./styles/styles.scss
var styles = __webpack_require__("00et");

// CONCATENATED MODULE: ./pages/_app.js
var _app_jsx = external_react_default.a.createElement;











const GlobalStyle = ({
  children
}) => {
  const {
    colorMode
  } = Object(external_chakra_ui_core_["useColorMode"])();
  return _app_jsx(external_react_default.a.Fragment, null, _app_jsx(external_chakra_ui_core_["CSSReset"], null), _app_jsx(core_["Global"], {
    styles: core_["css"]`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "white" : "#171923"};
          }
        `
  }), children);
};

router_default.a.events.on("routeChangeComplete", () => {
  external_fathom_client_["trackPageview"]();
});

const App = ({
  Component,
  pageProps
}) => {
  Object(external_react_["useEffect"])(() => {
    if (true) {
      external_fathom_client_["load"](process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: ["https://github.com/felipe-sq"]
      });
    }
  }, []);
  return _app_jsx(external_chakra_ui_core_["ThemeProvider"], {
    theme: styles_theme
  }, _app_jsx(external_chakra_ui_core_["ColorModeProvider"], {
    value: "dark"
  }, _app_jsx(GlobalStyle, null, _app_jsx(external_next_seo_["DefaultSeo"], next_seo_config), _app_jsx(Component, pageProps))));
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (App);

/***/ }),

/***/ "3vLF":
/***/ (function(module, exports) {

module.exports = require("@emotion/core");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "WKWs":
/***/ (function(module, exports) {

module.exports = require("@chakra-ui/core");

/***/ }),

/***/ "ZRTx":
/***/ (function(module, exports) {

module.exports = require("fathom-client");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "efsx":
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ })

/******/ });