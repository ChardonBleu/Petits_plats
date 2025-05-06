export function updateRecipeCounter(recipes) {
    const counter = document.getElementById("counter")
    counter.innerHTML = `${recipes.length} recettes`
}