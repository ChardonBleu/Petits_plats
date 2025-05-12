import { displayAndManageIndexPage, displayInfoSearch, maskInfoSearch } from "../pages/recipes.js";

function stringInName(recipe, string) {
  const recipeName = recipe.name.toLowerCase()
  if (recipeName.indexOf(string) !== -1) {
    return true
  }
  return false
}

function stringInIngredients(recipe, string) {
  for (const ingredient of recipe.ingredientsList) {
    if (ingredient === string) {
      return true
    }
  }  
  return false
};

function stringInDescription(recipe, string) {
  if (recipe.description.toLowerCase().indexOf(string) !== -1) {
      return true
    }
  return false
}


export function searchRecipes(app, searchString) {
  searchString = searchString.toLowerCase()
  const selectedRecipes = []
  

  for (const recipe of app.recipes) {
    if (stringInName(recipe, searchString)) { 
      selectedRecipes.push(recipe)
    } else if (stringInIngredients(recipe, searchString)) {
      selectedRecipes.push(recipe)
    } else if (stringInDescription(recipe, searchString)) {
      selectedRecipes.push(recipe)
    }
  }
  if (selectedRecipes.length > 0) {
    maskInfoSearch()
    app.recipes = selectedRecipes
    displayAndManageIndexPage(app);
  } else {
    displayInfoSearch(searchString)
  }
  
}
