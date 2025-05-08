import { displayAndManageIndexPage } from "../pages/recipes.js";

export function searchRecipes(app, searchString) {
  // faire la recherche principale avec l'algo optimisé ou pas
  app.recipes = app.recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchString),
  );

  displayAndManageIndexPage(app);
}
