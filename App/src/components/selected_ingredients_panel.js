export class SelectedIngredientsPanel extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    render() 
    {
      var list = this.props.selectedIngredients.map((ing)=><SelectedIngredient key={ing} value={ing} onIngredientRemoved={this.props.onIngredientRemoved}/>);

      return (
          <ul className="ingredientsList">
            {list}
          </ul>
      );
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
      return <li className="chosenIngredient" onClick={this.remove}>
              <input type='button' value={this.props.value} onClick={this.remove}/>
            </li>
    }
}
