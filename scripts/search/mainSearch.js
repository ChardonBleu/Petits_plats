import { displayAndManageIndexPage } from "../pages/recipes.js";
import { validateSearchInput } from "../pages/mainSearch.js";

/** Search user input in recipe name
 * @param recipe {object} - Recipe instance
 * @param searchString {string} - user input
 * @return boolean - return true if user input is in recipe name
 */
function stringInName(recipe, searchString) {
  const recipeName = recipe.name.toLowerCase();
  if (recipeName.indexOf(searchString) !== -1) {
    return true;
  }
  return false;
}

/** Search user input in recipe ingredients
 * @param recipe {object} - Recipe instance
 * @param searchString {string} - user input
 * @return boolean - return true if user input is in recipe ingredients
 */
function stringInIngredients(recipe, searchString) {
  for (const ingredient of recipe.ingredientsList) {
    if (ingredient === searchString) {
      return true;
    }
  }
  return false;
}

/** Search user input in recipe description
 * @param recipe {object} - Recipe instance
 * @param searchString {string} - user input
 * @return boolean - return true if user input is in recipe description
 */
function stringInDescription(recipe, searchString) {
  if (recipe.description.toLowerCase().indexOf(searchString) !== -1) {
    return true;
  }
  return false;
}

/** When user makes tag search while man search has non empty input
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

function displayInfoSearch(searchString) {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = `
    Auncune recette ne contient ${searchString}. Vous pouvez chercher «Tarte aux pommes», «poisson», etc
  `;
}

export function maskInfoSearch() {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = "";
}

/** Search user input in recipe name or ingredients or description
 * and update app.recipes and display new datas
 * @param app {object} - App curent instance
 * @param searchString {string} - user input
 * @return indefined
 */
export function searchRecipes(app, searchString) {
  searchString = searchString.toLowerCase();
  const selectedRecipes = [];
  for (const recipe of app.recipes) {
    if (stringInName(recipe, searchString)) {
      selectedRecipes.push(recipe);
    } else if (stringInIngredients(recipe, searchString)) {
      selectedRecipes.push(recipe);
    } else if (stringInDescription(recipe, searchString)) {
      selectedRecipes.push(recipe);
    }
  }
  if (selectedRecipes.length > 0) {
    maskInfoSearch();
    app.recipes = selectedRecipes;
    displayAndManageIndexPage(app);
  } else {
    displayInfoSearch(searchString);
  }
}
