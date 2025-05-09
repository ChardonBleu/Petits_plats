import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";
import {
  getTagsListsFromRecipes,
  updateListTagsFromRecipes,
  filterRecipesWithTags,
} from "../search/tags.js";
import { searchRecipes } from "../search/recipeSearch.js";
import { sanitize } from "../utils/functions.js";

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
  getTagsListsFromRecipes(app);
  updateListTagsFromRecipes(app);
  displayRecipes(app.recipes);
}

/** manage input validity before search
 * @param inputSearch {DOM node}  input node with input user for principal search
 * @return Array(boolean, string)  boolean for validation and string for sanitized input
 *  */
export function validateSearchInput(inputSearch) {
  const searchError = document.getElementById("searchError");
  if (inputSearch.checkValidity()) {
    searchError.classList.add("hidden");
    searchError.classList.remove("flex");
    return [true, sanitize(inputSearch.value)];
  } else {
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
  clearSearchBtn.addEventListener("click", () => {
    inputSearch.value = "";
    app.fetchDatas();
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
