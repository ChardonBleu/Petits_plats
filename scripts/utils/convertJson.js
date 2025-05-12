/** Convert a javascript array to Json file
 * @param datasArray {array} - javascript array
 * @return indefined
 */
export function convertListOfDictToJson(datasArray) {
  const jsonString = JSON.stringify(datasArray, null, 2);
  // Créer un Blob avec les données JSON
  const blob = new Blob([jsonString], { type: 'application/json' });
  // Créer un lien de téléchargement
  const dataUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'data.json'; // Nom du fichier
  document.body.appendChild(a);
  a.click();
  // Nettoyer
  document.body.removeChild(a);
  URL.revokeObjectURL(dataUrl);
}
