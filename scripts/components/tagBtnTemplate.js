export function tagButtonTemplate(tagText) {
  const button = document.createElement("button");
  button.setAttribute(
    "class",
    "bg-mustard p-[17px] rounded-xl gap-10 flex justify-between items-center",
  );
  const template = `
        <p class="font-manrope-regular text-regular ">${tagText}</p>
        <i class="fa-solid fa-xmark fa-xl"></i>
    `;
  button.innerHTML = template;
  return button;
}
