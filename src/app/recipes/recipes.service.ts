import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor() {}

  getRecipe(i: number) {
    return this.recipes[i];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  add(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  update(i: number, newR: Recipe) {}

  delete(i: number) {}
}
