import { ajax } from 'rxjs/ajax';
import { StringUtils } from "@/src/utils/utils";
import { CocktailDbImageSize } from "@/src/utils/enums/Cocktail";

/**
 * Service class to get cocktails by the API
 */
class CocktailService {

    /**
     * The base URL use to call the cocktailAPI
     * @private
     */
    private readonly baseAPIUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/';

    /**
     * The base URL use to get an image from the cocktailAPI
     * @private
     */
    private readonly baseImageAPIUrl: string = 'https://www.thecocktaildb.com/images/ingredients/{0}{1}.png';

    /**
     * In the cocktailAPI, there are only 15 ingredient maximum
     */
    public static readonly maxNumberOfIngredient: number = 15;

    /**
     * constructor to instantiate the class
     */
    constructor() {}

    /**
     * Get a random cocktail
     */
    getRandomCocktail = () => {
        const url = `${this.baseAPIUrl}random.php`;
        return ajax.getJSON(url);
    }

    /**
     * Get a cocktail by his identifier
     * @param cocktailId : string the cocktail identifier
     */
    getCocktailById = (cocktailId : string) => {
        const url = `${this.baseAPIUrl}lookup.php?i=${cocktailId}`;
        return ajax.getJSON(url);
    }

    /**
     * Return the source to get an ingredient image
     * @param ingredientName the name of the ingredient
     * @param imageSize the size of the image
     */
    getImageByIngredientName = (ingredientName : string, imageSize : CocktailDbImageSize) => {
        return StringUtils.format(this.baseImageAPIUrl, ingredientName, imageSize);
    }

    /**
     * Return all cocktail which start with the letter in param
     * @param letter the letter use to find the cocktail
     */
    getCocktailByFirstLetter = (letter : string) => {
        const url = `${this.baseAPIUrl}search.php?f=${letter}`;
        return ajax.getJSON(url);
    }

    /**
     * Return all cocktail which the name match
     * @param name the name use to find cocktails
     */
    getCocktailByName = (name : string) => {
        const url = `${this.baseAPIUrl}search.php?s=${name}`;
        return ajax.getJSON(url);
    }

    /**
     * Return all cocktail which the ingredient name match
     * @param name the name use to find cocktails
     */
    getCocktailByIngredientName = (name : string) => {
        const url = `${this.baseAPIUrl}filter.php?i=${name}`;
        return ajax.getJSON(url);
    }
}

export default CocktailService;