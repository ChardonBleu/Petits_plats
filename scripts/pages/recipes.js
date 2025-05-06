import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";
import { getTagsListsFromRecipes, displayTagsCard, manageTags } from "../search/tags.js";
import { searchRecipes } from "../search/recipeSearch.js";
import { sanitize } from "../utils/functions.js";

export function displayRecipes(recipes) {
  const section = document.getElementById("recipes");
  section.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeArticle = recipeCardTemplate(recipe);
    section.appendChild(recipeArticle);
  });
  updateRecipeCounter(recipes);
}

export function displayIndexPage(
  recipes,
  ingredientTags,
  appliancesTags,
  ustensilsTags,
) {
  getTagsListsFromRecipes(recipes);
  displayTagsCard(ingredientTags, ingredients);
  displayTagsCard(appliancesTags, appliances);
  displayTagsCard(ustensilsTags, ustensils);
  displayRecipes(recipes);
  manageTags(ingredients);
  manageTags(appliances);
  manageTags(ustensils);
}

export function manageRecipes(recipes, ingredients, appliances, ustensils) {
    const searchBtn = document.getElementById("principalSearchBtn")
    searchBtn.addEventListener("click", () => {
      const inputSearch = document.getElementById("prinicpalSearchInput");
      const searchError = document.getElementById("searchError")
      if (inputSearch.checkValidity()) {
        searchError.classList.add("hidden")
        searchError.classList.remove("flex")
        const searchString = sanitize(inputSearch.value);
        [recipes, ingredients, appliances, ustensils] =
          searchRecipes(
            recipes,
            ingredients,
            appliances,
            ustensils,
            searchString
          );
      } else {
        searchError.classList.remove("hidden")
        searchError.classList.add("flex")
      }

    });
    return [recipes, ingredients, appliances, ustensils]
}

