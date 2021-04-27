export class PairingSuggestionsPanel extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    render() 
    {
       if(this.props.suggestedPairings.length == 0)
          return "";


        var ingredients = this.props.suggestedPairings
              .map(p=> <Pairing key={p.pairedIngredient} ingredient={p.pairedIngredient} onSuggestedIngredientSelected={this.props.onSuggestedIngredientSelected} />);

        return <section className='pairingSuggestions'>
                  <p>May we suggest:</p>
                  <ul>
                      {ingredients}
                  </ul>
                </section>;
    }
}

export class Pairing extends React.Component
{
    constructor(props) 
    {
      super(props);
      this.onSuggestedIngredientSelected = this.onSuggestedIngredientSelected.bind(this);
    }

    onSuggestedIngredientSelected()
    {
        this.props.onSuggestedIngredientSelected(this.props.ingredient);
    }

    render()
    {
      return <li><input type='button' onClick={this.onSuggestedIngredientSelected} value={this.props.ingredient}></input></li>;
    }
}
