import { displayIndexPage } from "../pages/recipes.js";
import { getTagsListsFromRecipes } from "../search/tags.js";

export function searchRecipes(
  app,
  searchString,
) {
  // faire la recherche principale avec l'algo optimisé ou pas
  app.recipes = app.recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchString),
  );

  // réinitialize les tags avec la nouvelle liste de recettes et réafficher la page
  [app.ingredients,app.appliances, app.ustensils] =
    getTagsListsFromRecipes(app.recipes);
  displayIndexPage(app);

  //Retourner toutes les nouvealles valeurs
  // return [app.recipes, app.ingredients, app.appliances, app.ustensils]

}
