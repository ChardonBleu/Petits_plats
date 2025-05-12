export class Recipe {
  constructor(data) {
    this.id = data.id; //number
    this.image = data.image; //string
    this.name = data.name; //string
    this.servings = data.servings; //number
    this.ingredients = data.ingredients; // array of objects {ingredient, quantity, unity}
    this.time = data.time; //number
    this.description = data.description; //string
    this.appliance = data.appliance; //string
    this.ustensils = data.ustensils; // array of strings
  }

  get ingredientsList() {
    // Array if strings
    const ingredientsList = []
    for (const ingredient of this.ingredients) {
      ingredientsList.push(ingredient.ingredient.toLowerCase())
    }
    return ingredientsList
  }
}
