import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {CocktailDbImageSize} from "@/src/utils/enums/Cocktail";
import {BASE_URL, URL_SEPARATOR} from "@/src/constants/config";

/**
 * Return type of the Api call
 */
export interface ApiCocktailResponse {
    drinks: []
}

export const getRandomCocktailObject = async (): Promise<ApiCocktailResponse | any> => {
    try {
        // Create an instance of CocktailService
        const cocktailService = new CocktailService();

        // Call getRandomCocktail method
        const result = await cocktailService.getRandomCocktail();

        // Process the result, if needed
        return getInfosFromCocktail(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getCocktailInfoById = async (id: string): Promise<ApiCocktailResponse | any> => {
    try {
        // Create an instance of CocktailService
        const cocktailService = new CocktailService();

        // Call getRandomCocktail method
        const result = await cocktailService.getCocktailById(id);

        // Process the result, if needed
        return getInfosFromCocktail(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getCocktailDetailsById = async (id: string): Promise<any> => {
    try {
        // Create an instance of CocktailService
        const cocktailService = new CocktailService();

        // Call getRandomCocktail method
        const result = await cocktailService.getCocktailById(id);

        // Process the result, if needed
        return getDetailsFromCocktail(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getRandomCocktailDetails = async (): Promise<any> => {
    try {
        // Create an instance of CocktailService
        const cocktailService = new CocktailService();

        // Call getRandomCocktail method
        const result = await cocktailService.getRandomCocktail();

        // Process the result, if needed
        return getDetailsFromCocktail(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export function extractUrlFromCocktail (cocktail: Cocktail | CocktailDetail | undefined) {
    if (!cocktail) return '';
    return BASE_URL + cocktail.cocktailId + URL_SEPARATOR + cocktail.cocktailName.replace(/\s/g, '-');
}

export const getIngredientMeasure = (ingredientMeasure : string[], units: number) => {
    let result: string = '';

    try{
        const size: number = ingredientMeasure.length;

        if(size > 1) {
            result = (parseFloat(ingredientMeasure[0]) * units).toString();
            for (let counter = 1; counter < size; counter++) {
                result = result.concat(` ${ingredientMeasure[counter]}`)
            }
        }
    }
    catch (ex){
        console.log(`Error : ${ex}`)
    }


    return result;
}

const getInfosFromCocktail = (input: { drinks: string | any[]; }) => {
    // Check if 'drinks' array exists and has at least one item
    if (!input || !input.drinks || input.drinks.length <= 0) {
        console.warn('Invalid or empty response:', input);
        // Return null or handle the situation as appropriate
        return null;
    }

    const cocktail: Cocktail = {
        cocktailId: input.drinks[0].idDrink,
        cocktailName: input.drinks[0].strDrink,
        cocktailImage: input.drinks[0].strDrinkThumb,
    };

    return cocktail;
}

const getDetailsFromCocktail = (input: { drinks: string | any[]; }) => {
    // Check if 'drinks' array exists and has at least one item
    if (!input || !input.drinks || input.drinks.length <= 0) {
        console.warn('Invalid or empty response:', input);
        // Return null or handle the situation as appropriate
        return null;
    }

    const cocktail: CocktailDetail = {
        cocktailId: input.drinks[0].idDrink,
        cocktailName: input.drinks[0].strDrink,
        cocktailImage: input.drinks[0].strDrinkThumb,
        strAlcoholic: input.drinks[0].strAlcoholic,
        strCategory: input.drinks[0].strCategory,
        strGlass: input.drinks[0].strGlass,
        strIBA: input.drinks[0].strIBA,
        strInstructions: input.drinks[0].strInstructions,
        ingredientList: [],
        instructionsByLanguageList: [],
    }

    const cocktailService : CocktailService = new CocktailService();

    let hasOtherIngredient : boolean = true;
    const size : number = CocktailService.maxNumberOfIngredient;
    for(let counter: number = 1; hasOtherIngredient && counter <= size; counter++){

        const ingredient: string = input.drinks[0][`strIngredient${counter}`];
        const measure: string = input.drinks[0][`strMeasure${counter}`];

        if(ingredient){
            const ingredientMeasure: string[] = measure ? measure.split(' ') : [];

            cocktail.ingredientList.push({
                ingredientName: ingredient,
                ingredientImage: cocktailService.getImageByIngredientName(ingredient,CocktailDbImageSize.Small),
                ingredientMeasure: ingredientMeasure
            });
        }
        else {
            hasOtherIngredient = !hasOtherIngredient;
        }
    }

    return cocktail;
}
