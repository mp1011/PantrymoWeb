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
            
            this.setState({selectedCuisine: cuisine.name});
    }

    render() 
    {
        if(!this.state.cuisines)
            return "";

        var tree="";

        if(this.state.rankedIngredients)
        {
            var list = this.state.rankedIngredients.rankedChildren
                    .map(c=> <IngredientTree key={c.name} ingredients={c} selectedCuisine={this.state.selectedCuisine} />);

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
      this.showMoreButtonClicked = this.showMoreButtonClicked.bind(this);
      this.shouldHide = this.shouldHide.bind(this);
    }

    showMoreButtonClicked(e)
    {
        var parentList = e.target.parentElement.parentElement;

        var listItems = parentList.getElementsByTagName("li");
        for (let item of listItems) 
        {
            item.style["display"]  = "inherit";
        }

        e.target.style.display = "none";
    }

    shouldHide(item, thisIndex, totalCount)
    {
        let maxItemsPerNode=4;

        if(thisIndex < maxItemsPerNode)
            return false;

        //allow if its the last item in the list, and it has no children
        if((totalCount == maxItemsPerNode+1) && thisIndex == (totalCount-1) && item.rankedChildren.length == 0)
            return false;

        return true;
    }

    render()
    {
        let displayStyle={};

        if(this.props.shouldHide)
        {
            displayStyle={display:'none'};
        }

        let innerList ="";
        let percent = (this.props.ingredients.frequency * 100).toFixed(0) + "%";

        let colorClass = "";
        if(this.props.ingredients.frequency >= 0.5)
            colorClass="green";
        else if(this.props.ingredients.frequency >= 0.1)
            colorClass="yellow";
        else if(this.props.ingredients.frequency > 0)
            colorClass="orange";
        else 
            colorClass="hide";

        if(this.props.ingredients.rankedChildren.length > 0)
        {
            var itemCount=this.props.ingredients.rankedChildren.length;
            var childElements = this.props.ingredients.rankedChildren
                .map((c,ix) => <IngredientTree key={c.name} shouldHide={this.shouldHide(c,ix,itemCount)} ingredients={c} selectedCuisine={this.props.selectedCuisine} />);

            if(childElements.some(p=>p.props.shouldHide))
                childElements.push(<li key="showMore"><input type='button' value='&#9660; Show more...' className='showMoreIngredients' onClick={this.showMoreButtonClicked} /></li>)

            innerList = <ul>{childElements}</ul>;
        }

        return <li style={displayStyle}>
                 <a href={`/#ingredients=${this.props.ingredients.name}&cuisines=${this.props.selectedCuisine}`} className="ingredientName">
                     {this.props.ingredients.name}
                     <section className={"percent " + colorClass}>{percent}</section>
                 </a>
                 
                 {innerList}
                 </li>;
    }
}
