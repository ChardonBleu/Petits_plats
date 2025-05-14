import { filterRecipesWithTags } from "../search/tagsFilters.js";
import { searchRecipes, maskInfoSearch } from "../search/principalSearch.js";
import { sanitize } from "../utils/functions.js";
import { displayAndManageIndexPage } from "./recipes.js";

/** manage input validity before search
 * @param inputSearch {DOM node}  input node with input user for principal search
 * @return Array(boolean, string)  boolean for validation and string for sanitized input
 *  */
export function validateSearchInput() {
  const inputSearch = document.getElementById("prinicpalSearchInput");
  const searchError = document.getElementById("searchAlert");
  if (inputSearch.checkValidity()) {
    searchError.innerHTML = ``;
    return [true, sanitize(inputSearch.value)];
  } else {
    searchError.innerHTML = `Veuillez entrer au moins 3 caractères dans le champ de recherche.`;
    return [false, ""];
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
    const [valid, searchString] = validateSearchInput();
    if (valid) {
      searchRecipes(app, searchString);
    }
  });
  inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const [valid, searchString] = validateSearchInput();
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
