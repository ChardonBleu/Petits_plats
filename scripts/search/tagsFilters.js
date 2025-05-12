import { clearInputTag } from "../pages/tags.js";
import { findElementByText } from "../utils/functions.js";
import { tagButtonTemplate } from "../components/tagBtnTemplate.js";
import { displayAndManageIndexPage } from "../pages/recipes.js";
import { controlForActivePrincipalSearch } from "../search/principalSearch.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";

/** get app attribute for selected tags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @return Array[string] - app.ingredientsSelectedTags or app.appliancesSelectedTags or app.ustensilsSelectedTags
 */
function getAppSelectedTagsFromKeyTag(app, tagKey) {
  switch (tagKey) {
    case ingredients.en:
      return app.ingredientsSelectedTags;
    case appliances.en:
      return app.appliancesSelectedTags;
    case ustensils.en:
      return app.ustensilsSelectedTags;
    default:
      throw new Error("catégorie de tag non connue");
  }
}

/** return recipe if ingredients or appliances or ustensils for this recipe are in selected tags.
 * @param app {object} - app instance from App class
 * @return recipe | undefined {object} - recipe instance from Recipe class
 */
export function filterRecipesWithTags(app) {
  app.recipes = app.recipes.filter(function (recipe) {
    const recipeIsOK =
      app.ustensilsSelectedTags.every((item) =>
        recipe.ustensils.includes(item.toLowerCase()),
      ) &&
      app.ingredientsSelectedTags.every((item) =>
        recipe.ingredientsList.includes(item.toLowerCase()),
      ) &&
      recipe.appliance.includes(app.appliancesSelectedTags);
    return recipeIsOK ? recipe : undefined;
  });
}

/** add tag in app attribute app.ingredientsSelectedTags or app.appliancesSelectedTags or app.ustensilsSelectedTags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @return undefined
 */
function memorizeTagInAppAttribute(app, tagKey, tagText) {
  switch (tagKey) {
    case ingredients.en:
      app.ingredientsSelectedTags.push(tagText);
      break;
    case appliances.en:
      app.appliancesSelectedTags.push(tagText);
      break;
    case ustensils.en:
      app.ustensilsSelectedTags.push(tagText);
      break;
    default:
      throw new Error("catégorie de tag non connue");
  }
}

/** After clicking on tag memorize in app and update tag list and display index with new recipes list
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @param clickedTag {DOM node} - cliked tag element in tag list
 * @return undefined
 */
function memorizeTag(app, tagKey, tagText) {
  memorizeTagInAppAttribute(app, tagKey, tagText);
  filterRecipesWithTags(app);
  displayAndManageIndexPage(app);
}

/** remove tag from app attribute app.ingredientsSelectedTags or app.appliancesSelectedTags or app.ustensilsSelectedTags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @return undefined
 */
function removeTagFromAppAttribute(app, tagKey, tagText) {
  switch (tagKey) {
    case ingredients.en:
      app.ingredientsSelectedTags = app.ingredientsSelectedTags.filter(
        (item) => item != tagText,
      );
      break;
    case appliances.en:
      app.appliancesSelectedTags = app.appliancesSelectedTags.filter(
        (item) => item != tagText,
      );
      break;
    case ustensils.en:
      app.ustensilsSelectedTags = app.ustensilsSelectedTags.filter(
        (item) => item != tagText,
      );
      break;
    default:
      throw new Error("catégorie de tag non connue");
  }
}

/** After clicking on close button tag remove tag from app and update tag list and display index with new recipes list
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @param clickedTag {DOM node} - cliked tag element in tag list
 * @return undefined
 */
async function removeTag(app, tagKey, tagText, clickedTag) {
  clickedTag.classList.remove("font-manrope-bold");
  clickedTag.classList.remove("bg-mustard");
  removeTagFromAppAttribute(app, tagKey, tagText);
  app.recipes = await app.fetchDatas();
  controlForActivePrincipalSearch(app);
  filterRecipesWithTags(app);
  displayAndManageIndexPage(app);
}

/** Colorize and display remove button for selected Tags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @return undefined
 */
function colorizeSelectedTags(app, tagKey) {
  const tagKeyLower = tagKey.toLowerCase();
  const tagsListID = "#" + tagKeyLower + " li";
  const tagsList = document.querySelectorAll(tagsListID);
  let selectedTagsAttribute = getAppSelectedTagsFromKeyTag(app, tagKey);
  tagsList.forEach((tag) => {
    const removeTagBtn = tag.querySelector("i").parentElement;
    const tagTextElement = tag.querySelector("p");
    const tagText = tagTextElement.innerText;
    if (selectedTagsAttribute.includes(tagText)) {
      removeTagBtn.classList.remove("hidden");
      tag.classList.add("font-manrope-bold");
      tag.classList.add("bg-mustard");
    }
  });
}

/** Manage tag search with Event Listeners on each tag and tags buttons
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @return undefined
 */
export function manageTagsSearch(app, tagKey) {
  const tagKeyLower = tagKey.toLowerCase();
  const tagsListID = "#" + tagKeyLower + " li";
  const tagsList = document.querySelectorAll(tagsListID);
  const tagsButtonsDiv = document.getElementById("tagsBtns");

  colorizeSelectedTags(app, tagKey);

  tagsList.forEach((tag) => {
    const removeTagBtn = tag.querySelector("i").parentElement;
    const tagTextElement = tag.querySelector("p");
    const tagText = tagTextElement.innerText;

    tagTextElement.addEventListener("click", () => {
      let selectedTagsAttribute = getAppSelectedTagsFromKeyTag(app, tagKey);
      if (!selectedTagsAttribute.includes(tagText)) {
        removeTagBtn.classList.remove("hidden");
        const externalTagBtn = tagButtonTemplate(tagText);
        tagsButtonsDiv.appendChild(externalTagBtn);
        memorizeTag(app, tagKey, tagText, tag);
        clearInputTag(tagKeyLower);

        externalTagBtn.addEventListener("click", () => {
          externalTagBtn.remove();
          const linkedTag = findElementByText(tagsListID, tagText);
          const linkedremoveTagBtn = linkedTag.lastElementChild;
          linkedremoveTagBtn.classList.add("hidden");
          removeTag(app, tagKey, tagText, linkedTag);
        });
      }
    });
    removeTagBtn.addEventListener("click", () => {
      removeTagBtn.classList.add("hidden");
      const externalButton = findElementByText(
        "#tagsBtns button",
        tag.innerText,
      );
      externalButton.remove();
      removeTag(app, tagKey, tagText, tag);
    });
  });
}
