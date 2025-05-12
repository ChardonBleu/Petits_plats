import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";
import { filterRecipesWithTags, manageTagsSearch } from "../search/tags.js";
import { getTagsListsFromRecipes, displayTagsCard, manageTags } from "../pages/tags.js";
import { searchRecipes } from "../search/recipeSearch.js";
import { sanitize } from "../utils/functions.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";

/** display active recipes
 * @param recipes {object}  app.recipes from current app instance
 * @return undefined
 */
export function displayRecipes(recipes) {
  const section = document.getElementById("recipes");
  section.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeArticle = recipeCardTemplate(recipe);
    section.appendChild(recipeArticle);
  });
  updateRecipeCounter(recipes);
}

/** display page with new active datas: recipes and tag lists
 * @param app {object} - app instance from App class
 * @return undefined
 */
export function displayAndManageIndexPage(app) {
  getTagsListsFromRecipes(app)
  displayTagsCard(app.ingredients, ingredients);
  displayTagsCard(app.appliances, appliances);
  displayTagsCard(app.ustensils, ustensils);
  manageTags(ingredients.en);
  manageTags(appliances.en);
  manageTags(ustensils.en);
  manageTagsSearch(app, ingredients.en);
  manageTagsSearch(app, appliances.en);
  manageTagsSearch(app, ustensils.en);
  displayRecipes(app.recipes);
}

/** manage input validity before search
 * @param inputSearch {DOM node}  input node with input user for principal search
 * @return Array(boolean, string)  boolean for validation and string for sanitized input
 *  */
export function validateSearchInput(inputSearch) {
  const searchError = document.getElementById("searchAlert");
  if (inputSearch.checkValidity()) {
    searchError.innerHTML = ``
    searchError.classList.add("hidden");
    searchError.classList.remove("flex");
    return [true, sanitize(inputSearch.value)];
  } else {
    searchError.innerHTML = `Veuillez entrer au moins 3 caractères dans le champ de recherche.`
    searchError.classList.remove("hidden");
    searchError.classList.add("flex");
    return [true, ""];
  }
}

/** eventListeners for principal search
 * @param app {object} - app instance from App class
 * @return undefined
 */
export function managePrincipalSearch(app) {
  const searchBtn = document.getElementById("principalSearchBtn");
  const inputSearch = document.getElementById("prinicpalSearchInput");
  const clearSearchBtn = document.getElementById("clearPrincipalSearchBtn");
  searchBtn.addEventListener("click", () => {
    const [valid, searchString] = validateSearchInput(inputSearch);
    if (valid) {
      searchRecipes(app, searchString);
    }
  });
  inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const [valid, searchString] = validateSearchInput(inputSearch);
      if (valid) {
        searchRecipes(app, searchString);
      }
    }
  });
  clearSearchBtn.addEventListener("click", async () => {
    inputSearch.value = "";
    maskInfoSearch()
    app.recipes = await app.fetchDatas();
    filterRecipesWithTags(app);
    displayAndManageIndexPage(app);
  });
}

/** When user makes tag search while principal search has non empty input
 * @param app {object} - app instance from App class
 * @return undefined
 */
export function controlForActivePrincipalSearch(app) {
  const inputSearch = document.getElementById("prinicpalSearchInput");
  if (inputSearch.value) {
    const [valid, searchString] = validateSearchInput(inputSearch);
    if (valid) {
      searchRecipes(app, searchString);
    }
  }
}

export function displayInfoSearch(searchString) {
  const searchAlert = document.getElementById("searchAlert")
  searchAlert.classList.remove("hidden")
  searchAlert.innerHTML = `
    Auncune recette ne contient ${searchString}. Vous pouvez chercher «Tarte aux pommes», «poisson», etc
  `
}

export function maskInfoSearch() {
  const searchAlert = document.getElementById("searchAlert")
  searchAlert.classList.add("hidden")
  searchAlert.innerHTML = ""
}
