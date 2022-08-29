import Phaser from "phaser";

import coin from "../assets/coin.png";
import { towns } from "./towns";
/*
Array of commodities:
1. Gold
2. Silver
3. Copper
4. Wool
5. Furs
 */
const commodities = ["Gold", "Silver", "Copper", "Wool", "Furs"];

const FONT_SIZE = "24px";

const MAX_OWNED = 10;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: true });

    /*
     Array of towns:
    {
      url,
      name,
      image,
    }
    */
    this.towns = [...towns];
    this.coins = 100;
    this.townId = 0;
    this.ownedCommodities = [0, 0, 0, 0, 0];
  }

  init(data) {
    const oldTownId = this.townId;
    this.townId = data.townId || 0;
    if (oldTownId !== this.townId) {
      // decrease coins by 10
      this.coins -= towns[oldTownId].travelCosts[this.townId];
    }

    // If coins are less than 0, go to the game over scene
    if (this.coins < 0) {
      this.scene.start("GameOver");
    }
  }

  preload() {
    // Load images
    this.towns.forEach((town) => {
      town.image = this.load.image(town.name, town.url);
    });

    // Load coin image
    this.load.image("coin", coin);
  }

  randomizePrices() {
    this.price = this.towns[this.townId].prices;
    this.price.forEach((price, index) => {
      // Increase the price by random value between -10% and 10%
      this.price[index] = Math.round(price * (1 + (Math.random() - 0.5) * 0.2));
    });
  }

  create() {
    this.randomizePrices();

    // Create background, draw it in the center of the screen
    this.towns[this.townId].image = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 95,
      this.towns[this.townId].name
    );

    // Draw the coin image in the top left and this.coins text next to the coin image
    const coinImage = this.add.image(50, 47, "coin");
    // Scale coin image to 100pxx100px
    coinImage.setScale(0.1);
    this.coinsText = this.add.text(75, 35, this.coins, {
      fontSize: FONT_SIZE,
      fill: "#fff",
    });

    // Draw the town name in the right top corner of the screen
    this.townNameText = this.add.text(
      this.cameras.main.centerX,
      35,
      this.towns[this.townId].name,
      {
        fontSize: FONT_SIZE,
        fill: "#fff",
      }
    );
    // Center the town name text
    this.townNameText.setOrigin(0.5, 0);

    // Draw Travel button in the top right corner of the screen
    this.travelButton = this.add.text(
      this.cameras.main.centerX + 100,
      35,
      "Travel",
      {
        fontSize: FONT_SIZE,
        fill: "#fff",
      }
    );
    // On click, change the town
    this.travelButton.setInteractive();
    this.travelButton.on("pointerdown", () => {
      // Go to the map scene
      this.scene.start("Map", { townId: this.townId });
    });

    this.ownedCommoditiesTexts = [];

    // Draw the list of commodities in the bottom of the screen
    commodities.forEach((commodity, index) => {
      const y = this.cameras.main.height - 250 + index * 50;
      this.add.text(20, y, commodity, {
        fontSize: FONT_SIZE,
        fill: "#fff",
      });

      // Draw the price of the commodity
      this.add.text(150, y, this.price[index], {
        fontSize: FONT_SIZE,
        fill: "#fff",
      });
      // Draw the buy button
      const buyButton = this.add.text(250, y, "Buy", {
        fontSize: FONT_SIZE,
        fill: "#fff",
      });
      // Add event listener to the buy button
      buyButton.setInteractive();
      buyButton.on("pointerdown", () => {
        console.log("Buy button clicked", index);
        this.buyCommodity(index);
        this.updateOwnedCommoditiesTexts();
      });

      // Draw the sell button
      const sellButton = this.add.text(320, y, "Sell", {
        fontSize: FONT_SIZE,
        fill: "#fff",
      });
      // Add event listener to the sell button
      sellButton.setInteractive();
      sellButton.on("pointerdown", () => {
        console.log(sellButton);
        console.log("Sell", index);
        this.sellCommodity(index);
        this.updateOwnedCommoditiesTexts();
      });

      // Draw the amount of owned commodities
      const text = this.add.text(400, y, this.ownedCommodities[index], {
        fontSize: FONT_SIZE,
        fill: "#fff",
      });
      this.ownedCommoditiesTexts.push(text);
    });
  }

  updateOwnedCommoditiesTexts() {
    this.ownedCommoditiesTexts.forEach((text, index) => {
      text.setText(this.ownedCommodities[index]);
    });
    // Update the coins text
    this.coinsText.setText(this.coins);
  }

  buyCommodity(index) {
    const totalOwned = this.ownedCommodities.reduce(
      (total, owned) => total + owned
    );
    if (totalOwned >= MAX_OWNED) {
      // cannot buy more commodities
      return;
    }
    if (this.coins >= this.price[index]) {
      this.coins -= this.price[index];
      this.ownedCommodities[index]++;
    }
  }

  sellCommodity(index) {
    if (this.ownedCommodities[index] > 0) {
      this.coins += this.price[index];
      this.ownedCommodities[index]--;
    }
  }

  update() {}
}
