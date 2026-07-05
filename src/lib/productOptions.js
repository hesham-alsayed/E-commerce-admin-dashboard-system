export const TYPE_OPTIONS = {
  men: [
    "clothes",
    "trousers",
    "shorts",
    "coat",
    "blazer",
    "vest",
    "shoes",
  ],

  kids: [
    "clothes",
    "trousers",
    "shorts",
    "coat",
    "blazer",
    "vest",
    "shoes",
  ],
};

export const SIZE_OPTIONS = {
  men: {
    clothes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],

    trousers: Array.from(
      { length: 9 },
      (_, i) => String(28 + i * 2),
    ),

    shorts: Array.from(
      { length: 7 },
      (_, i) => String(28 + i * 2),
    ),

    coat: Array.from(
      { length: 14 },
      (_, i) => String(44 + i * 2),
    ),

    blazer: Array.from(
      { length: 14 },
      (_, i) => String(44 + i * 2),
    ),

    vest: ["4XL", "5XL", "6XL", "7XL", "8XL"],

    shoes: Array.from(
      { length: 7 },
      (_, i) => String(39 + i * 2),
    ),
  },

  kids: {
    clothes: Array.from(
      { length: 8 },
      (_, i) => String(6 + i * 2),
    ),

    trousers: Array.from(
      { length: 7 },
      (_, i) => String(8 + i * 2),
    ),

    shorts: Array.from(
      { length: 9 },
      (_, i) => String(4 + i * 2),
    ),

    coat: Array.from(
      { length: 7 },
      (_, i) => String(8 + i * 2),
    ),

    blazer: Array.from(
      { length: 7 },
      (_, i) => String(8 + i * 2),
    ),

    vest: Array.from(
      { length: 7 },
      (_, i) => String(8 + i * 2),
    ),

    shoes: Array.from(
      { length: 6 },
      (_, i) => String(24 + i * 2),
    ),
  },
};