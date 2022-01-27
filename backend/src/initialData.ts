import { Ice } from 'shared';

const initialData: Ice[] = [
  {
    allergenics: 'Laktoseintoleranz',
    categorie: 'Sahne-Eis',
    ingredients: [
      'Milch',
      'Kokosfett',
      'Zucker',
      'Schlagsahne',
      'Bourbon-Vanilleextrakt',
      'Vanilleschoten',
    ],
    name: 'Bourbon Vanille',
    nutritionalValue: 208,
    price: 3.65,
  },
  {
    allergenics: 'Laktoseintoleranz, Schalenfrüchte',
    categorie: 'Sahne-Eis',
    ingredients: ['Milch', 'Zucker', 'Kakao', 'Schlagsahne'],
    name: 'Chocolate Chips',
    nutritionalValue: 219,
    price: 3.65,
  },
];

export default initialData;
