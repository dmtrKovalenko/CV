import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { BoldTypography } from "./Common";
import clsx from "clsx";

const framerTransition = {
  hidden: {
    y: "200%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

export const AnimatedText = (props: {
  text: string;
  highlightWords: string[];
}) => {
  const words = React.useMemo(() => {
    const splitWords = props.text.split(" ");
    const words: string[][] = [];

    for (const [, item] of splitWords.entries()) {
      words.push(item.split(""));
    }

    words.map((word) => {
      return word.push("\u00A0");
    });

    return words;
  }, [props.text]);

  return (
    <BoldTypography variant="h3" align="center">
      {words.map((word, index) => {
        const toHighlight = props.highlightWords.includes(
          word.join("").trim().toLowerCase()
        );

        return (
          // Wrap each word in the Wrapper component
          <Fragment key={index}>
            {words[index].flat().map((element, index) => {
              console.log(element);
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    className={clsx(toHighlight && "gradientTextToTop")}
                    style={{ display: "inline-block" }}
                    variants={framerTransition}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Fragment>
        );
      })}
    </BoldTypography>
  );
};
