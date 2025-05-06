import { displayIndexPage } from "../pages/recipes.js";
import { getTagsListsFromRecipes } from "../search/tags.js";

export function searchRecipes(
  recipes,
  ingredientTags,
  appliancesTags,
  ustensilsTags,
  searchString
) {
    // faire la recherche principale avec l'algo optimisé ou pas
    console.log(searchString)
    recipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes("coco"));
    console.log(recipes);

    // réinitialize les tags avec la nouvelle liste de recettes
    [ingredientTags, appliancesTags, ustensilsTags] = getTagsListsFromRecipes(recipes);
    displayIndexPage(recipes, ingredientTags, appliancesTags, ustensilsTags);

    //Retourner toutes les nouvealles valeurs
    return [recipes, ingredientTags, appliancesTags, ustensilsTags];
}