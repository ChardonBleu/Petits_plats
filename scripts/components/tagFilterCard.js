export function tagFilterTemplate(tagTitle) {
  const lowerTitle = tagTitle.toLowerCase();
  return `
        <label
            class="flex justify-between items-center pl-3 pr-3 pt-4 pb-[10px]"
            for="${lowerTitle}Input"
          >
            <div class="font-[manrope-medium] text-form">${tagTitle}</div>
            <div id="open${tagTitle}Btn" class="cursor-pointer">
              <img
                src="assets/icons/chevron-down.png"
                alt="chevron down icon"
              />
            </div>
            <div id="close${tagTitle}Btn" class="hidden cursor-pointer">
              <img src="assets/icons/chevron-up.png" alt="chevron down icon" />
            </div>
          </label>
          <div class="">
            <form
              id="${lowerTitle}Form"
              class="hidden justify-between items-center border-1 border-light-grey ml-3 mr-3"
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
              <button class="flex items-center justify-center pr-2">
                <img
                  src="assets/icons/little-search.svg"
                  alt="logo search"
                  width="20px"
                  height="20px"
                />
              </button>
            </form>
          </div>
          <datalist
            id="${lowerTitle}"
            role="listbox"
            class="hidden mt-2 rounded-b-lg flex-col content-between overflow-y-scroll discret-scroll max-h-72"
          >
          </datalist>
    
    `;
}

export function optionTagTemplate(optionText) {
  const option = document.createElement("option");
  option.setAttribute(
    "class",
    "cursor-pointer hover:bg-mustard pl-3  min-h-10 pt-2",
  );
  option.setAttribute("value", optionText);
  option.innerText = optionText;
  return option;
}
