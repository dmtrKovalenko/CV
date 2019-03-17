import * as React from 'react';
import { Deer } from '../src/sections/deer/Deer';
import { AboutMe } from '../src/sections/about/AboutMe';

interface LandingProps {
}

const Landing: React.FunctionComponent<LandingProps> = (props) => {
  return (
    <>
      <Deer />
      <AboutMe />
    </>
  )
};

export default Landing;