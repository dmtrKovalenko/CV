import * as React from "react";
import { Landing } from "../pages-lib/Landing";
import { AboutMe } from "../pages-lib/AboutMe";
import { Speaking } from "../pages-lib/Speaking";

const Main: React.FunctionComponent = () => {
  return (
    <>
      <Landing />
      <AboutMe />
      <Speaking />
    </>
  );
};

export default Main;
