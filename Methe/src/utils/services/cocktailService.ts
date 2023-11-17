import { ajax } from 'rxjs/ajax';

/**
 * Service class to get cocktails by the API
 */
class CocktailService {

    private readonly baseAPIUrl: string;

    /**
     * constructor to instantiate the class
     */
    constructor() {
        this.baseAPIUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
    }

    getRandomCocktails = () => {
        const url = `${this.baseAPIUrl}random.php`;
        const headers = {};
        return ajax.getJSON(url);
    }
}

export default CocktailService;