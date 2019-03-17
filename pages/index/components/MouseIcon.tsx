import React from 'react'
import { styled } from "@material-ui/styles";
import { Fade, Hidden } from "@material-ui/core";
import { useState, useEffect } from "react";

const Icon = styled("div")(() => ({
  position: "relative",
  top: "-70px",
  left: "50%",
  width: "40px",
  height: "70px",
  marginLeft: "-20px",
  marginTop: "-35px",
  boxShadow: "inset 0 0 0 1px #fff",
  borderRadius: "25px",

  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    width: "8px",
    height: "8px",
    background: "#feeb3b",
    marginLeft: "-4px",
    top: "8px",
    borderRadius: "4px",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: "mouse-scroll" // make sure that this animation coming from global.css static file
  }
}))


export const MouseIcon: React.FC = () => {
  const [displaying, setIsDisplaying] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsDisplaying(true), 12000)
  }, [])
  
  return (
    <Hidden smDown>
      <Fade timeout={1000} in={displaying}>
        <Icon />
      </Fade>
    </Hidden>
  )
}