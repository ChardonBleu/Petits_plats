import {
  tagFilterTemplate,
  optionTagTemplate,
} from "../components/tagFilterCard.js";
import {
  capitalizeSentence,
  sortAndRemovesDuplicates,
  findElementByText,
} from "../utils/functions.js";
import { tagButtonTemplate } from "../components/tagBtnTemplate.js";
import { displayAndManageIndexPage,controlForActivePrincipalSearch } from "../pages/recipes.js";
import { ingredients, appliances, ustensils } from "../utils/constants.js";

function openFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  formTag.classList.remove("h-0");
  formTag.classList.remove("w-0");
  formTag.classList.add("border-1");
  listTags.classList.remove("h-0");
}

function closeFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
  formTag.classList.add("h-0");
  formTag.classList.add("w-0");
  formTag.classList.remove("border-1");
  listTags.classList.add("h-0");
}

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

export function getTagsListsFromRecipes(app) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];
  app.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) =>
      ingredients.push(capitalizeSentence(ingredient.ingredient.toLowerCase())),
    );
    appliances.push(capitalizeSentence(recipe.appliance.toLowerCase()));
    recipe.ustensils.forEach((ustensil) =>
      ustensils.push(capitalizeSentence(ustensil.toLowerCase())),
    );
  });
  app.ingredients = sortAndRemovesDuplicates(ingredients);
  app.appliances = sortAndRemovesDuplicates(appliances);
  app.ustensils = sortAndRemovesDuplicates(ustensils);
}

export function updateListTagsFromRecipes(app) {
  const allTagsList = document.querySelectorAll("li");
  allTagsList.forEach(function (tag) {
    const tagTextElement = tag.querySelector("p");
    const tagText = tagTextElement.innerText;
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

function updateListTagsFromInput(listTags, inputTag) {
  const options = listTags.querySelectorAll("li");
  inputTag.addEventListener("input", () => {
    var text = inputTag.value.toUpperCase();
    options.forEach((option) => {
      if (option.innerText.toUpperCase().indexOf(text) === -1) {
        option.classList.add("hidden");
      } else {
        option.classList.remove("hidden");
      }
    });
  });
}

function clearInputTag(tagKey, listTags) {
  const clearBtn = document.getElementById(tagKey + "ClearBtn");
  clearBtn.addEventListener("click", () => {
    clearBtn.parentElement.reset();
    const options = listTags.querySelectorAll("li");
    options.forEach((option) => option.classList.remove("hidden"));
  });
}

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

  openBtn.addEventListener("click", () => {
    openFilterTag(list, form, openBtn, closeBtn);
  });
  closeBtn.addEventListener("click", () => {
    closeFilterTag(list, form, openBtn, closeBtn);
  });
  updateListTagsFromInput(list, input);
  clearInputTag(tagKeyLower, list, input);
}

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

export function filterRecipesWithTags(app) {
  app.recipes = app.recipes.filter(function (recipe) {
    const ingredientsList = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase(),
    );
    const recipeIsOK =
      app.ustensilsSelectedTags.every((item) =>
        recipe.ustensils.includes(item.toLowerCase()),
      ) &&
      app.ingredientsSelectedTags.every((item) =>
        ingredientsList.includes(item.toLowerCase()),
      ) &&
      recipe.appliance.includes(app.appliancesSelectedTags);
    return recipeIsOK ? recipe : undefined;
  });
}

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

function memorizeTag(app, tagKey, tagText, clickedTag) {
  clickedTag.classList.add("font-manrope-bold");
  clickedTag.classList.add("bg-mustard");
  memorizeTagInAppAttribute(app, tagKey, tagText);
  filterRecipesWithTags(app);
  displayAndManageIndexPage(app);
}

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

function removeTag(app, tagKey, tagText, clickedTag) {
  clickedTag.classList.remove("font-manrope-bold");
  clickedTag.classList.remove("bg-mustard");
  removeTagFromAppAttribute(app, tagKey, tagText);
  app.fetchDatas();
  controlForActivePrincipalSearch(app)
  filterRecipesWithTags(app);
  displayAndManageIndexPage(app);
}

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
        memorizeTag(app, tagKey, tagText, tag)

        externalTagBtn.addEventListener("click", () => {
          externalTagBtn.remove();
          const linkedTag = findElementByText(tagsListID, tagText);
          const linkedremoveTagBtn = linkedTag.lastElementChild;          
          linkedremoveTagBtn.classList.add("hidden");
          removeTag(app, tagKey, tagText, linkedTag)
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
      removeTag(app, tagKey, tagText, tag)
    });
  });
}
