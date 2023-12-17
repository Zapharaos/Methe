/**
 * Cocktail type comes with the cocktail API
 */
export interface CocktailAPI{
    idDrink : string,
    strDrink : string,
    strDrinkThumb : string,
    strAlcoholic : string,
    strCategory : string,
    strGlass : string,
    strIBA : string,
    strInstructions : string,
}

/**
 * The categories API object
 */
export interface CategoriesAPI {
    strCategory: string
}

/**
 * The glass API object
 */
export interface  GlassAPI {
    strGlass: string
}

/**
 * The ingredient API object
 */
export interface  IngredientAPI {
    strIngredient1: string
}

/**
 * The alcoholic API object
 */
export interface  AlcoholicAPI {
    strAlcoholic: string
}
