/** Fonctions gérant l'affichage des filtres par tag
 */

import {
  tagFilterTemplate,
  optionTagTemplate,
} from "../components/tagFilterCard.js";

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
export function clearInputTag(tagKeyLower) {
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
