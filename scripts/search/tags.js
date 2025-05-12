import {
  tagFilterTemplate,
  optionTagTemplate,
} from "../components/tagFilterCard.js";
import {
  sortAndRemovesDuplicates,
  findElementByText,
} from "../utils/functions.js";
import { tagButtonTemplate } from "../components/tagBtnTemplate.js";
import {
  displayAndManageIndexPage,
  controlForActivePrincipalSearch,
} from "../pages/recipes.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";

/** For openning list tags
 * @param listTags {DOM node} - ul element with all active tags
 *  @param formTag {DOM node} - form with input element for search in list tags
 *  @param openBtn {DOM node} - chevron down button on list tags
 *  @param closeBtn {DOM node} - chevron up button on list tags
 * @return undefined
 */
function openFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  formTag.classList.remove("h-0");
  formTag.classList.remove("w-0");
  formTag.classList.add("border-1");
  listTags.classList.remove("h-0");
}

/** For closing list tags
 * @param listTags {DOM node} - <ul> element with all active tags
 *  @param formTag {DOM node} - form with input element for search in list tags
 *  @param openBtn {DOM node} - chevron down button on list tags
 *  @param closeBtn {DOM node} - chevron up button on list tags
 * @return undefined
 */
function closeFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
  formTag.classList.add("h-0");
  formTag.classList.add("w-0");
  formTag.classList.remove("border-1");
  listTags.classList.add("h-0");
}

/** For display list tags at first opening index page
 * @param tagsList {DOM nodeList} - all <li> elements from one tag list
 * @param tagKey {string} - "Ingredients" or ""Appliances" or "Ustensils"
 * @return undefined
 */
export function displayTagsCard(tagsList, tagKey) {
  const tagKeyLower = tagKey.en.toLowerCase();
  const tagsId = tagKeyLower + "Tags";
  const ingredientTags = document.getElementById(tagsId);
  const templateIngredientCard = tagFilterTemplate(tagKey);
  ingredientTags.innerHTML = templateIngredientCard;
  const ingredients = document.getElementById(tagKeyLower);
  tagsList.forEach((tag) => {
    const option = optionTagTemplate(tag);
    ingredients.appendChild(option);
  });
}

/** Update app attributes: app.ingredients, app.appliances and app.ustensils
 * based on current app.recipes
 * @param app {object} - app instance from App class
 * @return undefined
 */
export function getTagsListsFromRecipes(app) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  app.recipes.forEach((recipe) => {
    recipe.ingredientsList.forEach((ingredient) =>
      ingredients.push(ingredient.toLowerCase()),
    );
    appliances.push(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ustensil) =>
      ustensils.push(ustensil.toLowerCase()),
    );
  });
  app.ingredients = sortAndRemovesDuplicates(ingredients);
  app.appliances = sortAndRemovesDuplicates(appliances);
  app.ustensils = sortAndRemovesDuplicates(ustensils);
}

/** Update app list tags on index page based on current app attributes
 * @param app {object} - app instance from App class
 * @return undefined
 */
export function updateListTagsFromRecipes(app) {
  const allTagsList = document.querySelectorAll("li");
  allTagsList.forEach(function (tag) {
    const tagTextElement = tag.querySelector("p");
    const tagText = tagTextElement.innerText.toLowerCase();
    if (
      app.ingredients.includes(tagText) ||
      app.appliances.includes(tagText) ||
      app.ustensils.includes(tagText)
    ) {
      tag.classList.remove("hidden");
    } else {
      tag.classList.add("hidden");
    }
  });
}

/** Update app list tags on index page based on user input in serach tag element
 * @param listTag {DOM node} - <ul> element for this list tag
 * @param inputTag {DOM node} - input search element for this list tag
 * @return undefined
 */
function updateListTagsFromInput(listTag, inputTag) {
  const options = listTag.querySelectorAll("li");
  var text = inputTag.value.toUpperCase();
  options.forEach((option) => {
    if (option.innerText.toUpperCase().indexOf(text) === -1) {
      option.classList.add("hidden");
    } else {
      option.classList.remove("hidden");
    }
  });
}

/** clear input saerch tag
 * @param tagKeyLower {string} -"ingredients" or "appliances" or "ustensils"
 * @return undefined
 */
function clearInputTag(tagKeyLower) {
  const clearBtn = document.getElementById(tagKeyLower + "ClearBtn");
  clearBtn.parentElement.reset();
}

/** Manage tag list comportment when opening, closing, searching for a tag in input search
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @return undefined
 */
export function manageTags(tagKey) {
  const openBtnId = "#open" + tagKey + "Btn";
  const closeBtnId = "#close" + tagKey + "Btn";
  const tagKeyLower = tagKey.toLowerCase();
  const listId = "#" + tagKeyLower;
  const inputId = "#" + tagKeyLower + "Input";
  const formId = "#" + tagKeyLower + "Form";

  const openBtn = document.querySelector(openBtnId);
  const closeBtn = document.querySelector(closeBtnId);
  const list = document.querySelector(listId);
  const input = document.querySelector(inputId);
  const form = document.querySelector(formId);
  const clearBtn = document.getElementById(tagKeyLower + "ClearBtn");

  openBtn.addEventListener("click", () => {
    openFilterTag(list, form, openBtn, closeBtn);
  });
  closeBtn.addEventListener("click", () => {
    closeFilterTag(list, form, openBtn, closeBtn);
  });

  input.addEventListener("input", () => {
    updateListTagsFromInput(list, input);
  });

  clearBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearBtn.parentElement.reset();
    updateListTagsFromInput(list, input);
  });
}

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
function memorizeTag(app, tagKey, tagText, clickedTag) {
  clickedTag.classList.add("font-manrope-bold");
  clickedTag.classList.add("bg-mustard");
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
