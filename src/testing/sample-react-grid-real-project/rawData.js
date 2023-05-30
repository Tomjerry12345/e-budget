import { months } from "../../values/react-grid/helpers";

const toFixed = (n, fixed) =>
  ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

function generateRandomValues(value, variation) {
  const min = value - variation;
  const max = value + variation;
  return months().map(() => toFixed(Math.random() * (max - min + 1) + min, 2));
}

export const data = [
  {
    title: "Test 1",
    year1: [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
    ],
    year2: [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
    ]
  },
  {
    title: "Test 2",
    year1: [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
    ],
    year2: [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
    ]
  },
];
