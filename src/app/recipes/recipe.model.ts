import { Ingredient } from "./ingredient.model";

export class Recipe {
  public title: string;
  public description: string;
  // public image: string;
  public ingredients: Ingredient[];
  public isVegan: boolean;

  constructor(t: string, d: string, ing: Ingredient[], v: boolean) {
    this.title = t;
    this.description = d;
    this.ingredients = ing;
    this.isVegan = v;
  }
}
