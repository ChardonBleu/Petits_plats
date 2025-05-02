import {
  openFilterTag,
  closeFilterTag,
  updteListTags,
  clearInputTag
} from "../utils/filterTag.js";
import {
  tagFilterTemplate,
  optionTagTemplate,
} from "../components/tagFilterCard.js";

export function displayIngredientsTagsCard(tagsList, tagKey) {
  const tagKeyLower = tagKey.toLowerCase()
  const tagsId = tagKeyLower+"Tags"

  const ingredientTags = document.getElementById(tagsId);
  const templateIngredientCard = tagFilterTemplate(tagKey);
  ingredientTags.innerHTML = templateIngredientCard;
  const ingredients = document.getElementById(tagKeyLower);
  tagsList.forEach((tag) => {
    const option = optionTagTemplate(tag);
    ingredients.appendChild(option);
  });
}

export function manageIngredientsTags(tagKey) {
  const openBtnId = "#open"+tagKey+"Btn"
  const closeBtnId = "#close"+tagKey+"Btn"
  const tagKeyLower = tagKey.toLowerCase()
  const listId = "#"+tagKeyLower
  const inputId = "#"+tagKeyLower+"Input"
  const formId = "#"+tagKeyLower+"Form"

  const openBtn = document.querySelector(openBtnId);
  const closeBtn = document.querySelector(closeBtnId);
  const list = document.querySelector(listId);
  const input = document.querySelector(inputId);
  const form = document.querySelector(formId);

  openBtn.addEventListener("click", () => {
    openFilterTag(
      list,
      form,
      openBtn,
      closeBtn,
    );
  });
  closeBtn.addEventListener("click", () => {
    closeFilterTag(
      list,
      form,
      openBtn,
      closeBtn,
    );
  });
  updteListTags(list, input);
  clearInputTag(tagKeyLower,list, input);

}
