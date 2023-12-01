/**
 * Cocktail type use for cards
 */
export interface Cocktail{
    cocktailId: bigint;
    cocktailNames: string;
    cocktailImage: string;
}

/**
 * Cocktail type use for recipe detail
 */
export interface CocktailDetail{
    cocktailId: bigint;
    cocktailNames: string;
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
