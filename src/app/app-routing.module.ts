import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { CreateRecipeComponent } from "./recipes/create-recipe/create-recipe.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "recipes/:id", component: RecipeDetailComponent },
  { path: "submitrecipe", component: CreateRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
