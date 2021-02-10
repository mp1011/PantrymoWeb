export class CuisinePicker extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    render() 
    {
        var cuisines = Object.values(this.props.cuisines)
            .map(c=> <CuisineButton key={c.name} cuisine={c} onCuisineToggled={this.props.onCuisineToggled} />);

        return  <section className="whiteBox cuisinePicker">
                    <h2>Which cuisines do you cook at home?</h2>
                    <p><i>(Optional)</i> Choose the cuisines you usually cook and we'll suggest recipes using ingredients common to those cuisines.</p>
                    <ul className="cuisineList">{cuisines}</ul>
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
        return  <li>
                    <input type='button' value={this.props.cuisine.name} onClick={this.toggleCuisine} className={this.props.cuisine.selected ? "selected" : "" }  />
                </li>
    }
}