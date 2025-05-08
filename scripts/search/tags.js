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

export function openFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  formTag.classList.remove("h-0");
  formTag.classList.remove("w-0");
  formTag.classList.add("border-1");
  listTags.classList.remove("h-0");
}

export function closeFilterTag(listTags, formTag, openBtn, closeBtn) {
  openBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
  formTag.classList.add("h-0");
  formTag.classList.add("w-0");
  formTag.classList.remove("border-1");
  listTags.classList.add("h-0");
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

export function updateListTags(listTags, inputTag) {
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

export function clearInputTag(tagKey, listTags) {
  const clearBtn = document.getElementById(tagKey + "ClearBtn");
  clearBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearBtn.parentElement.reset();
    const options = listTags.querySelectorAll("li");
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

export function addOrRemoveTagButtons(app, tagKey) {
  const tagKeyLower = tagKey.toLowerCase();
  const tagsListID = "#" + tagKeyLower + " li";
  const tagsList = document.querySelectorAll(tagsListID);
  const tagsButtonsDiv = document.getElementById("tagsBtns");

  tagsList.forEach((tag) => {
    const removeTagBtn = tag.querySelector("i").parentElement;
    const tagTextElement = tag.querySelector("p");

    tagTextElement.addEventListener("click", () => {
      if (!app.selectedTags.includes(tag.innerText)) {
        app.selectedTags.push(tag.innerText);
        tag.classList.add("font-manrope-bold");
        tag.classList.add("bg-mustard");
        removeTagBtn.classList.remove("hidden");

        const externalTabBtn = tagButtonTemplate(tag.innerText);
        tagsButtonsDiv.appendChild(externalTabBtn);

        externalTabBtn.addEventListener("click", () => {
          externalTabBtn.remove();
          const linkedTag = findElementByText(tagsListID, tag.innerText);
          const linkedremoveTagBtn = linkedTag.lastElementChild;
          linkedTag.classList.remove("font-manrope-bold");
          linkedTag.classList.remove("bg-mustard");
          linkedremoveTagBtn.classList.add("hidden");
          app.selectedTags = app.selectedTags.filter(
            (item) => item != tag.innerText,
          );
        });
      }
    });

    removeTagBtn.addEventListener("click", () => {
      tag.classList.remove("font-manrope-bold");
      tag.classList.remove("bg-mustard");
      removeTagBtn.classList.add("hidden");
      const externalButton = findElementByText(
        "#tagsBtns button",
        tag.innerText,
      );
      externalButton.remove();
      app.selectedTags = app.selectedTags.filter(
        (item) => item != tag.innerText,
      );
    });
  });
}

export function manageTagsSearch(app, tagKey) {
  // Récupérer les tags choisis
  // event listener sur le click sur un tag quelqu'il soit --> on le stocke dans app.selectedTags
  // il apparait en dessous du search principal et il reste surligné en jaune, en gras avec une croix
  // et la recherche se déclenche --> excécution de tagSearch()
  // Lorsque l'utilisateur clique sur la croix le tag reviens sur fond blanc
  // et il est retiré de la liste app.selectedTags et on relance la recherche
  addOrRemoveTagButtons(app, tagKey);

  // faire la recherche

  // réinitialize les tags avec la nouvelle liste de recettes et réafficher la page

}
