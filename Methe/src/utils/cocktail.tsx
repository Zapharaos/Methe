import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {CocktailDbImageSize} from "@/src/utils/enums/Cocktail";
import {BASE_URL, MAX_RETRIES, RETRY_DELAI, URL_SEPARATOR} from "@/src/constants/config";
import {MathUtils, sleep, StringUtils} from "@/src/utils/utils";

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

type Fraction = {
    numerator: number;
    denominator: number;
};

/**
 * Extract the measure if it represent a fraction (number/number)
 * @param measure the measure to extract
 * @param units the units to add
 */
const extractFactionMeasure = (measure: string, units: number) => {
    let result: string = '';
    const pattern = /^(\d+)\/(\d+)$/; // Regular expression to capture "number/number" format and extract numbers
    let match = measure.match(pattern);

    if (match) {
        const fraction: Fraction = {
            numerator: parseInt(match[1], 10) * units,
            denominator: parseInt(match[2], 10)
        };
        const divisor = MathUtils.gcd(fraction.numerator, fraction.denominator);

        if (fraction.denominator === divisor) {
            result = fraction.numerator.toString();
        }
        else
        {
            fraction.numerator /= divisor;
            fraction.denominator /= divisor;
            result = `${fraction.numerator}/${fraction.denominator}`
        }
    }

    return result;
}

/**
 * Extract the measure if it represent a range value (number - number)
 * @param measure the measure to extract
 * @param units the units to add
 */
const extractRangeMeasure = (measure: string, units: number) =>{
    let result = '';
    const patternSeparator = /^(\d+)-(\d+)$/;
    const match = measure.match(patternSeparator);

    if(match){
        const firstNumber: number = parseInt(match[1], 10) * units;
        const secondNumber: number = parseInt(match[2], 10) * units;

        result =`${firstNumber}-${secondNumber}`;
    }

    return result;
}

/**
 * Extract the number from the measure if it exist
 * @param measure the measure to extract
 * @param units the units to add
 * @param setMeasure if the measure must be set if it isn't a number
 */
const extractNumberMeasure = (measure: string, units: number, setMeasure: boolean) =>{
    let result = '';
    const patternNumber = /^(\d+)$/;
    let match = measure.match(patternNumber);

    if(match){
        result = (parseFloat(measure) * units).toString();
    }
    else{
        result = setMeasure ? `${units} ${measure}` : '';
    }

    return result;
}

/**
 * Modify the ingredient measure to add the units
 * @param ingredientMeasure the measure from the API data
 * @param units the units selected by the user
 */
export const getIngredientMeasure = (ingredientMeasure : string[], units: number) => {
    let result;
    let startCounter = 0;
    const size: number = ingredientMeasure.length;

    if(size == 0){
        result = units.toString();
    }
    else if(size == 1) {
        result = extractNumberMeasure(ingredientMeasure[startCounter], units, true);
    }
    else if(size > 1) {
        result = extractFactionMeasure(ingredientMeasure[startCounter], units);

        if(StringUtils.isNullOrWhitespace(result)){
            result = extractRangeMeasure(ingredientMeasure[startCounter], units);
        }

        if(StringUtils.isNullOrWhitespace(result)){
            result = extractFactionMeasure(ingredientMeasure[++startCounter], units);
        }

        if(StringUtils.isNullOrWhitespace(result)){
            result = extractNumberMeasure(ingredientMeasure[0], units, false);

            if(StringUtils.isNullOrWhitespace(result)){
                startCounter--;
                result = units.toString();
            }
        }
        else {
            startCounter++;
        }

        for (let counter = startCounter; counter < size; counter++) {
            result = result.concat(` ${ingredientMeasure[counter]}`)
        }
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
