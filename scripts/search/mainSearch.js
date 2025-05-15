/** Fonctions gérant l'affichage des messages d'info
 * pour la recherche principale
 */

/** Display info when no recipe has been found
 * @param searchString {string} - user search input
 * @return undefined
 */
export function displayInfoSearch(searchString) {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = `
    Auncune recette ne contient ${searchString}. Vous pouvez chercher «Tarte aux pommes», «poisson», etc
  `;
}

/** Mask info when recipes has been found or user makes new search
 * @return undefined
 */
export function maskInfoSearch() {
  const searchAlert = document.getElementById("searchAlert");
  searchAlert.innerHTML = "";
}
