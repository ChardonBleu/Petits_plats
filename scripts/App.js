import { Recipe } from "./models/Recipe.js";
import { displayRecipes } from "./pages/recipes.js";
import { validateSearchInput } from "./pages/mainSearch.js";
import { dataUrl } from "./utils/constants.js";
import { displayInfoSearch, maskInfoSearch } from "./search/mainSearch.js";
import { displayTagsCard, manageTags } from "./pages/tags.js";
import { ingredients, appliances, ustensils } from "./utils/constants.js";
import { manageTagsSearch } from "./search/tagsFilters.js";
import { sortAndRemovesDuplicates } from "./utils/functions.js";

/** Fichier d'entrée du javascript, importé dans index.html
 * La classe App sert à modéliser l'application et contient
 * les méthodes et fonctions permettant l'affichage et la
 * gestion de la page index avec les fonctionalités de
 * recherche et de filtre
 */
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

  /** Fetch json datas.
   * dataUrl is in utils/constants
   */
  async fetchDatas() {
    const response = await fetch(dataUrl);
    if (response.ok) {
      const recipes = await response.json();
      return recipes.map((recipe) => new Recipe(recipe));
    } else {
      throw new Error("Erreur de chargement des données");
    }
  }

  /** display page with new active datas: recipes and tag lists
   * @return undefined
   */
  displayAndManageIndexPage() {
    this.getTagsListsFromRecipes();
    displayTagsCard(this.ingredients, ingredients);
    displayTagsCard(this.appliances, appliances);
    displayTagsCard(this.ustensils, ustensils);
    manageTags(ingredients.en);
    manageTags(appliances.en);
    manageTags(ustensils.en);
    manageTagsSearch(this, ingredients.en);
    manageTagsSearch(this, appliances.en);
    manageTagsSearch(this, ustensils.en);
    displayRecipes(this.recipes);
  }

  // **************   tags filters *************************************

  /** Update app attributes: app.ingredients, app.appliances and app.ustensils
   * based on current app.recipes
   * @return undefined
   */
  getTagsListsFromRecipes() {
    this.ingredients = this.recipes
      .map((recipe) => recipe.ingredientsList)
      .flat();
    this.appliances = this.recipes.map((recipe) =>
      recipe.appliance.toLowerCase(),
    );
    this.ustensils = this.recipes.map((recipe) => recipe.ustensils).flat();

    this.ingredients = sortAndRemovesDuplicates(this.ingredients);
    this.appliances = sortAndRemovesDuplicates(this.appliances);
    this.ustensils = sortAndRemovesDuplicates(this.ustensils);
  }

  /** return recipe if ingredients or appliances or ustensils for this recipe are in selected tags.
   * @param app {object} - app instance from App class
   * @return recipe | undefined {object} - recipe instance from Recipe class
   */
  filterRecipesWithTags() {
    const app = this;
    this.recipes = this.recipes.filter(function (recipe) {
      const recipeIsOK =
        app.ustensilsSelectedTags.every((item) =>
          recipe.ustensils.includes(item.toLowerCase()),
        ) &&
        app.ingredientsSelectedTags.every((item) =>
          recipe.ingredientsList.includes(item.toLowerCase()),
        ) &&
        recipe.appliance.includes(app.appliancesSelectedTags);
      return recipeIsOK ? recipe : undefined;
    });
  }

  // ***************** index main search **********************

  /** Search user input in recipe name or ingredients or description
   * and update app.recipes and display new datas
   * @param searchString {string} - user input
   * @return indefined
   */
  searchRecipes(searchString) {
    searchString = searchString.toLowerCase();
    let recipesWithSearchInName = this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchString),
    );
    let recipesWithSearchInIngredients = this.recipes.filter((recipe) =>
      recipe.ingredientsList.some((ingredient) =>
        ingredient.includes(searchString),
      ),
    );
    let recipesWithSearchInDescription = this.recipes.filter((recipe) =>
      recipe.description.toLowerCase().includes(searchString),
    );

    this.recipes = [
      ...new Set(
        recipesWithSearchInName
          .concat(recipesWithSearchInIngredients)
          .concat(recipesWithSearchInDescription),
      ),
    ];

    if (this.recipes.length > 0) {
      maskInfoSearch();
      this.displayAndManageIndexPage();
    } else {
      displayInfoSearch(searchString);
    }
  }

  /** When user makes tag search while man search has non empty input
   * @return undefined
   */
  controlForActivePrincipalSearch() {
    const inputSearch = document.getElementById("prinicpalSearchInput");
    if (inputSearch.value) {
      const [valid, searchString] = validateSearchInput(inputSearch);
      if (valid) {
        this.searchRecipes(searchString);
      }
    }
  }

  /** eventListeners for main search
   * @return undefined
   */
  manageMainSearch() {
    const searchBtn = document.getElementById("principalSearchBtn");
    const inputSearch = document.getElementById("prinicpalSearchInput");
    const clearSearchBtn = document.getElementById("clearPrincipalSearchBtn");
    searchBtn.addEventListener("click", () => {
      const [valid, searchString] = validateSearchInput(inputSearch);
      if (valid) {
        this.searchRecipes(searchString);
      }
    });
    inputSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const [valid, searchString] = validateSearchInput(inputSearch);
        if (valid) {
          this.searchRecipes(searchString);
        }
      }
    });
    clearSearchBtn.addEventListener("click", async () => {
      inputSearch.value = "";
      maskInfoSearch();
      this.recipes = await this.fetchDatas();
      this.filterRecipesWithTags();
      this.displayAndManageIndexPage();
    });
  }

  async main() {
    this.recipes = await this.fetchDatas();
    this.displayAndManageIndexPage();
    this.manageMainSearch();
  }
}

const app = new App();
app.main();
