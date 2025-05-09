import { capitalizeSentence } from "../utils/functions.js";

export function tagFilterTemplate(tagTitle) {
  const lowerTitle = tagTitle.en.toLowerCase();
  return `
        <label
            class="flex justify-between items-center pl-3 pr-3 pt-4 pb-[10px]"
            for="${lowerTitle}Input"
          >
            <div class="font-[manrope-medium] text-form">${tagTitle.fr}</div>
            <div id="open${tagTitle.en}Btn" class="cursor-pointer">
              <img
                src="assets/icons/chevron-down.png"
                alt="chevron down icon"
              />
            </div>
            <div id="close${tagTitle.en}Btn" class="hidden cursor-pointer">
              <img src="assets/icons/chevron-up.png" alt="chevron down icon" />
            </div>
          </label>
          <div class="">
            <form
              id="${lowerTitle}Form"
              class="h-0 w-0 flex justify-between items-center border-light-grey ml-3 mr-3"
            >
              <input
                id="${lowerTitle}Input"
                role="combobox"
                list=""
                name="${lowerTitle}"
                class="text-medium-grey outline-none w-full h-[36px]"
              />
              <button
                id="${lowerTitle}ClearBtn"
                class="flex items-center justify-center cursor-pointer pr-2"
              >
                <img
                  src="assets/icons/close.png"
                  alt="logo croix"
                  width="10px"
                  height="10px"
                />
              </button>
              <button id="${lowerTitle}SearchBtn" class="flex items-center justify-center pr-2">
                <img
                  src="assets/icons/little-search.svg"
                  alt="logo search"
                  width="20px"
                  height="20px"
                />
              </button>
            </form>
          </div>
          <ul
            id="${lowerTitle}"
            role="listbox"
            class="h-0 flex mt-2 rounded-b-lg flex-col content-between overflow-y-scroll discret-scroll max-h-72"
          >
          </ul>
    
    `;
}

export function optionTagTemplate(optionText) {
  const option = document.createElement("li");
  option.setAttribute(
    "class",
    "cursor-pointer hover:bg-mustard pl-3 pr-3  min-h-10 pt-2 flex justify-between items-center",
  );
  option.innerHTML = `
    <p class="w-[90%]">${capitalizeSentence(optionText)}</p><p class="hidden"><i class="fa-solid fa-circle-xmark"></i></p>
  `;
  return option;
}
