import map from "../assets/map.jpg";
import { towns } from "./towns";

const TOWN_SIZE = 100;

export class MapScene extends Phaser.Scene {
  constructor() {
    super({ key: "Map", active: false });
  }

  preload() {
    this.load.image("map", map);
    // Load towns
    towns.forEach((town) => {
      this.load.image(town.name, town.url);
    });
  }

  init(data) {
    this.townId = data.townId || 0;
  }

  create() {
    // Create background, draw it in the center of the screen
    const mapImage = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 95,
      "map"
    );
    // scale the image to fit the width and height of the screen
    mapImage.displayWidth = this.cameras.main.width;
    mapImage.displayHeight = this.cameras.main.height;

    // Create towns
    towns.forEach((town, index) => {
      const townImage = this.add.image(town.x, town.y, town.name);
      townImage.displayWidth = TOWN_SIZE;
      townImage.displayHeight = TOWN_SIZE;
      // Clicking on the town calls the goToTown function
      townImage.setInteractive();
      townImage.on("pointerdown", () => this.goToTown(index));

      // if the town is the current town, draw a red border around it
      if (index === this.townId) {
        const border = this.add.graphics();
        border.lineStyle(4, 0xff0000, 1);
        border.strokeRect(
          town.x - TOWN_SIZE / 2,
          town.y - TOWN_SIZE / 2,
          TOWN_SIZE,
          TOWN_SIZE
        );
      } else {
        // Draw travel price
        const price = towns[this.townId].travelCosts[index];
        const travelPrice = this.add.text(
          town.x,
          town.y + TOWN_SIZE / 2 - 25,
          `Travel\ncost: ${price}`,
          {
            fontSize: "16px",
            fill: "#fff",
          }
        );
        // make outline
        travelPrice.setStroke("#000", 4);
        travelPrice.setOrigin(0.5, 0.5);
      }

      // Draw town name
      const townName = this.add.text(
        town.x,
        town.y - TOWN_SIZE / 2 + 10,
        town.name,
        {
          fontSize: "16px",
          fill: "#fff",
        }
      );
      // make outline
      townName.setStroke("#000", 4);
      townName.setOrigin(0.5, 0.5);
    });
  }

  goToTown(index) {
    this.scene.start("Game", { townId: index });
  }

  update() {}
}
