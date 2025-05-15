import { sanitize } from "../utils/functions.js";

/** manage input validity before search
 * @param inputSearch {DOM node}  input node with input user for principal search
 * @return Array(boolean, string)  boolean for validation and string for sanitized input
 *  */
export function validateSearchInput() {
  const inputSearch = document.getElementById("prinicpalSearchInput");
  const searchError = document.getElementById("searchAlert");
  if (inputSearch.checkValidity()) {
    searchError.innerHTML = ``;
    return [true, sanitize(inputSearch.value)];
  } else {
    searchError.innerHTML = `Veuillez entrer au moins 3 caractères dans le champ de recherche.`;
    return [false, ""];
  }
}
