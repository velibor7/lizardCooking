import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getRecipe(i: number) {
    return this.recipes[i];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  add(title: string, description: string, isVegan: boolean) {
    //  const recipeData = new FormData();

    // recipeData.append("title", title);
    //recipeData.append("description", description);
    //recipeData.append("isVegan", JSON.stringify(isVegan));

    // console.log(recipeData);

    this.http
      .post<{ message: string; recipe: Recipe }>(
        "http://localhost:3000/api/recipes",
        {
          title: title,
          description: description,
          isVegan: JSON.stringify(isVegan),
        }
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(["/"]);
      });
  }

  update(i: number, newR: Recipe) {}

  delete(i: number) {}
}
