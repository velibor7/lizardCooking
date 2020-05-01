import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Subscription } from "rxjs";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService
      .getRecipeUpdateListener()
      .subscribe((recipeData: { recipes: Recipe[] }) => {
        this.recipes = recipeData.recipes;
      });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
