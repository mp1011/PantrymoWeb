export class StateHandler 
{
    updateUrl(data)
    {
        let ingredients = data.ingredients ?? this.getIngredientsFromHash() ?? [];
        let cuisines = data.cuisines ?? this.getCuisinesFromHash() ?? [];
        let traits = data.traits ?? this.getTraitsFromHash() ?? [];

        let ingredientList = ingredients.join();
        let cuisineList = cuisines.join();
        let traitsList = traits.join();

        let newHash="";

        if(ingredients.length > 0 && cuisines.length > 0 && traits.length > 0)
        {
            newHash = `ingredients=${ingredientList}&cuisines=${cuisineList}&traits=${traitsList}`;       
            document.title = `Pantrymo - ${ingredientList} - ${traitsList}`;
        }
        else if(ingredients.length > 0 && cuisines.length > 0)
        {
            newHash = `ingredients=${ingredientList}&cuisines=${cuisineList}`;       
            document.title = `Pantrymo - ${ingredientList}`;
        }
        else if(ingredients.length > 0 && traits.length > 0)
        {
            newHash = `ingredients=${ingredientList}&traits=${traitsList}`;       
            document.title = `Pantrymo - ${ingredientList} - ${traitsList}`;
        }
        else if(ingredients.length > 0)
        {
            newHash = `ingredients=${ingredientList}`;    
            document.title = `Pantrymo - ${ingredientList}`;
        }
        else if(cuisines.length > 0)
        {
            newHash = `cuisines=${cuisineList}`;
            document.title = "Pantrymo";
        }
        else 
        {
            newHash = "";          
            document.title = "Pantrymo";
        }

        if(window.location.hash.substring(1) != newHash)
        {
            console.log("Pushing state: " + newHash);
            history.pushState(data, "", `${window.location.pathname}#${newHash}`);
        }

        return globalThis.window.location.href;
    }

    getInitialState()
    {
        let ingredients = this.getIngredientsFromHash() ?? this.getIngredientsFromSession() ?? [];
        let selectedCuisines = this.getCuisinesFromHash() ?? this.getCuisinesFromSession() ?? [];
        let selectedTraits = this.getTraitsFromHash() ?? this.getTraitsFromSession() ?? [];

        if(selectedCuisines.length == 0)
            selectedCuisines = this.getCuisinesFromCookie();

        this.updateUrl({ cuisines: selectedCuisines, ingredients: ingredients, traits: selectedTraits });

        let state = { selectedCuisines: selectedCuisines, selectedIngredients: ingredients};

        return state;
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

    geTraitsFromSession()
    {
        let traits = window.sessionStorage.getItem('traits');
        if(traits && traits.length > 0)
        {
            return traits
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

    onFilterTraitsChanged(traits)
    {
        this.updateUrl({ traits: traits });
        window.sessionStorage.setItem('traits', traits);
    }

    onCuisineToggled(cuisine)
    {
        var cuisines = this.getCuisinesFromHash() ?? [];
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
            return null;

        try
        {
            let result = window.location.hash.substring(1)
                        .split('&')
                        .find(c=>c.split('=')[0] == 'ingredients')
                        .split('=')[1]
                        .split(',')
                        .map(c=> decodeURIComponent(c))
                        .filter(c=>c.length>0);
            if(result.length > 0)
                return result;
            else 
                return null;
        }
        catch 
        {
            return null;
        }
    }

    getCuisinesFromHash()
    {
        if(!window.location.hash)
            return null;

        try
        {
            let result = window.location.hash.substring(1)
                        .split('&')
                        .find(c=>c.split('=')[0] == 'cuisines')
                        .split('=')[1]
                        .split(',')
                        .map(c=> decodeURIComponent(c))
                        .filter(c=>c.length>0);
            if(result.length > 0)
                return result;
            else 
                return null;
        }
        catch 
        {
            return null;
        }
    }

    getTraitsFromHash()
    {
        if(!window.location.hash)
            return null;

        try
        {
            let result = window.location.hash.substring(1)
                        .split('&')
                        .find(c=>c.split('=')[0] == 'traits')
                        .split('=')[1]
                        .split(',')
                        .map(c=> decodeURIComponent(c))
                        .filter(c=>c.length>0);
            if(result.length > 0)
                return result;
            else 
                return null;
        }
        catch 
        {
            return null;
        }
    }
}