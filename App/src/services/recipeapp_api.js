import {settings} from '/src/app_settings.mjs'

export class RecipeAppApi
{
    constructor(httpUtility)
    {
        this.httpUtility = httpUtility;
        this.pageSize=settings.pageSize;
    }

    recipeSearch(query, selectedCuisines, page)
    {  
        const from = (page-1) * this.pageSize;
        const to = (page * this.pageSize)-1;   
           
        const cuisineCSV = selectedCuisines.map(c=> c.name).join(",");
        
        return this.httpUtility.getJson(`https://${settings.host}/api/Recipe/Find?ingredients=${query}&cuisines=${cuisineCSV}&from=${from}&to=${to}`, this.validateRecipeSearch)
            .catch(this.showErrorInConsole)
            .then(r=> { return { page: page, recipes: r, loaded:true }});
    }

    ingredientSearch(query)
    {
        return this.httpUtility.getJson(`https://${settings.host}/api/Ingredient/Suggest?text=${query}`, this.validateIngredientSearch)
            .catch(this.showErrorInConsole);

    }

    validateIngredientSearch(result)
    {
        return result && result.length > 0;
    }

    validateRecipeSearch(result)
    {
        return result && result.length > 0;
    }

    getCuisineNames()
    {
        return this.httpUtility.getJson(`https://${settings.host}/api/Cuisines`)
            .catch(this.showErrorInConsole);

    }

    //shows error in console, however caller is responsible for doing something about it
    showErrorInConsole(e)
    {
        console.log(e);
        throw e;
    }
}