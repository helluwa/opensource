// src/Paragraph.tsx
import { Fragment, jsx } from "react/jsx-runtime";
var Paragraph = ({
  text = "Boop"
}) => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("h1", {
      children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero harum omnis nulla maiores praesentium hic? Eos molestias, ex deserunt quisquam doloremque dolore nostrum molestiae quos quam enim, harum deleniti natus!"
    })
  });
};

// src/ngprogress/index.tsx
import { useNProgress } from "@tanem/react-nprogress";

// src/ngprogress/Bar.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Bar = ({
  animationDuration,
  progress,
  color
}) => /* @__PURE__ */ jsx2("div", {
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
  children: /* @__PURE__ */ jsx2("div", {
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
import { jsx as jsx3 } from "react/jsx-runtime";
var Container = ({ animationDuration, children, isFinished }) => /* @__PURE__ */ jsx3("div", {
  style: {
    opacity: isFinished ? 0 : 1,
    pointerEvents: "none",
    transition: `opacity ${animationDuration}ms linear`
  },
  children
});
var Container_default = Container;

// src/ngprogress/Spinner.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var Spinner = () => /* @__PURE__ */ jsx4("div", {
  style: {
    display: "block",
    position: "fixed",
    right: 15,
    top: 15,
    zIndex: 1031
  },
  children: /* @__PURE__ */ jsx4("div", {
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
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var NGProgress = ({
  isAnimating,
  onlySpinner,
  spinner,
  barColor
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  });
  return /* @__PURE__ */ jsxs(Container_default, {
    animationDuration,
    isFinished,
    children: [
      !onlySpinner && /* @__PURE__ */ jsx5(Bar_default, {
        animationDuration,
        progress,
        color: barColor ?? "#29d"
      }),
      (spinner || onlySpinner) && /* @__PURE__ */ jsx5(Spinner_default, {})
    ]
  });
};

// src/Button.tsx
import "react";
import { jsx as jsx6 } from "react/jsx-runtime";
function Button({ text = "Boop" }) {
  return /* @__PURE__ */ jsx6("button", {
    type: "button",
    children: text
  });
}

// src/Title.tsx
import "react";
import { jsx as jsx7 } from "react/jsx-runtime";
function GreenButton({ text = "Boop" }) {
  return /* @__PURE__ */ jsx7("button", {
    style: { backgroundColor: "green" },
    type: "button",
    children: text
  });
}
export {
  Button,
  GreenButton,
  NGProgress,
  Paragraph
};
