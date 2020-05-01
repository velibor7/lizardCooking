import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { Subscription } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-create-recipe",
  templateUrl: "./create-recipe.component.html",
  styleUrls: ["./create-recipe.component.scss"],
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imagePreview: string;
  // recipeSub: Subscription;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      isvegan: new FormControl(false),
      image: new FormControl(null),
    });
  }

  onSaveRecipe() {
    console.log(this.form.value.image);
    this.recipeService.add(
      this.form.value.title,
      this.form.value.description,
      this.form.value.isvegan,
      this.form.value.image
    );
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
