"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var my_recipes_component_1 = require("./my-recipes/my-recipes.component");
var recipes_component_1 = require("./recipes/recipes.component");
var create_recipe_component_1 = require("./recipes/create-recipe/create-recipe.component");
var recipe_list_component_1 = require("./recipes/recipe-list/recipe-list.component");
var recipe_item_component_1 = require("./recipes/recipe-list/recipe-item/recipe-item.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                my_recipes_component_1.MyRecipesComponent,
                recipes_component_1.RecipesComponent,
                create_recipe_component_1.CreateRecipeComponent,
                recipe_list_component_1.RecipeListComponent,
                recipe_item_component_1.RecipeItemComponent,
            ],
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
