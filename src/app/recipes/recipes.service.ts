import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  //recipesChanged = new Subject<Recipe[]>();
  recipesUpdated = new Subject<{ recipes: Recipe[] }>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getRecipe(i: number) {
    return this.recipes[i];
  }

  getRecipes() {
    this.http
      .get<{ message: string; recipes: any }>(
        "http://localhost:3000/api/recipes"
      )
      .pipe(
        map((recipeData) => {
          //console.log("recipesData: ");
          // console.log(recipeData.cipes);
          return {
            recipes: recipeData.recipes.map((recipe) => {
              return {
                id: recipe._id,
                title: recipe.title,
                description: recipe.description,
                isVegan: recipe.isVegan,
              };
            }),
          };
        })
      )
      .subscribe((modifiedRecipeData) => {
        // console.log("modfiedData:   ");
        // console.log(modifiedRecipeData);
        this.recipes = modifiedRecipeData.recipes;
        this.recipesUpdated.next({ recipes: [...this.recipes] });
      });
  }

  getRecipeUpdateListener() {
    return this.recipesUpdated.asObservable();
  }

  add(title: string, description: string, isVegan: boolean) {
    //  const recipeData = new FormData();
    // recipeData.append("title", title);
    // recipeData.append("description", description);
    // recipeData.append("isVegan", JSON.stringify(isVegan));

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
