export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver", active: false });
  }

  create() {
    // Display game over text at the center of the screen
    const gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Game Over",
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
