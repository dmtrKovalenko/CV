import * as React from "react";
import { Landing } from "../components/landing/Landing";
import { AboutMe } from "../components/landing/AboutMe";
import { Speaking } from "../components/landing/Speaking";

interface LandingProps {}

const Main: React.FunctionComponent<LandingProps> = () => {
  return (
    <>
      <Landing />
      <AboutMe />
      <Speaking />
    </>
  );
};

export default Main;
