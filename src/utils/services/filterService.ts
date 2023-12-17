import {CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {Dispatch, SetStateAction} from "react";

/**
 * Return a boolean to filter the cocktail, true for a valid cocktail
 * @param cocktail the cocktail to check
 * @param filterGlasses the glasses chosen by the user
 * @param filterCategory the categories chosen by the user
 * @param filterAlcoholic the alcoholic types chosen by the user
 * @param filterIngredients the ingredients chosen by the user
 */
const filterInformation = (cocktail: CocktailDetail, filterGlasses: string[], filterCategory: string[],
                                  filterAlcoholic: string[], filterIngredients: string[]) => {
    const glassCondition = filterGlasses.length === 0 || filterGlasses.includes(cocktail.strGlass);
    const categoryCondition = filterCategory.length === 0 || filterCategory.includes(cocktail.strCategory);
    const alcoholicCondition = filterAlcoholic.length === 0 || filterAlcoholic.includes(cocktail.strAlcoholic);
    const ingredientCondition = filterIngredients.length === 0 ||
        cocktail.ingredientList.some(ingredient =>
            filterIngredients.includes(ingredient.ingredientName)
        );

    return glassCondition && categoryCondition && alcoholicCondition && ingredientCondition;
}

/**
 * Filter cocktails and store the result into the filter list
 */
export const executeFilter = (searchActive: boolean, searchByIngredient: boolean, searchResult: CocktailDetail[], setFilterResult: Dispatch<SetStateAction<CocktailDetail[]>>,
                       randomCocktails: CocktailDetail[], setFilterRandomCocktails: Dispatch<SetStateAction<CocktailDetail[]>>,
                       filterGlasses: string[], filterCategory: string[], filterAlcoholic: string[], filterIngredients: string[]) => {

    if(searchActive && !searchByIngredient){
        let filteredCocktails: CocktailDetail[] = searchResult.filter((cocktail: CocktailDetail) =>
            filterInformation(cocktail, filterGlasses, filterCategory, filterAlcoholic, filterIngredients));
        setFilterResult(filteredCocktails);
    }
    else{
        let filteredCocktails: CocktailDetail[] = randomCocktails.filter((cocktail: CocktailDetail) =>
            filterInformation(cocktail, filterGlasses, filterCategory, filterAlcoholic, filterIngredients));
        setFilterRandomCocktails(filteredCocktails);
    }
}