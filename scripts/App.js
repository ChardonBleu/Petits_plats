import {
  manageIngredientsTags,
  displayIngredientsTagsCard,
} from "./search/ingredientTags.js";
import { recipes } from "./data/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { capitalizeSentence } from "./utils/general.js"

class App {
  constructor() {
    this.recipes = [];
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
  }

  InitializeApp() {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) =>
        this.ingredients.push(capitalizeSentence(ingredient.ingredient.toLowerCase())));
      this.appliances.push(capitalizeSentence(recipe.appliance.toLowerCase())) ; 
      recipe.ustensils.forEach((ustensil) =>
        this.ustensils.push(capitalizeSentence(ustensil.toLowerCase()))          
      );  
    });
    this.ingredients = [...new Set(this.ingredients)].sort((a, b) => a.localeCompare(b))
    this.appliances = [...new Set(this.appliances)].sort((a, b) => a.localeCompare(b))
    this.ustensils = [...new Set(this.ustensils)].sort((a, b) => a.localeCompare(b))
  }

  async main() {
    this.InitializeApp();
    displayIngredientsTagsCard(this.ingredients, "Ingredients");
    displayIngredientsTagsCard(this.appliances, "Appliances")
    displayIngredientsTagsCard(this.ustensils, "Ustensils");
    manageIngredientsTags("Ingredients");    ;
    manageIngredientsTags("Appliances");    
    manageIngredientsTags("Ustensils");
  }
}

const app = new App();
app.main();
