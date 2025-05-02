export class Recipe {
  constructor(data) {
    this.id = data.id; //number
    this.image = data.image; //string
    this.name = data.name; //string
    this.servings = data.servings; //number
    this.ingredients = data.ingredients; // array
    this.time = data.time; //number
    this.description = data.description; //string
    this.appliance = data.appliance; //string
    this.ustensils = data.ustensils; // array
  }
}
