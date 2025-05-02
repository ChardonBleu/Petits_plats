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

export function updteListTags(listTags, inputTag) {
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
  const clearBtn = document.getElementById(tagKey+"ClearBtn")
  clearBtn.addEventListener('click', (event) => {
    event.preventDefault()
    clearBtn.parentElement.reset()
    const options = listTags.querySelectorAll("option");
    options.forEach((option) => option.classList.remove("hidden"))
  })
}