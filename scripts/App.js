import { getTagsListsFromRecipes } from "./search/tags.js";
import { recipes } from "./data/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { displayIndexPage, managePrincipalSearch } from "./pages/recipes.js";

class App {
  constructor() {
    this.recipes = []; // Array or Recipe
    this.ingredients = []; // Array or strings
    this.appliances = []; // Array or strings
    this.ustensils = []; // Array or strings
  }

  fetchDatas() {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
    [this.ingredients, this.appliances, this.ustensils] =
      getTagsListsFromRecipes(this.recipes);
    displayIndexPage(this);
  }

  async main() {
    this.fetchDatas();

    [this.recipes, this.ingredients, this.appliances, this.ustensils] =
      managePrincipalSearch(this);
  }
}

const app = new App();
app.main();
