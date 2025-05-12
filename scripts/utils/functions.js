/** Put an upper case at the sentence begining
 * @param string {string} - string we want to capitalize
 * @return string
 */
export function capitalizeSentence(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/** sort and remove duplicates on an array of strings
 * @param myList {Array} - Recipe instance
 * @return Array - sorted array
 */
export function sortAndRemovesDuplicates(myList) {
  return [...new Set(myList)].sort((a, b) => a.localeCompare(b));
}

/** Prevent xss injection
 * @param string {string} - string to sanitize
 * @return string - sanitized string
 */
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

/** personalized DOM selector
 * @param selector {string} - DOM Node identificator
 * @param text {string} - string we want to find in DOM
 * @return Node - DOM element with text in content
 */
export function findElementByText(selector, text) {
  const elements = document.querySelectorAll(selector);

  for (let element of elements) {
    if (element.textContent.trim() === text) {
      return element;
    }
  }
  return null;
}
