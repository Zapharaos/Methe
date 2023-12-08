import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";
import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {CocktailDbImageSize} from "@/src/utils/enums/Cocktail";
import {BASE_URL, URL_SEPARATOR} from "@/src/constants/config";

/**
 * Return type of the Api call
 */
interface ApiCocktailResponse {
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

export const getRandomCocktailObject = async (): Promise<ApiCocktailResponse | any> => {
    try {
        const result = await getRandomCocktailData();

        const cocktail: Cocktail = {
            cocktailId: result.drinks[0].idDrink,
            cocktailName: result.drinks[0].strDrink,
            cocktailImage: result.drinks[0].strDrinkThumb,
        };

        return cocktail;
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export const getCocktailDetailsById = async (id: string): Promise<any> => {
    try {
        const result = await getCocktailDataById(id);

        const cocktail: CocktailDetail = {
            cocktailId: result.drinks[0].idDrink,
            cocktailName: result.drinks[0].strDrink,
            cocktailImage: result.drinks[0].strDrinkThumb,
            strAlcoholic: result.drinks[0].strAlcoholic,
            strCategory: result.drinks[0].strCategory,
            strGlass: result.drinks[0].strGlass,
            strIBA: result.drinks[0].strIBA,
            strInstructions: result.drinks[0].strInstructions,
            ingredientList: [],
            instructionsByLanguageList: [],
        }

        const cocktailService : CocktailService = new CocktailService();

        let hasOtherIngredient : boolean = true;
        const size : number = CocktailService.maxNumberOfIngredient;
        for(let counter: number = 1; hasOtherIngredient && counter <= size; counter++){

            const ingredient: string = result.drinks[0][`strIngredient${counter}`];
            const measure: string = result.drinks[0][`strMeasure${counter}`];

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
    } catch (err) {
        console.error(err);
        // Handle the error or return a default value if needed
        return null;
    }
};

export function extractUrlFromCocktail (cocktail: Cocktail | CocktailDetail) {
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