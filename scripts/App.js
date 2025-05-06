import {
  manageTags,
  displayTagsCard,
} from "./search/tags.js";
import { recipes } from "./data/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { capitalizeSentence, sortAndRemovesDuplicates } from "./utils/functions.js"
import { ingredients, appliances, ustensils } from "./utils/constants.js"
import { displayRecipes } from "./pages/recipes.js"

class App {
  constructor() {
    this.recipes = [];
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
  }

  fetchDatas() {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) =>
        this.ingredients.push(capitalizeSentence(ingredient.ingredient.toLowerCase())));
      this.appliances.push(capitalizeSentence(recipe.appliance.toLowerCase())) ; 
      recipe.ustensils.forEach((ustensil) =>
        this.ustensils.push(capitalizeSentence(ustensil.toLowerCase()))          
      );  
    });
    this.ingredients = sortAndRemovesDuplicates(this.ingredients)
    this.appliances = sortAndRemovesDuplicates(this.appliances)
    this.ustensils = sortAndRemovesDuplicates(this.ustensils)
  }

  async main() {
    this.fetchDatas();
    displayTagsCard(this.ingredients, ingredients);
    displayTagsCard(this.appliances, appliances)
    displayTagsCard(this.ustensils, ustensils);
    manageTags(ingredients);    ;
    manageTags(appliances);    
    manageTags(ustensils);

    displayRecipes(this.recipes)
  }
}

const app = new App();
app.main();
