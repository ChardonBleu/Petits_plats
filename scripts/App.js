import { recipes } from "./data/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { displayIndexPage, managePrincipalSearch } from "./pages/recipes.js";
import {manageTagsSearch} from "./search/tags.js"
import { ingredients, appliances, ustensils } from "./utils/constants.js";

class App {
  constructor() {
    this.recipes = []; // Array or Recipe
    this.ingredients = []; // Array or strings
    this.appliances = []; // Array or strings
    this.ustensils = []; // Array or strings
    this.selectedTags = []; // Array or strings
  }

  fetchDatas() {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
  }
  
  async main() {
    this.fetchDatas();
    displayIndexPage(this)
    manageTagsSearch(this, ingredients);
    manageTagsSearch(this, appliances);
    manageTagsSearch(this, ustensils);
    managePrincipalSearch(this);
  }
}

const app = new App();
app.main();
