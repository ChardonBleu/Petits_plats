import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";
import {
  getTagsListsFromRecipes,
  displayTagsCard,
  manageTags,
} from "../search/tags.js";
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

export function displayIndexPage(app) {
  getTagsListsFromRecipes(app.recipes);
  displayTagsCard(app.ingredients, ingredients);
  displayTagsCard(app.appliances, appliances);
  displayTagsCard(app.ustensils, ustensils);
  displayRecipes(app.recipes);
  manageTags(ingredients);
  manageTags(appliances);
  manageTags(ustensils);
}

export function eventOnPrincipalSearch(inputSearch, app) {
  const searchError = document.getElementById("searchError");
  if (inputSearch.checkValidity()) {
    searchError.classList.add("hidden");
    searchError.classList.remove("flex");
    const searchString = sanitize(inputSearch.value);
    [app.recipes, app.ingredients, app.appliances, app.ustensils] = searchRecipes(
      app,
      searchString,
    );
  } else {
    searchError.classList.remove("hidden");
    searchError.classList.add("flex");
  }
  // return [app.recipes, app.ingredients, app.appliances, app.ustensils];
}

export function managePrincipalSearch(app) {
  const searchBtn = document.getElementById("principalSearchBtn");
  const inputSearch = document.getElementById("prinicpalSearchInput");
  const clearSearchBtn = document.getElementById("clearPrincipalSearchBtn")
  searchBtn.addEventListener("click", () => {
    eventOnPrincipalSearch(inputSearch, app)

  });
  inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      eventOnPrincipalSearch(inputSearch, app)
    }
  });
  clearSearchBtn.addEventListener("click", (event) => {
    event.preventDefault()
    inputSearch.value = ""
    app.fetchDatas()
  });
  return [app.recipes, app.ingredients, app.appliances, app.ustensils];

}
