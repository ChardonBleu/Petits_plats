/** Création des cards de recette
 */

import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";

/** display active recipes
 * @param recipes {object}  app.recipes from current app instance
 * @return undefined
 */
export function displayRecipes(recipes) {
  const section = document.getElementById("recipes");
  section.innerHTML = "";
  recipes = recipes.map((recipe) => {
    const recipeArticle = recipeCardTemplate(recipe);
    section.appendChild(recipeArticle);
  });
  updateRecipeCounter(recipes);
}
