// Phaser Retro Wave Racing Game
import Phaser from "phaser";
import { MainScene } from "./scenes/main";
import { GameOverScene } from "./scenes/game-over";
import { MapScene } from "./scenes/map";
import { WinScene } from "./scenes/win";

const WIDTH = 480;
const HEIGHT = 640;

const COLORS = {
  background: 0x000000,
};

const config = {
  type: Phaser.AUTO,
  parent: "meideval-trading",
  width: WIDTH,
  height: HEIGHT,
  scene: [MainScene, MapScene, GameOverScene, WinScene],
  backgroundColor: COLORS.background,
  pixelArt: true,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
