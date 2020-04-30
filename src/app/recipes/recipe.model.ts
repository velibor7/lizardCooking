import { Ingredient } from "./ingredient.model";

export class Recipe {
  public title: string;
  public description: string;
  // public image: string;
  public ingredients: Ingredient[];

  constructor(t: string, d: string, ing: Ingredient[]) {
    this.title = t;
    this.description = d;
    this.ingredients = ing;
  }
}
