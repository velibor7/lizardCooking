import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;
  constructor(
    public authService: AuthService,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.recipeService.getRecipe(this.id).subscribe((recipeData) => {
        this.recipe = {
          id: recipeData._id,
          title: recipeData.title,
          description: recipeData.description,
          isVegan: recipeData.isVegan,
          imagePath: recipeData.imagePath,
          creatorData: recipeData.creatorData,
        };
      });
    });
  }

  onEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDelete(recipeId: string) {
    console.log(recipeId);
    this.recipeService.deleteRecipe(recipeId).subscribe(() => {
      this.recipeService.getRecipes();
    });
  }
}
