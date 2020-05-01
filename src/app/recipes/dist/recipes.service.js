"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var RecipesService = /** @class */ (function () {
    function RecipesService() {
        this.recipesChanged = new rxjs_1.Subject();
        this.recipes = [];
    }
    RecipesService.prototype.getRecipe = function (i) {
        return this.recipes[i];
    };
    RecipesService.prototype.getRecipes = function () {
        return this.recipes.slice();
    };
    RecipesService.prototype.add = function (recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipesService.prototype.update = function (i, newR) { };
    RecipesService.prototype["delete"] = function (i) { };
    RecipesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], RecipesService);
    return RecipesService;
}());
exports.RecipesService = RecipesService;