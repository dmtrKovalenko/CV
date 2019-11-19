import './mouse-icon.css'
import { styled } from "@material-ui/core";

export const MouseIcon = styled("div")((props) => ({
  position: "relative",
  top: "-70px",
  width: "40px",
  height: "70px",
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: "-35px",
  boxShadow: "inset 0 0 0 1px #fff",
  borderRadius: "25px",
  // animationName: "mouse-appear",
  // animationDuration: '.5s',
  // // animationDelay: '2s',
  // animationIterationCount: 1,
  // animationFillMode: 'forwards',
  // visibility: 'hidden',

  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    width: "8px",
    height: "8px",
    backgroundColor: props.theme.palette.primary.main,
    marginLeft: "-4px",
    top: "8px",
    borderRadius: "4px",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: "mouse-scroll"
  }
}));


