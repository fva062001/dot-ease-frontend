const mockData = [
  {
    id: 1,
    title: "Primera Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 2,
    title: "Segunda Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 3,
    title: "Tercera Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 4,
    title: "Cuarta Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 5,
    title: "Quinta Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 6,
    title: "Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 7,
    title: "Séptima Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 8,
    title: "Octava Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
  {
    id: 9,
    title: "Novena Traducción",
    fromLanguage: "Braille",
    toLanguage: "Español",
    translationResult:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis diam ex. Maecenas convallis laoreet mauris ut molestie. In tincidunt est dolor, sed ultrices ex ullamcorper vitae. Nulla posuere finibus libero vitae tincidunt. Duis id dolor malesuada, molestie augue eget, vulputate elit. Duis eget lorem sit amet sapien gravida aliquet sit amet id metus.",
  },
];

const getAllData = () => {
  return mockData;
};

const getDataById = (id) => {
  const found = mockData.find((data) => data.id === id);
  return found;
};

export {getAllData, getDataById};
