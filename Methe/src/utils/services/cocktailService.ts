import axios from 'axios';

import { StringUtils } from "@/src/utils/utils";
import {CocktailDbImageSize, CocktailInformationList} from "@/src/utils/enums/Cocktail";

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
     * The base URL use to get list of information from the cocktailAPI
     * @private
     */
    private readonly baseListAPIUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?{0}=list';

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
    getRandomCocktail = async () => {
        const url = `${this.baseAPIUrl}random.php`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error fetching random cocktail:', error);
            throw error;
        }
    }

    /**
     * Get a cocktail by his identifier
     * @param cocktailId : string the cocktail identifier
     */
    getCocktailById = async (cocktailId : string) => {
        const url = `${this.baseAPIUrl}lookup.php?i=${cocktailId}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching cocktail with id ${cocktailId}:`, error);
            throw error;
        }
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
    getCocktailByFirstLetter = async (letter : string) => {
        const url = `${this.baseAPIUrl}search.php?f=${letter}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching cocktails with letter ${letter}:`, error);
            throw error;
        }
    }

    /**
     * Return all cocktail which the name match
     * @param name the name use to find cocktails
     */
    getCocktailByName = async (name : string) => {
        const url = `${this.baseAPIUrl}search.php?s=${name}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching cocktails with name ${name}:`, error);
            throw error;
        }
    }

    /**
     * Return all cocktail which the ingredient name match
     * @param name the name use to find cocktails
     */
    getCocktailByIngredientName = async (name : string) => {
        const url = `${this.baseAPIUrl}filter.php?i=${name}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching cocktails with ingredient name ${name}:`, error);
            throw error;
        }
    }

    /**
     * Return all categories from cocktail API
     */
    getCategoriesList = async () => {
        const url = StringUtils.format(this.baseListAPIUrl, CocktailInformationList.Categories);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching categories:`, error);
            throw error;
        }
    }

    /**
     * Return all glasses type from cocktail API
     */
    getGlassList = async () => {
        const url = StringUtils.format(this.baseListAPIUrl, CocktailInformationList.Glass);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching glasses:`, error);
            throw error;
        }
    }

    /**
     * Return all ingredients from cocktail API
     */
    getIngredientList = async () => {
        const url = StringUtils.format(this.baseListAPIUrl, CocktailInformationList.Ingredient);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching ingredients:`, error);
            throw error;
        }
    }

    /**
     * Return all alcoholic type from cocktail API
     */
    getAlcoholicList = async () => {
        const url = StringUtils.format(this.baseListAPIUrl, CocktailInformationList.Alcoholic);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle error
            console.error(`Error fetching alcoholic:`, error);
            throw error;
        }
    }
}

export default CocktailService;