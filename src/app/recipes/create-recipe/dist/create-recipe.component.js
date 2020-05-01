"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateRecipeComponent = /** @class */ (function () {
    // recipeSub: Subscription;
    function CreateRecipeComponent(recipeService) {
        this.recipeService = recipeService;
    }
    CreateRecipeComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            title: new forms_1.FormControl(null),
            description: new forms_1.FormControl(null),
            isvegan: new forms_1.FormControl(false),
            image: new forms_1.FormControl(null)
        });
    };
    CreateRecipeComponent.prototype.onSaveRecipe = function () {
        console.log(this.form.value.image);
        this.recipeService.add(this.form.value.title, this.form.value.description, this.form.value.isvegan, this.form.value.image);
    };
    CreateRecipeComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        this.form.patchValue({ image: file });
        this.form.get("image").updateValueAndValidity();
        var reader = new FileReader();
        reader.onload = function () {
            _this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    };
    CreateRecipeComponent.prototype.ngOnDestroy = function () {
        // this.recipeSub.unsubscribe();
    };
    CreateRecipeComponent = __decorate([
        core_1.Component({
            selector: "app-create-recipe",
            templateUrl: "./create-recipe.component.html",
            styleUrls: ["./create-recipe.component.scss"]
        })
    ], CreateRecipeComponent);
    return CreateRecipeComponent;
}());
exports.CreateRecipeComponent = CreateRecipeComponent;
