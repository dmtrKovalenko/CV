import TypeIt from "typeit";

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
    .type("n awesome tiger, click or tap it to see some magic")
    .pause(1000)
    .delete()
    .type(`and I am <span class="gradientText secondaryFont"> JavaScript </span> Developer`)
    .pause(10000)
    .delete('Engineer'.length)
    .type('Speaker')
    .pause(10000)
    .delete('Speaker'.length)
    .type('Hater')
    .pause('1000')
    .go();
};
