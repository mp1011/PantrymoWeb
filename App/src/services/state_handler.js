export class StateHandler 
{
    updateUrl(data)
    {
        let ingredientList = data.ingredients ? data.ingredients.join() : this.getIngredientsFromHash();
        let cuisineList = data.cuisines ? data.cuisines.join() : this.getCuisinesFromHash();

        let hash = `ingredients=${ingredientList}&cuisines=${cuisineList}`;

        globalThis.window.location.hash = hash;       
    }

    getInitialState()
    {
        let ingredients = this.getIngredientsFromSession() ?? this.getIngredientsFromHash();
        let selectedCuisines = this.getCuisinesFromSession() ?? this.getCuisinesFromHash();
        if(selectedCuisines.length == 0)
            selectedCuisines = this.getCuisinesFromCookie();

        this.updateUrl({ cuisines: selectedCuisines, ingredients: ingredients });
        return { selectedCuisines: selectedCuisines, selectedIngredients: ingredients};
    }

    getIngredientsFromSession()
    {
        let ingredients = window.sessionStorage.getItem('ingredients');
        if(ingredients && ingredients.length > 0)
        {
            return ingredients
                .split(',')
                .filter(c=>c.length>0);
        }

        return null;
    }

    getCuisinesFromSession()
    {
        let cuisines = window.sessionStorage.getItem('cuisines');
        if(cuisines && cuisines.length > 0)
        {
            return cuisines
                .split(',')
                .filter(c=>c.length>0);
        }

        return null;
    }


    updateCookie(cuisines)
    {
        var selectedCuisines = cuisines.join(",");

        document.cookie = `cuisines=${selectedCuisines}`;
    }

    getCuisinesFromCookie()
    {
        var cookie = document.cookie
            .split(';')
            .map(c=>c.split('='))
            .filter(c=>c[0].trim() == 'cuisines');

        if(cookie.length == 1 && cookie[0].length == 2)
        {
            return cookie[0][1]
                .split(',')
                .filter(c=>c.length>0);
        }
        else 
            return [];
    }

    onIngredientsChanged(ingredients)
    {
        this.updateUrl({ ingredients: ingredients });
        window.sessionStorage.setItem('ingredients', ingredients);
    }

    

    onCuisineToggled(cuisine)
    {
        var cuisines = this.getCuisinesFromHash();
        if(cuisine.selected && !cuisines.includes(cuisine.name))
        {
            cuisines.push(cuisine.name);
        }
        else if(!cuisine.selected && cuisines.includes(cuisine.name))
        {
            cuisines.splice(cuisines.indexOf(cuisine.name),1);
        }
         
        this.updateUrl({cuisines: cuisines});
        window.sessionStorage.setItem('cuisines', cuisines);
        this.updateCookie(cuisines);
    }

    getIngredientsFromHash()
    {
        if(!window.location.hash)
            return [];

        try
        {
            return window.location.hash
                        .split('&')[0]
                        .split('=')[1]
                        .split(',')
                        .map(c=> decodeURIComponent(c))
                        .filter(c=>c.length>0);
        }
        catch 
        {
            return [];
        }
    }

    getCuisinesFromHash()
    {
        if(!window.location.hash)
            return [];

        try
        {
            return window.location.hash
                        .split('&')[1]
                        .split('=')[1]
                        .split(',')
                        .map(c=> decodeURIComponent(c))
                        .filter(c=>c.length>0);
        }
        catch 
        {
            return [];
        }
    }
}