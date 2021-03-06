"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var RecipesService = /** @class */ (function () {
    function RecipesService(http, router) {
        this.http = http;
        this.router = router;
        //recipesChanged = new Subject<Recipe[]>();
        this.recipesUpdated = new rxjs_1.Subject();
        this.recipes = [];
    }
    RecipesService.prototype.getRecipe = function (id) {
        return this.http.get("http://localhost:3000/api/recipes/" + id);
    };
    RecipesService.prototype.getRecipes = function () {
        var _this = this;
        this.http
            .get("http://localhost:3000/api/recipes")
            .pipe(operators_1.map(function (recipeData) {
            //console.log("recipesData: ");
            // console.log(recipeData.cipes);
            return {
                recipes: recipeData.recipes.map(function (recipe) {
                    return {
                        id: recipe._id,
                        title: recipe.title,
                        description: recipe.description,
                        isVegan: recipe.isVegan,
                        imagePath: recipe.imagePath,
                        creatorData: recipe.creatorData
                    };
                })
            };
        }))
            .subscribe(function (modifiedRecipeData) {
            // console.log("modfiedData:   ");
            // console.log(modifiedRecipeData);
            _this.recipes = modifiedRecipeData.recipes;
            _this.recipesUpdated.next({ recipes: __spreadArrays(_this.recipes) });
        });
    };
    RecipesService.prototype.getRecipeUpdateListener = function () {
        return this.recipesUpdated.asObservable();
    };
    RecipesService.prototype.add = function (title, description, isVegan, image) {
        var _this = this;
        var recipeData = new FormData();
        recipeData.append("title", title);
        recipeData.append("description", description);
        recipeData.append("isVegan", JSON.stringify(isVegan));
        recipeData.append("image", image);
        this.http
            .post("http://localhost:3000/api/recipes", recipeData)
            .subscribe(function (responseData) {
            console.log(responseData);
            _this.router.navigate(["/"]);
        });
    };
    RecipesService.prototype.updateRecipe = function (id, title, description, isVegan, image) {
        var _this = this;
        //console.log(isVegan);
        var recipeData;
        if (typeof image === "object") {
            recipeData = new FormData();
            recipeData.append("id", id);
            recipeData.append("title", title);
            recipeData.append("description", description);
            recipeData.append("isVegan", JSON.stringify(isVegan));
            recipeData.append("image", image);
        }
        else {
            recipeData = {
                id: id,
                title: title,
                description: description,
                imagePath: image,
                isVegan: isVegan,
                creatorData: null
            };
        }
        // console.log(recipeData);
        return this.http
            .put("http://localhost:3000/api/recipes/" + id, recipeData)
            .subscribe(function (response) {
            _this.router.navigate(["/"]);
        });
    };
    RecipesService.prototype.deleteRecipe = function (recipeId) {
        console.log("trying to delete: " + recipeId);
        // this.router.navigate(["/"]);
        return this.http["delete"]("http://localhost:3000/api/recipes/" + recipeId);
    };
    RecipesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], RecipesService);
    return RecipesService;
}());
exports.RecipesService = RecipesService;
