export class SelectedIngredientsPanel extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    render() 
    {
      let list = this.props.selectedIngredients.map((ing)=><SelectedIngredient key={ing} value={ing} onIngredientRemoved={this.props.onIngredientRemoved}/>);
      let suffix = "";
      let label = "What can I make with . . .";

      if(list.length > 0)
      {
          label = "What can I make with ";
          suffix = <h2 className="suffix">?</h2>
      }

      return <section>
                <h2>{label}</h2>
                <ul className="ingredientsList">
                  {list}
                </ul>
                { suffix }
            </section>;          
    }
}

export class SelectedIngredient extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.remove = this.remove.bind(this);
    }

    remove()
    {
      this.props.onIngredientRemoved(this.props.value);
    }

    render() 
    {
      return    <li className="chosenIngredient" onClick={this.remove}>
                  <input type='button' value={this.props.value} onClick={this.remove}/>
                  <p className="delimiter">&</p>
                </li>
    }
}
