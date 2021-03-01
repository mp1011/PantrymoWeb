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
            item.className += " appear";
        }
    }

    render() 
    {
        let showMoreButton="";
        var cuisineButtons = [];
        let title="";

        if(this.props.isForIngredientsPage)
        {
            if(!this.props.cuisines)
                return "";

            title="Tap a cuisine to see it's most popular ingredients:";

            cuisineButtons.push(this.props.cuisines.map(c=> this.addCuisineButton(c.name, true,false)));
        }
        else 
        {
            title="(optional) Show recipes that use ingredients common to";

            let selectedCuisines = this.props.cuisines
                                        .filter(c=>c.selected)
                                        .map(c=>c.name);

            if(selectedCuisines.length == 0)
                title += " ________ cuisine:";
            else if(selectedCuisines.length == 1)
                title += ` ${selectedCuisines[0]} cuisine:`;
            else if(selectedCuisines.length == 2)
                title += ` ${selectedCuisines[0]} or ${selectedCuisines[1]} cuisines:`;
            else 
            {
                var allButLast = selectedCuisines.slice(0,selectedCuisines.length-1);
                title += ` ${allButLast.join(", ")} or ${selectedCuisines[selectedCuisines.length-1]} cuisines:`;  
            }
            

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