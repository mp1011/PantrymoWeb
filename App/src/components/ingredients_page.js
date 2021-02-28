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
      this.alignRows = this.alignRows.bind(this);
      this.onResize = this.onResize.bind(this);
      this.layoutItems = this.layoutItems.bind(this);
      this.onLayoutChanged = this.onLayoutChanged.bind(this);
      this.state = {
                      httpUtility: httpUtility,
                      recipeAppApi: recipeAppApi
                   };
    }


    alignRows(upperRow, lowerRow)
    {
        let column = 0;

        while(column < upperRow.length && column < lowerRow.length)
        {
            let upperItem = upperRow[column];
            let lowerItem = lowerRow[column];

            let upperPos = upperItem.getBoundingClientRect();
            let lowerPos = lowerItem.getBoundingClientRect();

             let gap = lowerPos.y - (upperPos.y + upperPos.height) -16;
             if(gap > 0)
                lowerItem.style.top = `-${gap}px`;                
  
            column++;
        }
    }

    onResize()
    {
        this.layoutItems();
    }

    layoutItems()
    {
        let nodes = [].slice.call(document.getElementsByClassName("topNode"));
        nodes.forEach(n=>
        {
            n.style.top = null;
        });

        var rows = nodes 
                    .groupBy(n=>n.getBoundingClientRect().y)
                    .getValues();

        if(rows.length > 1)
            this.alignRows(rows[0], rows[1]);

        if(rows.length > 2)
            this.alignRows(rows[1], rows[2]);
        
        if(rows.length > 3)
            this.alignRows(rows[2], rows[3]); 
    }

    onLayoutChanged()
    {
        setTimeout(this.layoutItems,0);
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.onResize);

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

    
    componentDidUpdate()
    {
        this.layoutItems();
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.onResize);
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

        let ingredientsTreeMain = document.getElementById("ingredientsTreeMain");
        if(ingredientsTreeMain)
        {
            ingredientsTreeMain.style.height = "inherit";            
            var padding = [].slice.call(document.getElementsByClassName("ingredientTreePadding"));
            for (let item of padding) {
                item.parentNode.removeChild(item);
            }
        }

        var tree="";

        if(this.state.rankedIngredients)
        {
            var list = this.state.rankedIngredients.rankedChildren
                    .map( c => <IngredientTree  key={c.name} 
                                                ingredients={c} 
                                                selectedCuisine={this.state.selectedCuisine}
                                                onLayoutChanged={this.onLayoutChanged} 
                                                depth={1} />);

            tree=<section id="ingredientsTreeContainer">
                <ul id="ingredientsTreeMain" className="ingredientsTree">{list}</ul>
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
            if(item.style["display"] == "none")
            {
                item.style["display"] = "inherit";
                item.className += " appear";
            }
        }

        e.target.style.display = "none";
        this.props.onLayoutChanged();
    }

    shouldHide(item, thisIndex, totalCount)
    {
        let maxItemsPerNode = this.props.depth == 1 ? 10 : 5;
        if(window.innerWidth <= 1200)
            maxItemsPerNode=10000;

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
        else 
        {
            displayStyle={order: this.props.column};
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
                .map((c,ix) => <IngredientTree key={c.name} 
                                shouldHide={this.shouldHide(c,ix,itemCount)} 
                                ingredients={c} 
                                selectedCuisine={this.props.selectedCuisine}
                                onLayoutChanged={this.props.onLayoutChanged}
                                depth={this.props.depth+1} />);

            if(childElements.some(p=>p.props.shouldHide))
                childElements.push(<li key="showMore" className='showMoreContainer'><input type='button' value='&#9660; Show more...' className='showMoreIngredients' onClick={this.showMoreButtonClicked} /></li>)

            innerList = <ul>{childElements}</ul>;
        }
        else         
            colorClass += " finalNode";

        if(this.props.depth == 1)
            colorClass += " topNode";

        return <li className={colorClass} style={displayStyle}>
                 <a href={`/#ingredients=${this.props.ingredients.name}&cuisines=${this.props.selectedCuisine}`} className="ingredientName">
                     {this.props.ingredients.name}
                     <section className={"percent"}>({percent})</section>
                 </a>
                 
                 {innerList}
                 </li>;
    }
}
