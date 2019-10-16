"use strict";
/*
    Config.js - Ian Effendi
    Configuration settings.
*/

// Application flags.
export const Flags = {
  DEBUG: {
    MAIN: true,
    CANVAS: true,
    APP: true,
    UTILS: {
      DOM_UTILS: true,
    }
  }
};

// Settings to apply to elements on the page.
export const Settings = {
  DEFAULT: {
    CANVAS: { // In pixels.
      SIZE: {
        WIDTH: 600,
        HEIGHT: 400,
      },
    },
    FONT_SIZE: { // In pixels.
      MIN: 12,
      MAX: 36,
    }
  }
};
