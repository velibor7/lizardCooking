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
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var my_recipes_component_1 = require("./my-recipes/my-recipes.component");
var recipes_component_1 = require("./recipes/recipes.component");
var create_recipe_component_1 = require("./recipes/create-recipe/create-recipe.component");
var recipe_list_component_1 = require("./recipes/recipe-list/recipe-list.component");
var recipe_item_component_1 = require("./recipes/recipe-list/recipe-item/recipe-item.component");
var recipe_detail_component_1 = require("./recipes/recipe-detail/recipe-detail.component");
var login_component_1 = require("./auth/login/login.component");
var signup_component_1 = require("./auth/signup/signup.component");
var auth_interceptor_1 = require("./auth/auth-interceptor");
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
                recipe_detail_component_1.RecipeDetailComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
