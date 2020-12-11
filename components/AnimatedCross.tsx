import * as React from "react";
import clsx from "clsx";
import { theme } from "../utils/theme";
import { makeStyles, IconButton, IconButtonProps } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: "50%",

    "&:active": {
      "& svg": {
        willChange: "transform",
        transform: "rotate(180deg)",
      }
    },

    "& svg": {
      transition: theme.transitions.create("transform"),
      width: 32,
      height: 32,
    },
  },
});

interface AnimatedCrossProps extends IconButtonProps {}

export const AnimatedCross: React.FC<AnimatedCrossProps> = ({
  className,
  ...other
}) => {
  const styles = useStyles();
  return (
    <IconButton className={clsx(styles.root, className)} {...other}>
      <svg viewBox="0 0 40 40">
        <path
          stroke="url(#svg-gradient)"
          fill="transparent"
          strokeLinecap="round"
          strokeWidth={5}
          d="M 10,10 L 30,30 M 30,10 L 10,30"
        />
      </svg>
    </IconButton>
  );
};
