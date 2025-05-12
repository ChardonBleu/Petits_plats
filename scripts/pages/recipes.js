import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";
import { getTagsListsFromRecipes, displayTagsCard, manageTags } from "../pages/tags.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";
import { manageTagsSearch } from "../search/tagsFilters.js";

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
