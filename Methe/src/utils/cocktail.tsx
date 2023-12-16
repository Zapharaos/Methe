import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {CocktailDbImageSize} from "@/src/utils/enums/Cocktail";
import {BASE_URL, MAX_RETRIES, RETRY_DELAI, URL_SEPARATOR} from "@/src/constants/config";
import {sleep} from "@/src/utils/utils";

/**
 * Return type of the Api call
 */
export interface ApiCocktailResponse {
    drinks: []
}

const handleRequestError = async (error: any, retryCount: number): Promise<number> => {
    console.error('Error fetching cocktail:', error);

    if (error.response && error.response.status === 429) {
        retryCount = await handleRateLimit(retryCount);
    } else if (error.code === 'ECONNABORTED' || !error.response) {
        // Handle timeout or network errors
        console.warn('Network error or request timeout. Retrying...');
        retryCount = await handleRateLimit(retryCount);
    } else {
        // Rethrow the error if it's not a 429 error, timeout, or network error
        throw error;
    }

    return retryCount;
};

const handleRateLimit = async (retryCount: number = 0) => {
    if (retryCount >= MAX_RETRIES) {
        console.error('Max retries reached. Unable to make the request.');
        throw new Error('Max retries reached.');
    }

    console.warn(`Received 429 error. Retrying in ${RETRY_DELAI / 1000} seconds (Retry ${retryCount + 1}/${MAX_RETRIES})...`);

    await sleep(RETRY_DELAI);

    // Retry the request
    return retryCount + 1;
};

const fetchCocktail = async (fetchFunction: () => Promise<ApiCocktailResponse>, processResult: (input: { drinks: string | any[] }) => any): Promise<ApiCocktailResponse | any> => {
    let retryCount = 0;
    while (true) {
        try {
            const result = await fetchFunction();

            // Check if result is null or undefined
            if (!result) {
                console.warn('Invalid or empty response:', result);
                throw new Error('Invalid or empty response from the server');
            }

            return processResult(result);
        } catch (error: any) {
            retryCount = await handleRequestError(error, retryCount);
        }
    }
};

export const getRandomCocktailObject = async (): Promise<ApiCocktailResponse | any> => {
    try {
        const cocktailService = new CocktailService();
        return await fetchCocktail(() => cocktailService.getRandomCocktail(), getInfosFromCocktail);
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getCocktailInfoById = async (id: string): Promise<ApiCocktailResponse | any> => {
    try {
        const cocktailService = new CocktailService();
        return await fetchCocktail(() => cocktailService.getCocktailById(id), getInfosFromCocktail);
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getCocktailDetailsById = async (id: string): Promise<any> => {
    try {
        const cocktailService = new CocktailService();
        return await fetchCocktail(() => cocktailService.getCocktailById(id), getDetailsFromCocktail);
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getRandomCocktailDetails = async (): Promise<any> => {
    try {
        const cocktailService = new CocktailService();
        return await fetchCocktail(() => cocktailService.getRandomCocktail(), getDetailsFromCocktail);
    } catch (err) {
        console.error(err);
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
