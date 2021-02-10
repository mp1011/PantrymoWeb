import '/node_modules/autocompleter/autocomplete.js'
import * as Constants from '/src/constants.mjs'
 
// eslint-disable-next-line no-undef
export class IngredientInputBox extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.onItemSelected = this.onItemSelected.bind(this);
      this.suggestIngredients = this.suggestIngredients.bind(this);
      this.addCurrentSelection = this.addCurrentSelection.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.getPlaceholderText = this.getPlaceholderText.bind(this);
      this.state = { text: "", selectedIngredients: [] };
    }

    componentDidMount() 
    {
        var input = document.getElementById("ingredientPicker");

        // eslint-disable-next-line no-undef
        autocomplete(
        { 
          input: input,
          fetch: this.suggestIngredients,
          onSelect: this.onItemSelected
        });
    }

    onKeyUp(evt)
    {
      if (evt.keyCode === Constants.KeyCode_Enter) 
      {
          var text = document.getElementById("ingredientPicker").value;
          if(text && text.length > 0)
          {
              this.onItemSelected( { label: text });
          }
      }
    }

    onItemSelected(item)
    {
        this.props.onIngredientAdded(item.label);
        document.getElementById("ingredientPicker").value = "";
    }
    
    suggestIngredients(text, update)
    {
        if(text == this.lastSuggestion)
          return;
        this.lastSuggestion= text;

      var currentText = document.getElementById("ingredientPicker").value;
      if(currentText.length == 0)
        return;

      var selectedIngredients = this.props.selectedIngredients;
      this.props.recipeAppApi
          .ingredientSearch(text)
          .then(suggestions=>
          {
            var currentText = document.getElementById("ingredientPicker").value;
            if(currentText.length == 0)
              return;
              
            update(suggestions
              .filter(x => !selectedIngredients.includes(x))
              .map(s=>{ return { "label": s, "value": s } }));
          });            
    }
  
    addCurrentSelection()
    {
      var text =  document.getElementById("ingredientPicker").value;
      if(text)
      {
          this.props.onIngredientAdded(text);
          document.getElementById("ingredientPicker").value = "";
      }
    }

    getPlaceholderText()
    {
        if(this.props.selectedIngredients.length > 0)
          return "add another...";
        else 
          return "add ingredient..."
    }

    render() 
    {
        return <input 
          placeholder={this.getPlaceholderText()}
          id="ingredientPicker"
          onKeyUp={this.onKeyUp}
          onBlur={this.addCurrentSelection} 
          autoComplete="off" />
    }

}