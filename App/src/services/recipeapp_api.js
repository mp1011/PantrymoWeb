import {settings} from '/src/app_settings.mjs'

export class RecipeAppApi
{
    constructor(httpUtility)
    {
        this.httpUtility = httpUtility;
        this.pageSize=settings.pageSize;
    }

    getCuisinesByIngredients(ingredients, selectedCuisines)
    {
        var ingredientsCSV = ingredients.join(",");
        var selectedCuisinesCSV = (selectedCuisines??"").join(",");
        return this.httpUtility.getJson(`https://${settings.host}/api/Cuisines/ByIngredients?ingredients=${ingredientsCSV}&selectedCuisines=${selectedCuisinesCSV}`, this.validResult)
            .catch(this.showErrorInConsole);
    }

    rankIngredientsByCuisine(cuisine)
    {
        return this.httpUtility.getJson(`https://${settings.host}/api/Ingredient/RankForCuisine?cuisineName=${cuisine}`, ()=>true)
            .catch(this.showErrorInConsole);
    }

    suggestPairings(ingredients, selectedCuisines)
    {
        var ingredientsCSV = ingredients.join(",");
        var selectedCuisinesCSV = (selectedCuisines??"").join(",");
        return this.httpUtility.getJson(`https://${settings.host}/api/Ingredient/Pairings?ingredients=${ingredientsCSV}&cuisines=${selectedCuisinesCSV}`, this.validResult)
            .catch(this.showErrorInConsole);
    }

    recipeSearch(query, selectedCuisines, traitFilters, matchMinimum, page)
    {  
        const from = (page-1) * this.pageSize;
        const to = (page * this.pageSize)-1;   
           
        const cuisineCSV = selectedCuisines.map(c=> c.name).join(",");
        const traitFiltersCSV = traitFilters.join(",");

        return this.httpUtility.getJson(`https://${settings.host}/api/Recipe/Find?ingredients=${query}&cuisines=${cuisineCSV}&traits=${traitFiltersCSV}&matchMinimum=${matchMinimum}&from=${from}&to=${to}`, this.validResult)
            .catch(this.showErrorInConsole)
            .then(r=> { return { page: page, recipes: r, loaded:true }});
    }

    recipeTraitCounts(query, selectedCuisines,traitFilters)
    {
        const cuisineCSV = selectedCuisines.map(c=> c.name).join(",");
        const traitsCSV = traitFilters.join(",");

        return this.httpUtility.getJson(`https://${settings.host}/api/Recipe/TraitCounts?ingredients=${query}&cuisines=${cuisineCSV}&traits=${traitsCSV}`, this.validResult)
            .catch(this.showErrorInConsole);
    }

    ingredientSearch(query)
    {
        return this.httpUtility.getJson(`https://${settings.host}/api/Ingredient/Suggest?text=${query}`, this.validResult)
            .catch(this.showErrorInConsole);

    }

    validResult(result)
    {
        return result && result.length > 0;
    }

    getCuisineNames()
    {
        return this.httpUtility.getJson(`https://${settings.host}/api/Cuisines`)
            .catch(this.showErrorInConsole);

    }

    getBadImageUrl()
    {
        return `https://${settings.host}/images/sitedefaults/Default.png`;
    }

    //shows error in console, however caller is responsible for doing something about it
    showErrorInConsole(e)
    {
        console.log(e);
        throw e;
    }
}