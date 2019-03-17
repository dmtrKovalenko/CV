import { IParticlesParams } from "react-particles-js";

export const deerParticles: IParticlesParams = {
  fps_limit: 34,
  particles: {
    number: {
      value: 200,
      density: {
        enable: false
      }
    },
    line_linked: {
      enable: true,
      distance: 30,
      opacity: 0.4
    },
    move: {
      speed: 1
    },
    opacity: {
      anim: {
        enable: true,
        opacity_min: 0.05,
        speed: 2,
        sync: false
      },
      value: 0.4
    }
  },
  polygon: {
    enable: true,
    scale: 0.5,
    type: "inline",
    move: {
      radius: 10
    },
    url: "/static/deer.svg",
    inline: {
      arrangement: "equidistant"
    },
    draw: {
      enable: true,
      stroke: {
        color: "rgba(255, 255, 255, .3)"
      }
    }
  },
  retina_detect: false,
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "push",
      }
    },
    modes: {
      bubble: {
        size: 6,
        distance: 40
      }
    }
  }
};