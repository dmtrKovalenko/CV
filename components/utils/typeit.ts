import TypeIt from "typeit";
import { theme } from "./getPageContext";

export const start = () => {
  new TypeIt("#typing", {
    speed: 90,
    deleteSpeed: 40,
    startDelay: 900
  })
    .type("and that's not me")
    .pause(500)
    .delete()
    .type("it's a")
    .pause(800)
    .type("n awesome tiger, tap or hover it to see some magic")
    .pause(1000)
    .delete()
    .type(
      `and I am <span style='color:${theme.palette.primary.main}'> JavaScript </span> Developer`
    )
    .pause(100)
    .go();
};
