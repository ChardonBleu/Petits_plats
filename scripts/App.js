import { Recipe } from "./models/Recipe.js";
import { displayAndManageIndexPage, managePrincipalSearch } from "./pages/recipes.js";
import { dataUrl } from "./utils/constants.js";
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

  async fetchDatas() {
    const response = await fetch(dataUrl)
    if (response.ok) {
      const recipes = await response.json();
      return recipes.map((recipe) => new Recipe(recipe));
    } else {
      throw new Error("Erreur de chargement des données")
    }
  }

  async main() {
    this.recipes = await this.fetchDatas();
    displayAndManageIndexPage(this);
    managePrincipalSearch(this);
  }
}

const app = new App();
app.main();
