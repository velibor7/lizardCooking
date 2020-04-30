import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MyRecipesComponent,
    RecipesComponent,
    CreateRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
