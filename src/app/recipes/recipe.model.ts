import { Ingredient } from "./ingredient.model";

export class Recipe {
  id: string;
  title: string;
  description: string;
  // image: string;
  // ingredients: Ingredient[];
  isVegan: boolean;
  // creatorData: any;

  constructor(t: string, d: string, v: boolean) {
    this.title = t;
    this.description = d;
    // this.ingredients = ing;
    this.isVegan = v;
  }
}
