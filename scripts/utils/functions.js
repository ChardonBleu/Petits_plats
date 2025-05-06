export function capitalizeSentence(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export function sortAndRemovesDuplicates(myList) {
    return [...new Set(myList)].sort((a, b) => a.localeCompare(b))
}