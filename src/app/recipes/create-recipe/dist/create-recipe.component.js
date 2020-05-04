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
    function CreateRecipeComponent(recipeService, route) {
        this.recipeService = recipeService;
        this.route = route;
        this.mode = "create";
    }
    CreateRecipeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new forms_1.FormGroup({
            title: new forms_1.FormControl(null),
            description: new forms_1.FormControl(null),
            isvegan: new forms_1.FormControl(false),
            image: new forms_1.FormControl(null)
        });
        this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has("id")) {
                console.log("it has edit!!");
                _this.mode = "edit";
                _this.recipeId = paramMap.get("id");
                _this.recipeService.getRecipe(_this.recipeId).subscribe(function (recipeData) {
                    //console.log("recipe data: ");
                    //console.log(recipeData);
                    _this.recipe = {
                        id: recipeData._id,
                        title: recipeData.title,
                        description: recipeData.description,
                        isVegan: recipeData.isVegan,
                        imagePath: recipeData.imagePath,
                        creatorData: recipeData.creatorData
                    };
                    _this.form.setValue({
                        title: _this.recipe.title,
                        description: _this.recipe.description,
                        isvegan: _this.recipe.isVegan,
                        image: _this.recipe.imagePath
                    });
                });
            }
            else {
                _this.mode = "create";
                _this.recipeId = null;
            }
        });
    };
    CreateRecipeComponent.prototype.onSaveRecipe = function () {
        if (this.form.invalid) {
            return;
        }
        if (this.mode === "create") {
            console.log("mode: create");
            console.log(this.form.value.image);
            this.recipeService.add(this.form.value.title, this.form.value.description, this.form.value.isvegan, this.form.value.image);
        }
        else {
            console.log("mode: edit");
            //console.log("form value: ");
            //console.log(this.form.value);
            this.recipeService.updateRecipe(this.recipeId, this.form.value.title, this.form.value.description, this.form.value.isVegan, this.form.value.image);
        }
        this.form.reset();
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
