import { recipes } from "./data/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { displayAndManageIndexPage, managePrincipalSearch } from "./pages/recipes.js";

class App {
  constructor() {
    this.recipes = []; // Array or Recipe
    this.ingredients = []; // Array or strings
    this.appliances = []; // Array or strings
    this.ustensils = []; // Array or strings
    this.ingredientsSelectedTags = []; // Array or strings
    this.appliancesSelectedTags = []; // Array or strings
    this.ustensilsSelectedTags = []; // Array or strings
  }

  fetchDatas() {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
  }

  async main() {
    this.fetchDatas();
    displayAndManageIndexPage(this);
    managePrincipalSearch(this);
  }
}

const app = new App();
app.main();
