export class SelectedTagFactory {
  constructor(data, type) {
    switch (type) {
      case "Ingredients":
        this.selectedTag = data.ingredientsSelectedTags;
        break;
      case "Appliances":
        this.selectedTag = data.appliancesSelectedTags;
        break;
      case "Ustensils":
        this.selectedTag = data.ustensilsSelectedTags;
        break;
      default:
        throw new Error("catégorie de tag non connue");
    }
  }

  update(data, type) {
    switch (type) {
      case "Ingredients":
        data.ingredientsSelectedTags = this.selectedTag;
        break;
      case "Appliances":
        data.appliancesSelectedTags = this.selectedTag;
        break;
      case "Ustensils":
        data.ustensilsSelectedTags = this.selectedTag;
        break;
      default:
        throw new Error("catégorie de tag non connue");
    }
  }
}
