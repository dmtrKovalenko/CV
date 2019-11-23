import './mouse-icon.css'
import { styled } from "@material-ui/core";

export const MouseIcon = styled("div")((props) => ({
  // position: "relative",
  overflow: 'hidden',
  top: "-70px",
  width: "40px",
  height: "70px",
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: "-35px",
  boxShadow: "inset 0 0 0 1px #fff",
  borderRadius: "25px",
  display: 'flex',
  justifyContent: 'center',
  animationName: "mouse-appear",
  animationDuration: '.5s',
  animationDelay: '2s',
  animationIterationCount: 1,
  animationFillMode: 'forwards',
  // visibility: 'hidden',

  "&::before": {
    content: '""',
    width: "8px",
    height: "8px",
    backgroundColor: props.theme.palette.primary.main,
    borderRadius: "4px",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    // animationName: "mouse-scroll"
  }
}));


