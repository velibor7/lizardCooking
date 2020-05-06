import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { CreateRecipeComponent } from "./recipes/create-recipe/create-recipe.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "recipes/:id", component: RecipeDetailComponent },
  {
    path: "submitrecipe",
    component: CreateRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "recipes/:id/edit",
    component: CreateRecipeComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
