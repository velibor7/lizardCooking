import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";

const routes: Routes = [{ path: "", component: MyRecipesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
