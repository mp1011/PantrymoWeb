/* eslint-disable react/react-in-jsx-scope */
import {RecipeAppApi} from '/src/services/recipeapp_api.js'
import {CuisinePicker} from '/src/jsx/components/cuisine_picker.js'
import {IngredientInputBox} from '/src/jsx/components/ingredient_input_box.js'
import {BackToTopPanel} from '/src/jsx/components/back_to_top_panel.js'
import {SelectedIngredientsPanel} from '/src/jsx/components/selected_ingredients_panel.js'
import {RecipesList} from '/src/jsx/components/recipes_list.js'
import {StateHandler} from '/src/services/state_handler.js'
import {getRecipeScore} from '/src/services/recipe_scoring_service.js'
import {settings} from '/src/app_settings.mjs'
import {PairingSuggestionsPanel} from '/src/jsx/components/pairing_suggestions.js'

// eslint-disable-next-line no-undef
export class RecipeApp extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.onIngredientAdded = this.onIngredientAdded.bind(this);
      this.onIngredientRemoved = this.onIngredientRemoved.bind(this);
      this.updateRecipes = this.updateRecipes.bind(this);
      this.onCuisineToggled = this.onCuisineToggled.bind(this);
      this.addFetchedPage = this.addFetchedPage.bind(this);
      this.addRecipes = this.addRecipes.bind(this);
      this.fetchMore = this.fetchMore.bind(this);
      this.onScroll = this.onScroll.bind(this);
      this.setInitialState = this.setInitialState.bind(this);
      this.applyScores = this.applyScores.bind(this);
      this.handleError = this.handleError.bind(this);
      this.prepareSite = this.prepareSite.bind(this);
      this.getIndexOfFirstRecipeBelowWindow = this.getIndexOfFirstRecipeBelowWindow.bind(this);
      this.sortRecipesBelowWindow = this.sortRecipesBelowWindow.bind(this);
      this.scrollToFirstResultIfNeeded = this .scrollToFirstResultIfNeeded.bind(this);
      this.insertAds = this.insertAds.bind(this);
      this.updateCuisines = this.updateCuisines.bind(this);
      this.onSuggestedIngredientSelected = this.onSuggestedIngredientSelected.bind(this);
      this.suggestPairings = this.suggestPairings.bind(this);

      var httpUtility = props.httpUtility;
      var stateHandler = new StateHandler();
      var recipeAppApi = new RecipeAppApi(httpUtility);

      this.state = {
                      selectedIngredients: [], 
                      cuisines: [],
                      recipePages: [],
                      recipes: [],
                      httpUtility: httpUtility,
                      recipeAppApi: recipeAppApi,
                      stateHandler: stateHandler,
                      debug: settings.debugMode,
                      suggestedPairings: []
                   };
    }

    handleError(e)
    {
        //temporary
        alert("ERROR! " + e);
    }

    onIngredientAdded(ingredient) 
    {
      var ingredients = this.state.selectedIngredients;
      if(ingredients.includes(ingredient))
        return;
        
      ingredients.push(ingredient);

      this.updateCuisines(ingredients);
      this.updateRecipes(ingredients, true);
    }

    suggestPairings()
    {
      
      let selectedCuisines = this.state.cuisines
        .filter(c=>c.selected)
        .map(c=>c.name);

        this.state.recipeAppApi.suggestPairings(this.state.selectedIngredients, selectedCuisines)
        .then(pairings=> {
          this.setState({suggestedPairings: pairings});
        })
    }

    
    onSuggestedIngredientSelected(ingredient)
    {
        this.onIngredientAdded(ingredient);
    }


    updateCuisines(ingredients)
    {  
      let selectedCuisines = this.state.cuisines
        .filter(c=>c.selected)
        .map(c=>c.name);

      this.state.recipeAppApi.getCuisinesByIngredients(ingredients, selectedCuisines)
        .then(rankedCuisines => {
            this.setState({rankedCuisines: rankedCuisines});
        });
    }

    updateRecipes(ingredients, autoScroll)
    {
        this.setState( {suggestedPairings: [] });

        const selectedCuisines = this.state.cuisines.filter(c=>c.selected);
        this.state.stateHandler.onIngredientsChanged(ingredients);

        if(ingredients.length == 0)
        {
          this.setState({recipes: [], recipePages: [], selectedIngredients: [], loadingRecipes: false, autoScroll: false});
          return;
        }

        this.setState({ loadingRecipes: true, autoScroll: autoScroll });
        this.setState({recipes: [], recipePages: [], selectedIngredients: ingredients});
        
        this.suggestPairings();     

        this.state.recipeAppApi
              .recipeSearch(ingredients, selectedCuisines, 1)
              .catch(this.handleError)
              .then(this.applyScores)
              .then(this.addFetchedPage);
    }

    addFetchedPage(recipeResult)
    {
        console.log(`Found ${recipeResult.recipes.length} recipes on page ${recipeResult.page} of results`);
        var pages = this.state.recipePages;

        const page = pages.filter(p=>p.page == recipeResult.page);
        if(page.length == 1)
        {
            page[0].loaded=true;
            page[0].recipes = recipeResult.recipes
        }
        else 
            pages.push(recipeResult);

        this.addRecipes(recipeResult.recipes);
    }

    applyScores(result)
    {
        result.recipes.forEach(r=>{
          r.score = getRecipeScore(r);
        })

        result.recipes = result.recipes.sort((a,b)=> b.score - a.score);

        return result;
    }

    addRecipes(unfilteredRecipes)
    {
      var filteredRecipes = unfilteredRecipes.filter(r=>r.score >= 0);
      var pages = this.state.recipePages;

      if(filteredRecipes.length > 0)
      {
        console.log(`Filtered to ${filteredRecipes.length} recipes`);        
      }
      else if(unfilteredRecipes.length == 0)
      {
        console.log("No more recipes, adding remainder");
        filteredRecipes = [];
        pages.forEach(p=>{
          filteredRecipes = filteredRecipes.concat(p.recipes.filter(r=>r.score < 0));
        });

        filteredRecipes = filteredRecipes.sort((a,b)=>b.score-a.score);      
        this.setState({ loadingRecipes: false });
      }
      else 
      {
          console.log("Did not find any valid recipes on page, fetching next page");
          this.fetchMore();
          return;
      }
       
      var recipesToDisplay = this.state.recipes
          .concat(filteredRecipes)
          .groupBy(rec => rec.key)
          .getValues()
          .map(g=> g[0]);

      recipesToDisplay = this.sortRecipesBelowWindow(recipesToDisplay);
      recipesToDisplay = this.insertAds(recipesToDisplay);

      this.setState( { recipePages: pages, recipes: recipesToDisplay });


      if(unfilteredRecipes.length > 0 && filteredRecipes.length < 5)
        this.fetchMore();
    }

    fetchMore()
    {
      if(this.state.selectedIngredients.length == 0)
        return;

      var pages = this.state.recipePages;

      if(pages.filter(p=>!p.loaded).length > 0)
        return;

      //if any negative scored recipes are being shown, we've already fetched as much as we can
      if(this.state.recipes.filter(p=>p.score < 0).length > 0)
        return;

      var nextPage=1;
      if(pages && pages.length >=1)
      {
        var pageNumbers = pages.map(p=>p.page);
        nextPage = pageNumbers[pageNumbers.length-1] + 1;
      }

      console.log(`Fetching page ${nextPage} of recipes`);

      pages.push({page: nextPage, loaded: false, recipes:[]});

      this.setState({recipePages: pages, loadingRecipes: true });

      const selectedCuisines = this.state.cuisines.filter(c=>c.selected);

      this.state.recipeAppApi
        .recipeSearch(this.state.selectedIngredients, selectedCuisines, nextPage)
        .catch(this.handleError)
        .then(this.applyScores)
        .then(this.addFetchedPage);
      
    }

    onIngredientRemoved(ingredient)
    {
        var ingredients = this.state.selectedIngredients.filter(ing=> ing != ingredient);
        this.updateRecipes(ingredients,true);    
        this.updateCuisines(ingredients);
    }

    onCuisineToggled(cuisine)
    {
        let allLoadedRecipes = [];
        this.setState({ recipes: [] });
        this.state.recipePages.forEach(pg=> allLoadedRecipes = allLoadedRecipes.concat(pg.recipes));
           
        this.state.stateHandler.onCuisineToggled(cuisine);
        this.updateRecipes(this.state.selectedIngredients, false);
    }

    scrollToFirstResultIfNeeded()
    {
        let recipePanel = document.getElementById("recipeListContainer");
        let recipePanelScreenTop = recipePanel.getBoundingClientRect().top;

        if(recipePanelScreenTop > document.documentElement.clientHeight * 0.9)
        {
          let ingredientPicker = document.getElementById("ingredientPickerContainer");
          let screenTop = ingredientPicker.getBoundingClientRect().top;
          
          let actualTop = screenTop + document.documentElement.scrollTop;
          window.scrollTo(0,actualTop);
        }
        
    }

    componentDidUpdate()
    {
      if(this.state.autoScroll && this.state.recipes.length > 0)
          this.scrollToFirstResultIfNeeded();
    }

    componentDidMount() 
    {    
        this.prepareSite();

        window.onpopstate = () => this.setInitialState();
        window.addEventListener('scroll', this.onScroll);
    }

    prepareSite()
    {
      this.state.recipeAppApi.getCuisineNames()
      .catch(e=>{
        console.log(e);
      })
      .then(names => 
        {
          if(names && names.length > 0)
          {   
            let cuisines = names.map(n=>{ return { name: n, selected: false}});
            this.setState({ cuisines: cuisines, isSiteReady: true });
            this.setInitialState();
          }
          else 
          {
              this.setState({ cuisines: [], isSiteReady: false });
              setTimeout(this.prepareSite,1000);
          }
        });
    }

    componentWillUnmount() 
    {
        window.removeEventListener('scroll', this.onScroll);
    }

    setInitialState()
    {
        let initialState = this.state.stateHandler.getInitialState();

        let cuisines = this.state.cuisines;

        if(initialState.selectedCuisines.length > 0)
        {
            initialState.selectedCuisines.forEach(c=>{
              cuisines.find(p=>p.name == c).selected=true;
            });         
            
            this.setState({ cuisines: cuisines});
        }

        if(initialState.selectedIngredients.length > 0)
        {
            this.updateRecipes(initialState.selectedIngredients, false);
            this.updateCuisines(initialState.selectedIngredients);
        }
    }

    onScroll()
    {
        const totalHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + document.documentElement.clientHeight;
        const percent = scrollPosition / totalHeight;

        if(percent > 0.7)
          this.fetchMore();
    }

    sortRecipesBelowWindow(recipes)
    {
        let firstIndexToSort = this.getIndexOfFirstRecipeBelowWindow();
        if(firstIndexToSort < 0)
          return recipes;

        let recipesInOrAboveWindow = recipes.slice(0, firstIndexToSort);
        let recipesBelowWindow = recipes.slice(firstIndexToSort)
            .sort((a,b)=> b.score - a.score);

        let mergedRecipes = recipesInOrAboveWindow.concat(recipesBelowWindow);
        return mergedRecipes;
    }

    insertAds(recipes)
    {
        if(settings.adEvery <= 0)
          return recipes;
          
        let index = 0;
        while(index < recipes.length)
        {
            let shouldBeAd = ((index+1) % settings.adEvery) == 0;
            if(!shouldBeAd && recipes[index].isAdPlaceholder)
            {
                recipes.splice(index,1);
            }
            else if(shouldBeAd && !recipes[index].isAdPlaceholder)
            {
                recipes.splice(index,0, { isAdPlaceholder: true , key: "ad_" + index} )
            }
            else 
            {
                index++;
            }
        }

        return recipes;
    }

    getIndexOfFirstRecipeBelowWindow()
    {
        let index = 0;
        let foundResult=false;

        for (let element of document.getElementsByClassName("recipe")) 
        {
          if(!foundResult)
          {
              let top = element.getBoundingClientRect().top;
              if(top > window.innerHeight + 200)
                foundResult=true;
              else 
                index++;
          }
        }

        return index;
    }

    render() 
    {
        if(this.state.isSiteReady)
        {
          return (     
            <section>   

              <section className="whiteBox" id="ingredientPickerContainer">
                <SelectedIngredientsPanel selectedIngredients={this.state.selectedIngredients} onIngredientRemoved={this.onIngredientRemoved} />
                <IngredientInputBox onIngredientAdded={this.onIngredientAdded} recipeAppApi={this.state.recipeAppApi} selectedIngredients={this.state.selectedIngredients} />
                <PairingSuggestionsPanel suggestedPairings={this.state.suggestedPairings} onSuggestedIngredientSelected={this.onSuggestedIngredientSelected} />
              </section>           

              <CuisinePicker cuisines={this.state.cuisines} rankedCuisines={this.state.rankedCuisines} onCuisineToggled={this.onCuisineToggled} />         
                 
              <BackToTopPanel />
              <RecipesList loading={this.state.loadingRecipes} recipes={this.state.recipes} selectedIngredients={this.state.selectedIngredients} debug={this.state.debug} />
            </section>);
        }
        else 
        {
            return <p className="notReady">Getting ready...</p>
        }      
    }
}