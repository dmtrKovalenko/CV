import * as React from "react";
import { Landing } from "../components/sections/landing/Landing";
import { AboutMe } from "../components/sections/about/AboutMe";

interface LandingProps {}

const Main: React.FunctionComponent<LandingProps> = () => {
  return (
    <>
      <Landing />
      <AboutMe />
    </>
  );
};

export default Main;
