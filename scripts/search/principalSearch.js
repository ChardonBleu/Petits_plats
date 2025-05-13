import { displayAndManageIndexPage } from "../pages/recipes.js";
import { validateSearchInput } from "../pages/principalSearch.js";

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

/** Display info when no recipe has been found
 * @param searchString {string} - user search input
 * @return undefined
 */
function displayInfoSearch(searchString) {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = `
    Auncune recette ne contient ${searchString}. Vous pouvez chercher «Tarte aux pommes», «poisson», etc
  `;
}

/** Mask info when recipes has been found or user makes new search
 * @return undefined
 */
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
  let recipesWithSearchInName = app.recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchString),
  );
  let recipesWithSearchInIngredients = app.recipes.filter(
    (recipe) =>
      recipe.ingredientsList
        .map((ingredient) => ingredient.includes(searchString))
        .reduce((acc, val) => acc || val) &&
      !recipesWithSearchInName.includes(recipe),
  );
  let recipesWithSearchInDescription = app.recipes.filter(
    (recipe) =>
      recipe.description.toLowerCase().includes(searchString) &&
      !recipesWithSearchInIngredients.includes(recipe) &&
      !recipesWithSearchInName.includes(recipe),
  );

  app.recipes = recipesWithSearchInName
    .concat(recipesWithSearchInIngredients)
    .concat(recipesWithSearchInDescription);

  if (app.recipes.length > 0) {
    maskInfoSearch();
    displayAndManageIndexPage(app);
  } else {
    displayInfoSearch(searchString);
  }
}
