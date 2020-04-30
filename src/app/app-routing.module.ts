import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { CreateRecipeComponent } from "./recipes/create-recipe/create-recipe.component";

const routes: Routes = [
  { path: "", component: MyRecipesComponent },
  { path: "submitrecipe", component: CreateRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
