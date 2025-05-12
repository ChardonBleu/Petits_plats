import { filterRecipesWithTags } from "../search/tagsFilters.js";
import { searchRecipes, maskInfoSearch } from "../search/principalSearch.js";
import { sanitize } from "../utils/functions.js";
import { displayAndManageIndexPage } from "./recipes.js";

/** manage input validity before search
 * @param inputSearch {DOM node}  input node with input user for principal search
 * @return Array(boolean, string)  boolean for validation and string for sanitized input
 *  */
export function validateSearchInput(inputSearch) {
  const searchError = document.getElementById("searchAlert");
  if (inputSearch.checkValidity()) {
    searchError.innerHTML = ``;
    searchError.classList.add("hidden");
    searchError.classList.remove("flex");
    return [true, sanitize(inputSearch.value)];
  } else {
    searchError.innerHTML = `Veuillez entrer au moins 3 caractères dans le champ de recherche.`;
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
    maskInfoSearch();
    app.recipes = await app.fetchDatas();
    filterRecipesWithTags(app);
    displayAndManageIndexPage(app);
  });
}
