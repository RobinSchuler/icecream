export interface Ice {
  name: string;
  categorie: Categorie;
  ingredients: string[];
  allergenics: string;
  nutritionalValue: number | undefined;
  price: number | undefined;
}

export const categories = ['Sahne-Eis', 'Frucht-Eis', 'Wasser-Eis'] as const;
export type Categorie = typeof categories[number] | undefined;
