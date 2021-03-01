import {RecipeApp} from '/src/jsx/components/recipe_app.js'
import {IngredientsPage} from '/src/jsx/components/ingredients_page.js'
import {ArticleViewer} from '/src/jsx/components/article_viewer.js'
import {settings} from '/src/app_settings.mjs'
import {CachedHttpUtility} from '/src/services/cached_http_utility.js'
import {HttpUtility} from '/src/services/http_utility.js'
const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const NavLink =  window.ReactRouterDOM.NavLink;
const Switch = window.ReactRouterDOM.Switch;

export class Shell extends React.Component 
{
    constructor(props) 
    {
      super(props);   

      this.state = {
            httpUtility: settings.enableCache ? new CachedHttpUtility() : new HttpUtility()
      };
      
    }

    handleError(e)
    {
        //temporary
        alert("ERROR! " + e);
    }

    render() 
    {
        return <Router>

            <section className="mainNav">
                <nav>
                    <ul>
                        <li>
                            <NavLink activeClassName='active' exact={true} to="/">Find Recipes</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' to="/articles">Cooking Guides</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' to="/ingredients">Ingredients by Cuisine</NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
       
          <Switch>
            <Route path="/articles">
                <ArticleViewer httpUtility={this.state.httpUtility}/>
            </Route>
            <Route path="/ingredients">
                <IngredientsPage httpUtility={this.state.httpUtility}/>
            </Route>
            <Route path="/">    
                <RecipeApp httpUtility={this.state.httpUtility}/>
            </Route>
          </Switch>

      </Router>
    }
}