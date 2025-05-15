/** Composant de bouton de card de recettes
 */

export function ingredientTemplate(ingredient) {
  const div = document.createElement("div");
  div.setAttribute("class", "w-[40%] flex flex-col mb-4");
  let quantity = ingredient.quantity ? ingredient.quantity : "";
  let unit = ingredient.unit ? ingredient.unit : "";
  div.innerHTML = `
    <p class="font-manrope-medium text-regular text-anthracite">${ingredient.ingredient}</p>
    <p class="font-manrope-regular text-regular text-medium-grey">${quantity}${unit}</p>
`;
  return div;
}

export function recipeCardTemplate(recipe) {
  const article = document.createElement("article");
  article.setAttribute(
    "class",
    "w-[30%] flex flex-col rounded-xl bg-white relative",
  );
  article.innerHTML = `
    <div class="h-[250px]">
        <img src="./assets/images/${recipe.image}" alt="${recipe.name}" class="object-cover w-full h-full rounded-t-xl">
    </div>
    <div class="p-8">
        <h2 class="font-anton pb-6">${recipe.name}</h3>
        <h3 class="font-manrope-bold text-mini text-medium-grey pb-4 tracking-[9%]">RECETTE</h4>
        <p class="font-manrope-regular text-regular text-anthracite h-[80px] overflow-hidden text-clip">${recipe.description}</p>
        <h3 class="font-manrope-bold text-mini text-medium-grey pt-6 pb-6 tracking-[9%]">${"Ingrédients".toUpperCase()}</h4>
        <div id="ingredientsList" class="flex justify-between flex-wrap"></div>
    </div>
    <div class="absolute bg-mustard rounded-full pl-3 pr-3 pt-1 pb-1 top-5 right-5">${recipe.time}min</div>
  `;
  recipe.ingredients.forEach((ingredient) => {
    const element = ingredientTemplate(ingredient);
    article.querySelector("#ingredientsList").appendChild(element);
  });
  return article;
}
