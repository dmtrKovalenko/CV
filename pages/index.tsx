import * as React from "react";
import { Landing } from "../pages-lib/Landing";
import { AboutMe } from "../pages-lib/AboutMe";
import { Speaking } from "../pages-lib/Speaking";
import { Feedback } from "../pages-lib/Feedback";

const Main: React.FunctionComponent = () => {
  return (
    <>
      <Landing />
      <AboutMe />
      <Speaking />
      <Feedback />
    </>
  );
};

export default Main;
