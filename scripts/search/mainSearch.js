/** Search user input in recipe name
 * @param recipe {object} - Recipe instance
 * @param searchString {string} - user input
 * @return boolean - return true if user input is in recipe name
 */
export function stringInName(recipe, searchString) {
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
export function stringInIngredients(recipe, searchString) {
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
export function stringInDescription(recipe, searchString) {
  if (recipe.description.toLowerCase().indexOf(searchString) !== -1) {
    return true;
  }
  return false;
}

export function displayInfoSearch(searchString) {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = `
    Auncune recette ne contient ${searchString}. Vous pouvez chercher «Tarte aux pommes», «poisson», etc
  `;
}

export function maskInfoSearch() {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = "";
}
