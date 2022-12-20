"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  GreenButton: () => GreenButton,
  NGProgress: () => NGProgress,
  Paragraph: () => Paragraph
});
module.exports = __toCommonJS(src_exports);

// src/Paragraph.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Paragraph = ({
  text = "Boop"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
      children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero harum omnis nulla maiores praesentium hic? Eos molestias, ex deserunt quisquam doloremque dolore nostrum molestiae quos quam enim, harum deleniti natus!"
    })
  });
};

// src/ngprogress/index.tsx
var import_react_nprogress = require("@tanem/react-nprogress");

// src/ngprogress/Bar.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Bar = ({
  animationDuration,
  progress,
  color
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
  style: {
    background: color,
    height: 2,
    left: 0,
    marginLeft: `${(-1 + progress) * 100}%`,
    position: "fixed",
    top: 0,
    transition: `margin-left ${animationDuration}ms linear`,
    width: "100%",
    zIndex: 1031
  },
  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    style: {
      boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
      display: "block",
      height: "100%",
      opacity: 1,
      position: "absolute",
      right: 0,
      transform: "rotate(3deg) translate(0px, -4px)",
      width: 100
    }
  })
});
var Bar_default = Bar;

// src/ngprogress/Container.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Container = ({ animationDuration, children, isFinished }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
  style: {
    opacity: isFinished ? 0 : 1,
    pointerEvents: "none",
    transition: `opacity ${animationDuration}ms linear`
  },
  children
});
var Container_default = Container;

// src/ngprogress/Spinner.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Spinner = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
  style: {
    display: "block",
    position: "fixed",
    right: 15,
    top: 15,
    zIndex: 1031
  },
  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
    style: {
      animation: "400ms linear infinite spinner",
      borderBottom: "2px solid transparent",
      borderLeft: "2px solid #29d",
      borderRadius: "50%",
      borderRight: "2px solid transparent",
      borderTop: "2px solid #29d",
      boxSizing: "border-box",
      height: 18,
      width: 18
    }
  })
});
var Spinner_default = Spinner;

// src/ngprogress/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var NGProgress = ({
  isAnimating,
  onlySpinner,
  spinner,
  barColor
}) => {
  const { animationDuration, isFinished, progress } = (0, import_react_nprogress.useNProgress)({
    isAnimating
  });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Container_default, {
    animationDuration,
    isFinished,
    children: [
      !onlySpinner && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar_default, {
        animationDuration,
        progress,
        color: barColor ?? "#29d"
      }),
      (spinner || onlySpinner) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner_default, {})
    ]
  });
};

// src/Button.tsx
var React = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
function Button({ text = "Boop" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", {
    type: "button",
    children: text
  });
}

// src/Title.tsx
var React2 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function GreenButton({ text = "Boop" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
    style: { backgroundColor: "green" },
    type: "button",
    children: text
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  GreenButton,
  NGProgress,
  Paragraph
});
