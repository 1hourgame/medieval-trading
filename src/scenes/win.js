import winImage from "../assets/win.jpeg";
export class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "Win", active: false });
  }

  preload() {
    this.load.image("win", winImage);
  }

  create() {
    // Display game over image at the center of the screen
    const winImage = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "win"
    );

    // Display game over text at the center of the screen
    const gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "You win",
      {
        fontSize: "64px",
        fill: "#fff",
        stroke: "#000",
        strokeThickness: 6,
      }
    );
    gameOverText.setOrigin(0.5);
  }

  update() {
    // on mouse down event restart the game
    if (this.input.activePointer.isDown) {
      this.scene.start("Game");
    }
  }
}
