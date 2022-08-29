import town01 from "../assets/town01.jpg";
import town02 from "../assets/town02.jpg";
import town03 from "../assets/town03.jpg";
import town04 from "../assets/town04.jpg";
import town05 from "../assets/town05.jpg";
import town06 from "../assets/town06.jpg";
import town07 from "../assets/town07.jpg";
import town08 from "../assets/town08.jpg";
import town09 from "../assets/town09.jpg";
import town10 from "../assets/town10.jpg";

/*
Names:
1. Mythrall
2. Haven
3. Oakhurst
4. Willowbrook
5. Sterling
6. Falconcrest
7. Glendale
8. Kingsbridge
9. Windermere
10. Whitewood
*/
export const towns = [
  {
    url: town01,
    name: "Mythrall",
    prices: [1000, 250, 80, 20, 100],
    x: 340,
    y: 70,
    travelCosts: [0, 10, 20, 30, 10],
  },
  {
    url: town02,
    name: "Haven",
    prices: [1100, 290, 70, 20, 110],
    x: 120,
    y: 220,
    travelCosts: [10, 0, 20, 20, 5],
  },
  {
    url: town03,
    name: "Oakhurst",
    prices: [1000, 250, 20, 70, 120],
    x: 380,
    y: 430,
    travelCosts: [20, 20, 0, 30, 10],
  },
  {
    url: town04,
    name: "Willowbrook",
    prices: [1400, 150, 90, 10, 80],
    x: 70,
    y: 460,
    travelCosts: [30, 20, 30, 0, 20],
  },
  {
    url: town05,
    name: "Sterling",
    prices: [1000, 250, 80, 70, 120],
    x: 100,
    y: 100,
    travelCosts: [10, 5, 10, 20, 0],
  },
  // { url: town06, name: "Falconcrest", prices: [900, 200, 40, 80, 190], x: 0, y: 0 },
  // { url: town07, name: "Glendale", prices: [600, 230, 80, 20, 110], x: 0, y: 0 },
  // { url: town08, name: "Kingsbridge", prices: [400, 220, 80, 70, 100], x: 0, y: 0 },
  // { url: town09, name: "Windermere", prices: [1000, 230, 80, 30, 80], x: 0, y: 0 },
  // { url: town10, name: "Whitewood", prices: [1200, 250, 80, 20, 100], x: 0, y: 0 },
];
