import * as React from "react";
import { Landing } from "../components/sections/landing/Landing";
import { AboutMe } from "../components/sections/about/AboutMe";
import { withGlobalStylesAndKeyframes } from "../components/utils/globalStylesAndKeyframes";

interface LandingProps {}

const Main: React.FunctionComponent<LandingProps> = () => {
  return (
    <>
      <Landing />
      <AboutMe />
    </>
  );
};

export default withGlobalStylesAndKeyframes(Main);
