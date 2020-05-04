import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { Subscription } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-create-recipe",
  templateUrl: "./create-recipe.component.html",
  styleUrls: ["./create-recipe.component.scss"],
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  recipe: Recipe;
  imagePreview: string;
  private mode = "create";
  private recipeId: string;
  // recipeSub: Subscription;

  constructor(
    private recipeService: RecipesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      isvegan: new FormControl(false),
      image: new FormControl(null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        console.log("it has edit!!");
        this.mode = "edit";
        this.recipeId = paramMap.get("id");
        this.recipeService.getRecipe(this.recipeId).subscribe((recipeData) => {
          //console.log("recipe data: ");
          //console.log(recipeData);
          this.recipe = {
            id: recipeData._id,
            title: recipeData.title,
            description: recipeData.description,
            isVegan: recipeData.isVegan,
            imagePath: recipeData.imagePath,
            creatorData: recipeData.creatorData,
          };
          this.form.setValue({
            title: this.recipe.title,
            description: this.recipe.description,
            isvegan: this.recipe.isVegan,
            image: this.recipe.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.recipeId = null;
      }
    });
  }

  onSaveRecipe() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
      console.log("mode: create");
      console.log(this.form.value.image);
      this.recipeService.add(
        this.form.value.title,
        this.form.value.description,
        this.form.value.isvegan,
        this.form.value.image
      );
    } else {
      console.log("mode: edit");
      //console.log("form value: ");
      //console.log(this.form.value);
      this.recipeService.updateRecipe(
        this.recipeId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.isVegan,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    // this.recipeSub.unsubscribe();
  }
}
