import { icons, images } from "../constants";

export const restoraniMock = [
  { id: 1, sourceSlike: images.cards, imeRestorana: "kuca1" },
  { id: 2, sourceSlike: icons.delivery, imeRestorana: "kuca2" },
  { id: 3, sourceSlike: icons.eye, imeRestorana: "kuca3" },
  { id: 4, sourceSlike: images.cards, imeRestorana: "kuca4" },
  { id: 5, sourceSlike: images.cards, imeRestorana: "kuca5" },
  { id: 6, sourceSlike: images.cards, imeRestorana: "kuca6" },
];

export const jelaMock = [
  {
    id: 1,
    naziv: "Pasta Bolonjeze",
    cena: "600 RSD",
    tip: "paste",
    restoranId: 1,
    sourceSlike: images.cards,
    opis: " neki kul opis ovog jela",
    dodaci: ["Kecap", "Majonez", "Salata"],
  },
  {
    id: 2,
    naziv: "Pasta Carbonara",
    cena: "600 RSD",
    tip: "paste",
    restoranId: 1,
    sourceSlike: images.cards,
    opis: " neki kul opis ovog jela",
    dodaci: ["Kecap", "Majonez", "Salata"],
  },
  {
    id: 3,
    naziv: "Cheeseburger",
    cena: "500 RSD",
    tip: "burgeri",
    restoranId: 1,
    sourceSlike: images.cards,
    opis: " neki kul opis ovog jela",
    dodaci: ["Kecap", "Majonez", "Salata"],
  },

  {
    id: 4,
    naziv: "Hamburger",
    cena: "500 RSD",
    tip: "burgeri",
    restoranId: 1,
    sourceSlike: images.cards,
    opis: " neki kul opis ovog jela",
    dodaci: ["Kecap", "Majonez", "Salata"],
  },
];
