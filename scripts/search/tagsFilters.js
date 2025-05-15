/** Fonctions permettant la gestion des filtres par tags
 */

import { clearInputTag } from "../pages/tags.js";
import { findElementByText } from "../utils/functions.js";
import { tagButtonTemplate } from "../components/tagBtnTemplate.js";
import { SelectedTagFactory } from "../factories/SelectedTagFactory.js";

/** add tag in app attribute app.ingredientsSelectedTags or app.appliancesSelectedTags or app.ustensilsSelectedTags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @return undefined
 */
function memorizeTagInAppAttribute(app, tagKey, tagText) {
  let selectedTagsFactory = new SelectedTagFactory(app, tagKey);
  let selectedTag = selectedTagsFactory.selectedTag;
  selectedTag.push(tagText);
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
  app.filterRecipesWithTags();
  app.displayAndManageIndexPage();
}

/** remove tag from app attribute app.ingredientsSelectedTags or app.appliancesSelectedTags or app.ustensilsSelectedTags
 * @param app {object} - app instance from App class
 * @param tagKey {string} -"ingredients" or "appliances" or "ustensils"
 * @param tagText {string} - string from clicked tag
 * @return undefined
 */
function removeTagFromAppAttribute(app, tagKey, tagText) {
  let selectedTagsFactory = new SelectedTagFactory(app, tagKey);
  selectedTagsFactory.selectedTag = selectedTagsFactory.selectedTag.filter(
    (item) => item != tagText,
  );
  selectedTagsFactory.update(app, tagKey);
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
  app.controlForActivePrincipalSearch();
  app.filterRecipesWithTags();
  app.displayAndManageIndexPage();
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
  let selectedTagsFactory = new SelectedTagFactory(app, tagKey);
  let selectedTagsAttribute = selectedTagsFactory.selectedTag;
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
      let selectedTagsFactory = new SelectedTagFactory(app, tagKey);
      let selectedTagsAttribute = selectedTagsFactory.selectedTag;
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
