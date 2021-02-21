/* eslint-disable react/prop-types */
export class CuisinePicker extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    addCuisineButton(cuisineName, isTop, isOther)
    {
        var cuisine = this.props.cuisines.find(c=>c.name == cuisineName);


        return <CuisineButton key={cuisine.name} isTop={isTop} isOther={isOther} cuisine={cuisine} onCuisineToggled={this.props.onCuisineToggled} />;
    }

    showMoreButtonClicked()
    {
        document.getElementById("showMoreCuisinesButton")
            .style["display"] = "none";

        let elements = document.getElementsByClassName("otherMatch");
        for (let item of elements) 
        {
            item.style["display"]  = "inherit";
        }
    }

    render() 
    {
        let showMoreButton="";
        var cuisineButtons = [];
        let title="";
        let subTitle="";

        if(this.props.isForIngredientsPage)
        {
            if(!this.props.cuisines)
                return "";

            title="Browse Ingredients by Cuisine";
            subTitle="Choose a cuisine to see which ingredients appear in the most recipes.";

            cuisineButtons.push(this.props.cuisines.map(c=> this.addCuisineButton(c.name, true,false)));
        }
        else 
        {
            title="Which cuisines do you cook at home?";
            subTitle="<i>(Optional)</i> Choose the cuisines you usually cook and we'll suggest recipes using ingredients common to those cuisines.";

            if(!this.props.rankedCuisines ||
                (this.props.rankedCuisines.best.length == 0 
                    && this.props.rankedCuisines.good.length == 0
                    && this.props.rankedCuisines.other.length == 0))
                return "";

            cuisineButtons.push(this.props.rankedCuisines.best.map(c=> this.addCuisineButton(c, true,false)));
            cuisineButtons.push(this.props.rankedCuisines.good.map(c=> this.addCuisineButton(c, false,false)));
            cuisineButtons.push(this.props.rankedCuisines.other.map(c=> this.addCuisineButton(c, false,true)));

            showMoreButton = (this.props.rankedCuisines.other.length > 0) 
                                ? <li><input id="showMoreCuisinesButton" type='button' value='Show more...' onClick={this.showMoreButtonClicked} /></li>
                                : "";
        }

        return  <section className="whiteBox cuisinePicker">
                    <h2>{title}</h2>
                    <p>{subTitle}</p>
                    <ul className="cuisineList">{cuisineButtons}{showMoreButton}</ul>  
                    
                </section>
    }

}

export class CuisineButton extends React.Component
{
    constructor(props) 
    {
      super(props);
      this.toggleCuisine = this.toggleCuisine.bind(this);
    }

    toggleCuisine()
    {
        this.setState((state,props)=>{
            props.cuisine.selected = !props.cuisine.selected;
            props.onCuisineToggled(this.props.cuisine);

            return { };
        });
    }

    render() 
    {
        if(this.props.isTop)
        {
            return  <li className='topMatch'>
                <input type='button' value={this.props.cuisine.name} onClick={this.toggleCuisine} className={this.props.cuisine.selected ? "selected" : "" }  />
            </li>;
        }
        else if(this.props.isOther)
        {
            return  <li className='otherMatch'>
                <input type='button' value={this.props.cuisine.name} onClick={this.toggleCuisine} className={this.props.cuisine.selected ? "selected" : "" }  />
            </li>;
        }
        else 
        {
            return  <li>
                <input type='button' value={this.props.cuisine.name} onClick={this.toggleCuisine} className={this.props.cuisine.selected ? "selected" : "" }  />
            </li>;
        }
        
    }
}