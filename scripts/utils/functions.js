export function capitalizeSentence(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sortAndRemovesDuplicates(myList) {
  return [...new Set(myList)].sort((a, b) => a.localeCompare(b));
}

export function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

export function findElementByText(selector, text) {
  const elements = document.querySelectorAll(selector);

  for (let element of elements) {
    if (element.textContent.trim() === text) {
      return element;
    }
  }
  return null;
}
