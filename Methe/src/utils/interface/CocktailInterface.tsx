/**
 * Cocktail type use for cards
 */
export interface Cocktail{
    cocktailId: string;
    cocktailName: string;
    cocktailImage: string;
}

/**
 * Cocktail type use for recipe detail
 */
export interface CocktailDetail{
    cocktailId: string;
    cocktailName: string;
    cocktailImage: string;
    strCategory: string;
    strIBA: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    instructionsByLanguageList: InstructionsByLanguage[];
    ingredientList: Ingredient[];
}

/**
 *  Instructions type use for recipe detail
 */
export interface InstructionsByLanguage{
    language: string;
    instructions: string;
}

/**
 * Ingredient type use for recipe detail
 */
export interface Ingredient{
    ingredientName: string;
    ingredientImage: string;
    ingredientMeasure: string[];
}

/**
 * Filter type use for filter the cocktail
 */
export interface FilterCocktail {
    ingredientList: string[];
}
