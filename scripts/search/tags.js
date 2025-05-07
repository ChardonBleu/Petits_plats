import {
  tagFilterTemplate,
  optionTagTemplate,
} from "../components/tagFilterCard.js";
import {
  capitalizeSentence,
  sortAndRemovesDuplicates,
} from "../utils/functions.js";

export function openFilterTag(listTags, formTag, openBtn, closeBtn) {
  listTags.classList.remove("hidden");
  listTags.classList.add("flex");
  formTag.classList.remove("hidden");
  formTag.classList.add("flex");
  openBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
}

export function closeFilterTag(listTags, formTag, openBtn, closeBtn) {
  listTags.classList.add("hidden");
  formTag.classList.add("hidden");
  openBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
}

export function getTagsListsFromRecipes(recipes) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) =>
      ingredients.push(capitalizeSentence(ingredient.ingredient.toLowerCase())),
    );
    appliances.push(capitalizeSentence(recipe.appliance.toLowerCase()));
    recipe.ustensils.forEach((ustensil) =>
      ustensils.push(capitalizeSentence(ustensil.toLowerCase())),
    );
  });
  ingredients = sortAndRemovesDuplicates(ingredients);
  appliances = sortAndRemovesDuplicates(appliances);
  ustensils = sortAndRemovesDuplicates(ustensils);
  return [ingredients, appliances, ustensils];
}

export function updateListTags(listTags, inputTag) {
  const options = listTags.querySelectorAll("option");
  inputTag.addEventListener("input", () => {
    var text = inputTag.value.toUpperCase();
    options.forEach((option) => {
      if (option.value.toUpperCase().indexOf(text) === -1) {
        option.classList.add("hidden");
      } else {
        option.classList.remove("hidden");
      }
    });
  });
}

export function clearInputTag(tagKey, listTags) {
  const clearBtn = document.getElementById(tagKey + "ClearBtn");
  clearBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearBtn.parentElement.reset();
    const options = listTags.querySelectorAll("option");
    options.forEach((option) => option.classList.remove("hidden"));
  });
}

export function displayTagsCard(tagsList, tagKey) {
  const tagKeyLower = tagKey.toLowerCase();
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
  updateListTags(list, input);
  clearInputTag(tagKeyLower, list, input);
}
