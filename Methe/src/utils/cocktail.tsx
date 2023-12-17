import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";
import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {CocktailDbImageSize} from "@/src/utils/enums/Cocktail";
import {BASE_URL, URL_SEPARATOR} from "@/src/constants/config";
import {MathUtils, StringUtils} from "@/src/utils/utils";
import {CocktailAPI} from "@/src/utils/interface/CocktailAPIInterface";

/**
 * Return type of the Api call
 */
export interface ApiCocktailResponse {
    drinks: []
}

const getRandomCocktailData = async (): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getRandomCocktail().pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};

const getCocktailDataById = async (id: string): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getCocktailById(id).pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Call the API to get a random cocktail and store information into a CocktailDetail class
 */
export const getRandomCocktailObject = async (): Promise<ApiCocktailResponse | any> => {
    try {
        const result = await getRandomCocktailData();
        return getDetailsFromDrinks(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getCocktailInfoById = async (id: string): Promise<ApiCocktailResponse | any> => {
    try {
        const result = await getCocktailDataById(id);
        return getDetailsFromDrinks(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getCocktailDetailsById = async (id: string): Promise<any> => {
    try {
        const result = await getCocktailDataById(id);
        return getDetailsFromDrinks(result);
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getRandomCocktailDetails = async (): Promise<any> => {
    try {
        const result = await getRandomCocktailData();
        return getDetailsFromDrinks(result);
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

type Fraction = {
    numerator: number;
    denominator: number;
};

/**
 * Extract the measure if it represents a fraction (number/number)
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
 * Extract the measure if it represents a range value (number - number)
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
 * Extract the number from the measure if it exists
 * @param measure the measure to extract
 * @param units the units to add
 * @param setMeasure if the measure must be set if it isn't a number
 */
const extractNumberMeasure = (measure: string, units: number, setMeasure: boolean) =>{
    let result;
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

/**
 * Store information from a drinks list with only one object inside
 * @param input a object with a drinks list attributes
 */
export const getDetailsFromDrinks = (input: { drinks: string | any[]; }) => {
    // Check if 'drinks' array exists and has at least one item
    if (!input || !input.drinks || input.drinks.length <= 0) {
        console.warn('Invalid or empty response:', input);
        // Return null or handle the situation as appropriate
        return null;
    }

    return getDetailsFromCocktail(input.drinks[0]);
}

/**
 * Store information from a cocktail API object
 * @param input a object like the API return object
 */
export const getDetailsFromCocktail = (input: CocktailAPI) =>{
    const cocktail: CocktailDetail = {
        cocktailId: input.idDrink,
        cocktailName: input.strDrink,
        cocktailImage: input.strDrinkThumb,
        strAlcoholic: input.strAlcoholic,
        strCategory: input.strCategory,
        strGlass: input.strGlass,
        strIBA: input.strIBA,
        strInstructions: input.strInstructions,
        ingredientList: [],
        instructionsByLanguageList: [],
    }

    const cocktailService : CocktailService = new CocktailService();

    let hasOtherIngredient : boolean = true;
    const size : number = CocktailService.maxNumberOfIngredient;
    for(let counter: number = 1; hasOtherIngredient && counter <= size; counter++){

        const ingredient: string = (input as any)[`strIngredient${counter}`];
        const measure: string = (input as any)[`strMeasure${counter}`];

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

/**
 * Get all categories
 */
export const getCategoriesListData = async (): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getCategoriesList().pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Get all ingredient
 */
export const getIngredientListData = async (): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getIngredientList().pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Get all glass type
 */
export const getGlassListData = async (): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getGlassList().pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Get all alcoholic type
 */
export const getAlcoholicListData = async (): Promise<ApiCocktailResponse | any> => {
    const cocktailService : CocktailService = new CocktailService();
    try {
        return await lastValueFrom(cocktailService.getAlcoholicList().pipe(take(1)));
    } catch (err) {
        console.error(err);
    }
};