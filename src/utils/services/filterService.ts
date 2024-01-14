import {CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {Dispatch, SetStateAction} from "react";
import {filter} from "rxjs";

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
                       setFilterActive: Dispatch<SetStateAction<boolean>>, randomCocktails: CocktailDetail[],
                       filterGlasses: string[], filterCategory: string[], filterAlcoholic: string[], filterIngredients: string[]) => {

    const filterActive = filterGlasses.length !== 0 || filterCategory.length !== 0 ||
        filterAlcoholic.length !== 0 || filterIngredients.length !== 0
    setFilterActive(filterActive);

    // no filter to apply here
    if(!filterActive)
    {
        return;
    }

    let initialCocktails: CocktailDetail[];
    if(searchActive && !searchByIngredient)
    {
        // apply filter to research
        initialCocktails = searchResult;
    }
    else
    {
        // apply filter to random cocktails
        initialCocktails = randomCocktails;
    }

    setFilterResult(initialCocktails.filter((cocktail: CocktailDetail) =>
        filterInformation(cocktail, filterGlasses, filterCategory, filterAlcoholic, filterIngredients)));
}
