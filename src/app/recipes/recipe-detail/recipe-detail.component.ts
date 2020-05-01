import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;
  constructor(
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
        };
      });
    });
  }

  onEdit() {
    // this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDelete() {
    //this.recipeService.delete(this.id);
    //this.router.navigate(["/"]);
  }
}
