import { makeStyles } from "@material-ui/core";

export const useTigerStyles = makeStyles({
  "@keyframes dash": {
    to: {
      strokeDashoffset: 0,
      fillOpacity: 1,
      strokeWidth: 0,
    },
  },
  animating: {
    // nothing
  },
  tigerAnimationLayer: {
    width: "auto",
    margin: "32px auto",
    zIndex: 2,
    cursor: "pointer",

    "& > svg": {
      overflow: "visible",
      zIndex: 1,
      width: 300,

      "@media (min-width: 899px) and (max-width: 1299px)": {
        width: 450,
      },
      "@media (min-width: 1299px)": {
        width: 400,
      },

      "& polygon, path, ellipse": {
        fillOpacity: 1,
        W: "50% 50%",
        transform: "translate(0)",
        transformBox: 'fill-box',
        transition:
          "transform 3.5s ease, scale 0.3s ease-in-out, opacity 0.2s ease, stroke-dashoffset 1s ease-in-out",
        strokeDasharray: "500",
        strokeDashoffset: "500",
      },
      "& #left-side polygon:nth-of-type(n + 1), & #left-side path:nth-of-type(n + 1), & #left-side ellipse": {
        fillOpacity: 0,
        stroke: "#fafafa",
        strokeWidth: 0.5,
        strokeDasharray: "600",
        strokeDashoffset: "600",
        W: "forwards",
        animation: "$dash 8s ease-in-out 1", // goto line :4
        animationFillMode: "forwards",
      },
    },

    "&$animating > svg": {
      willChange: "transform, opacity",
    },
    // If you are here, then sit and listen my friend
    // All that we do is only taking each 5th, 4th, ... 1st svg path and pushing it out of screen
    // with some directory. For some of them also change stroke width, opacity.
    // You can also try to rotate and scale them, but it works awful in safari
    "&$animating > svg #right-side polygon:nth-of-type(5n + 1), &$animating > svg #right-side path:nth-of-type(5n + 1)": {
      transform: "translate(2000px, -6000px) scale(8) rotate(-180deg)",
      opacity: "0.3",
    },
    "&$animating > svg #right-side polygon:nth-of-type(5n + 2), &$animating > svg #right-side path:nth-of-type(5n + 2)": {
      transform: "translate(8000px, -6000px) scale(8) rotate(-180deg)",
      opacity: "0.5",
    },
    "&$animating > svg #right-side polygon:nth-of-type(5n + 3), &$animating > svg #right-side path:nth-of-type(5n + 3)": {
      transform: "translate(10000px, 0) scale(8) rotate(-180deg)",
      opacity: "0.3",
    },
    "&$animating > svg #right-side polygon:nth-of-type(5n + 4), &$animating > svg #right-side path:nth-of-type(5n + 4)": {
      transform: "translate(10000px, 6000px) scale(8) rotate(-180deg)",
      opacity: "0.5",
    },
    "&$animating > svg #right-side polygon:nth-of-type(5n + 5), &$animating > svg #right-side path:nth-of-type(5n + 5), &$animating > svg #right-side ellipse": {
      transform: "translate(0, 10000px) scale(8) rotate(-180deg)",
      opacity: "0.3",

    },
    "&$animating > svg #left-side polygon:nth-of-type(5n + 1), &$animating > svg #left-side path:nth-of-type(5n + 1)": {
      transform: "translate(-4000px, -4000px) scale(8) rotate(180deg)",
      opacity: "0.3",
    },
    "&$animating > svg #left-side polygon:nth-of-type(5n + 2), &$animating > svg #left-side path:nth-of-type(5n + 2)": {
      transform: "translate(-8000px, -1000px) scale(8) rotate(180deg)",
      opacity: "0.5",
    },
    "&$animating > svg #left-side polygon:nth-of-type(5n + 3), &$animating > svg #left-side path:nth-of-type(5n + 3)": {
      transform: "translate(-8000px, 1000px) scale(8) rotate(180deg)",
      opacity: "0.3",
    },
    "&$animating > svg #left-side polygon:nth-of-type(5n + 4), &$animating > svg #left-side path:nth-of-type(5n + 4)": {
      transform: "translate(-8000px, 5000px) scale(8) rotate(180deg)",
      opacity: "0.5",
      
    },
    "&$animating > svg #left-side polygon:nth-of-type(5n + 5), &$animating > svg #left-side path:nth-of-type(5n + 5), &$animating > svg #left-side ellipse": {
      transform: "translate(0, 9000px) scale(8) rotate(180deg)",
      opacity: "0.3",
      
    },
  },
  // not interesting vector colors
  st0: {
    fill: "#ffe475",
  },
  st1: {
    fill: "#c26c47",
  },
  st2: {
    fill: "#49312d",
  },
  st3: {
    fill: "#604219",
  },
  st4: {
    fill: "#554d4d",
  },
  st5: {
    fill: "#635723",
  },
  st6: {
    fill: "#84712c",
  },
  st7: {
    fill: "#947158",
  },
  st8: {
    fill: "#c07e48",
  },
  st9: {
    fill: "#c98777",
  },
  st10: {
    fill: "#df9126",
  },
  st11: {
    fill: "#f68c47",
  },
  st12: {
    fill: "#fbad23",
  },
  st13: {
    fill: "#f8b26c",
  },
  st14: {
    fill: "#eec075",
  },
  st15: {
    fill: "#f6dc8f",
  },
  st16: {
    fill: "#ead4b5",
  },
  st17: {
    fill: "#eaddce",
  },
  st18: {
    fill: "#fef8cc",
  },
  st19: {
    fill: "#fefdf4",
  },
  st20: {
    fill: "#e9e9ea",
  },
  st21: {
    fill: "#bbbcac",
  },
  st22: {
    fill: "#c9c0ad",
  },
  st23: {
    fill: "#d3c8c2",
  },
  st24: {
    fill: "#afa49f",
  },
  st25: {
    fill: "#8d7d71",
  },
  st26: {
    fill: "#b5ad6e",
  },
  st27: {
    fill: "#787fa0",
  },
  st28: {
    fill: "#e1afa3",
  },
  st29: {
    fill: "#d69385",
  },
  st30: {
    fill: "#c69849",
  },
  st31: {
    fill: "#faa64c",
  },
  st32: {
    fill: "#ffd386",
  },
  st33: {
    fill: "#d1c76d",
  },
  st34: {
    fill: "#56481c",
  },
});
