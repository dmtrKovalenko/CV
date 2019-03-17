import TypeIt from 'typeit'

const strings = {
  deer: "and that's a deer",
  webDev: "and I am <span style='color:#feeb3b;'> JavaScript </span> Developer",
  youCanDraw: "You can create own image by clicking",
}

new TypeIt("#typing", {
  speed: 90,
  deleteSpeed: 40,
  startDelay: 900
}) 
  .type(strings.deer)
  .pause(500)
  .delete(strings.deer.length)
  .type(strings.youCanDraw)
  .pause(1000)
  .delete(strings.youCanDraw.length)
  .type(strings.webDev)
  .pause(100)
  .go();