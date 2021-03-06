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

  getRecipe(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      isVegan: boolean;
      imagePath: string;
      creatorData: Object;
    }>("http://localhost:3000/api/recipes/" + id);
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
                imagePath: recipe.imagePath,
                creatorData: recipe.creatorData,
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

  add(title: string, description: string, isVegan: boolean, image: File) {
    const recipeData = new FormData();
    recipeData.append("title", title);
    recipeData.append("description", description);
    recipeData.append("isVegan", JSON.stringify(isVegan));
    recipeData.append("image", image);

    this.http
      .post<{ message: string; recipe: Recipe }>(
        "http://localhost:3000/api/recipes",
        recipeData
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(["/"]);
      });
  }

  updateRecipe(
    id: string,
    title: string,
    description: string,
    isVegan: boolean,
    image: File | string
  ) {
    //console.log(isVegan);
    let recipeData: Recipe | FormData;
    if (typeof image === "object") {
      recipeData = new FormData();
      recipeData.append("id", id);
      recipeData.append("title", title);
      recipeData.append("description", description);
      recipeData.append("isVegan", JSON.stringify(isVegan));
      recipeData.append("image", image);
    } else {
      recipeData = {
        id: id,
        title: title,
        description: description,
        imagePath: image,
        isVegan: isVegan,
        creatorData: null,
      };
    }

    // console.log(recipeData);
    return this.http
      .put("http://localhost:3000/api/recipes/" + id, recipeData)
      .subscribe((response) => {
        this.router.navigate(["/"]);
      });
  }

  deleteRecipe(recipeId: string) {
    console.log("trying to delete: " + recipeId);
    // this.router.navigate(["/"]);
    return this.http
      .delete("http://localhost:3000/api/recipes/" + recipeId)
      .subscribe(() => {
        this.router.navigate(["/"]);
      });
  }
}
