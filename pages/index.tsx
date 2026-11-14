import * as React from "react";
import { Landing } from "../pages-lib/Landing";
import { AboutMe } from "../pages-lib/AboutMe";
import { Speaking } from "../pages-lib/Speaking";
import { Feedback } from "../pages-lib/Feedback";
import { profilePage } from "../utils/profile";

const Main: React.FunctionComponent = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <Landing />
      <AboutMe />
      <Speaking />
      <Feedback />
    </>
  );
};

export default Main;
