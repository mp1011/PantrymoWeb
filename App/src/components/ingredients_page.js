/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {RecipeAppApi} from '/src/services/recipeapp_api.js'
import {CuisinePicker} from '/src/jsx/components/cuisine_picker.js'

// eslint-disable-next-line no-undef
export class IngredientsPage extends React.Component 
{
  
    constructor(props) 
    {
      super(props);
     
      var httpUtility = props.httpUtility;
      var recipeAppApi = new RecipeAppApi(httpUtility);
      this.onCuisineToggled = this.onCuisineToggled.bind(this);

      this.state = {
                      httpUtility: httpUtility,
                      recipeAppApi: recipeAppApi
                   };
    }

    componentDidMount()
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
                    this.setState({ cuisines: cuisines });
                }
            });
    }

    onCuisineToggled(cuisine)
    {
        let cuisines = this.state.cuisines;
        cuisines.forEach(c=>{
            c.selected = c.name == cuisine.name;
        });

        this.state.recipeAppApi
            .rankIngredientsByCuisine(cuisine.name)
            .then(r=>{
                this.setState({ rankedIngredients: r, cuisines: cuisines});
            });       
    }

    render() 
    {
        if(!this.state.cuisines)
            return "";

        var tree="";

        if(this.state.rankedIngredients)
        {
            var list = this.state.rankedIngredients.rankedChildren
                    .map(c=> <IngredientTree key={c.name} ingredients={c} />);

            tree=<section id="ingredientsTreeContainer">
                <ul className="whiteBox ingredientsTree">{list}</ul>
            </section>
        }

        return <section>
                    <CuisinePicker isForIngredientsPage='true' cuisines={this.state.cuisines} onCuisineToggled={this.onCuisineToggled} />
                    {tree}
                </section>;
    }

}

export class IngredientTree extends React.Component 
{
    constructor(props) 
    {
      super(props);  
    }

    render()
    {
        let innerList ="";
        let percent = (this.props.ingredients.frequency * 100).toFixed(0) + "%";

        if(this.props.ingredients.rankedChildren.length > 0)
        {
            var childElements = this.props.ingredients.rankedChildren
                .map(c=> <IngredientTree key={c.name} ingredients={c} />);

            innerList = <ul>{childElements}</ul>;
        }

        return <li>
                 <section className="ingredientName">
                     {this.props.ingredients.name}
                     <section className="percent">{percent}</section>
                 </section>
                 
                 {innerList}
                 </li>;
    }
}
