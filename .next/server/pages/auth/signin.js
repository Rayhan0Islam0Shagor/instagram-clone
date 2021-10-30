"use strict";
(() => {
var exports = {};
exports.id = 65;
exports.ids = [65];
exports.modules = {

/***/ 0:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ signin),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(649);
;// CONCATENATED MODULE: external "react-google-button"
const external_react_google_button_namespaceObject = require("react-google-button");
var external_react_google_button_default = /*#__PURE__*/__webpack_require__.n(external_react_google_button_namespaceObject);
// EXTERNAL MODULE: ./Components/Header.jsx
var Header = __webpack_require__(131);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: ./pages/auth/signin.js





const Signin = ({ providers  })=>{
    const router = (0,router_.useRouter)();
    const handleClick = ()=>{
        router.push('/');
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: "flex flex-col items-center mt-8",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        onClick: handleClick,
                        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png",
                        className: "cursor-pointer w-80",
                        alt: "logo"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "italic font-xs",
                        children: "This sis not a real APP, It is built for learning purpose."
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                className: "flex justify-center mt-6",
                children: Object.values(providers).map((provider)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_google_button_default()), {
                            onClick: ()=>(0,react_.signIn)(provider.id, {
                                    callbackUrl: '/'
                                })
                            ,
                            children: [
                                "Sign in with ",
                                provider.name
                            ]
                        })
                    }, provider.name)
                )
            })
        ]
    }));
};
// This is the recommended way for Next.js 9.3 or newer
async function getServerSideProps(context) {
    const providers = await (0,react_.getProviders)();
    return {
        props: {
            providers
        }
    };
}
/* harmony default export */ const signin = (Signin);


/***/ }),

/***/ 768:
/***/ ((module) => {

module.exports = require("@heroicons/react/outline");

/***/ }),

/***/ 143:
/***/ ((module) => {

module.exports = require("@heroicons/react/solid");

/***/ }),

/***/ 649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 28:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 18:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675,131], () => (__webpack_exec__(0)));
module.exports = __webpack_exports__;

})();