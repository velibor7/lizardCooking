"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var create_recipe_component_1 = require("./recipes/create-recipe/create-recipe.component");
var recipe_list_component_1 = require("./recipes/recipe-list/recipe-list.component");
var recipe_detail_component_1 = require("./recipes/recipe-detail/recipe-detail.component");
var login_component_1 = require("./auth/login/login.component");
var signup_component_1 = require("./auth/signup/signup.component");
var auth_guard_1 = require("./auth/auth.guard");
var routes = [
    { path: "", component: recipe_list_component_1.RecipeListComponent },
    { path: "recipes/:id", component: recipe_detail_component_1.RecipeDetailComponent },
    {
        path: "submitrecipe",
        component: create_recipe_component_1.CreateRecipeComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "recipes/:id/edit",
        component: create_recipe_component_1.CreateRecipeComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "signup", component: signup_component_1.SignupComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: [auth_guard_1.AuthGuard]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
