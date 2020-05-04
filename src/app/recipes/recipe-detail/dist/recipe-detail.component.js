"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var RecipeDetailComponent = /** @class */ (function () {
    function RecipeDetailComponent(authService, recipeService, route, router) {
        this.authService = authService;
        this.recipeService = recipeService;
        this.route = route;
        this.router = router;
    }
    RecipeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.recipeService.getRecipe(_this.id).subscribe(function (recipeData) {
                _this.recipe = {
                    id: recipeData._id,
                    title: recipeData.title,
                    description: recipeData.description,
                    isVegan: recipeData.isVegan,
                    imagePath: recipeData.imagePath,
                    creatorData: recipeData.creatorData
                };
            });
        });
    };
    RecipeDetailComponent.prototype.onEdit = function () {
        // this.router.navigate(["edit"], { relativeTo: this.route });
    };
    RecipeDetailComponent.prototype.onDelete = function (recipeId) {
        var _this = this;
        console.log(recipeId);
        this.recipeService.deleteRecipe(recipeId).subscribe(function () {
            _this.recipeService.getRecipes();
        });
    };
    RecipeDetailComponent = __decorate([
        core_1.Component({
            selector: "app-recipe-detail",
            templateUrl: "./recipe-detail.component.html",
            styleUrls: ["./recipe-detail.component.scss"]
        })
    ], RecipeDetailComponent);
    return RecipeDetailComponent;
}());
exports.RecipeDetailComponent = RecipeDetailComponent;
