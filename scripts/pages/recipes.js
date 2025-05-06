import { recipeCardTemplate } from "../components/recipeCard.js";
import { updateRecipeCounter } from "./counter.js"

export function displayRecipes(recipes) {
    const section = document.getElementById('recipes')
    recipes.forEach(recipe => {
        const recipeArticle = recipeCardTemplate(recipe)
        section.appendChild(recipeArticle)
    });
    updateRecipeCounter(recipes)
}