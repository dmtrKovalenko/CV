import { styled } from "@material-ui/core";

export const MouseIcon = styled("div")(props => ({
  opacity: 0,
  width: "40px",
  height: "70px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "-35px",
  boxShadow: "inset 0 0 0 1px #fff",
  borderRadius: "25px",
  display: "flex",
  justifyContent: "center",
  animationName: "mouse-icon-appear",
  animationDuration: ".5s",
  animationDelay: "5s",
  animationIterationCount: 1,
  animationFillMode: "forwards",

  "&::before": {
    content: '""',
    marginTop: "10px",
    width: "8px",
    height: "8px",
    backgroundColor: props.theme.palette.primary.light,
    borderRadius: "4px",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: "mouse-icon-scroll"
  }
}));
