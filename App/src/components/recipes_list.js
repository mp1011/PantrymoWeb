export class RecipesList extends React.Component 
{
   constructor(props) 
   {
      super(props);
   }

   render() 
   {     
      var loader= (this.props.loading) ? <section className="loadingSpinner">
         <section className="recipeImage">
            <img src='/style/stirring.gif' alt="Finding recipes"/>
         </section>
      </section> : "";



      if(!this.props.loading && this.props.selectedIngredients.length > 0 && this.props.recipes.length == 0)
      {
         return <section className="noResults">
                  <p>We didn't find any matches for all of those ingredients. Try starting with a <strong>protein</strong>, a <strong>vegetable</strong> and a <strong>starch</strong>.</p>
                </section>;
      }
      else 
      {
            return <div id="recipeListContainer">         
               <ul className="recipeList">
                  {this.props.recipes.map(r=> <Recipe key={r.url} debug={this.props.debug} selectedIngredients={this.props.selectedIngredients} {...r} />)}
                  {loader}                 
               </ul>
            </div>
}
   }
}

export class Recipe extends React.Component 
{
    constructor(props) 
    {
      super(props);         
      this.getCssClass = this.getCssClass.bind(this);
      this.renderIngredient = this.renderIngredient.bind(this);
    }

    getCssClass(ingredient)
    {
         if(this.props.selectedIngredients.includes(ingredient.name))
            return "chosenIngredient";
         else if(ingredient.frequency >= 0.10)
            return "veryCommonIngredient";
         else if(ingredient.frequency >= 0.01)
            return "commonIngredient";        
         else
            return "rareIngredient";
    }

    renderIngredient(ingredient)
    {
       if(this.props.debug)
         return <li key={ingredient.id} className={this.getCssClass(ingredient)}>
            <span>
               <p>{ingredient.name.join(" or ")}</p>
               <p>{ingredient.originalText}</p>
               <p>{(ingredient.frequency*100).toFixed(1)}</p>
            </span>
         </li>;
       else 
         return <li key={ingredient.id} className={this.getCssClass(ingredient)}>{ingredient.name.join(" or ")}</li>;
    }

    componentDidMount()
    {
    }
   
    render() 
    {   
       if(this.props.isAdPlaceholder)
       {
            return <section className="recipe adpl">
                  </section>;
       }

      var namedIngredients = this.props.ingredients.filter(i=>i.frequency > 0);
      var unknownIngredients = this.props.ingredients.filter(i=>i.frequency == 0);

      var ingredients = namedIngredients.map(this.renderIngredient);

      if(unknownIngredients.length > 0)
      {
         if(this.props.debug)
         {
            ingredients.push(unknownIngredients.map(u=> <li className="recipeIngredient" key={u.id}>{u.name}</li>));
         }
         else 
         {
            ingredients.push(<li key="extra">+{unknownIngredients.length} more</li>);
         }
      }

       return <section className="recipe">
                  <h1><a target="_blank" rel="noopener noreferrer" href={this.props.url}>{this.props.name}</a></h1>
                  <h2>{this.props.source}</h2>
                  <ul className="ingredientsList">{ingredients}</ul>        
                  <a target="_blank" rel="noopener noreferrer" className="recipeImage" href={this.props.url}>
                     <img src={this.props.image}/>
                  </a>  
                  {this.props.debug ? <p>{this.props.score}</p> : "" }
               </section>;
    }

}