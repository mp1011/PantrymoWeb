export class AdvancedSearch extends React.Component 
{
    constructor(props) 
    {
      super(props);
    }

    render() 
    {
        if(!this.props.stats)
            return "";
        
        var filters = this.props.stats.traitStats
            .map(t=> <li key={t.trait}><TraitSearchFilter traitStats={t} onSelectionToggled={this.props.onSelectionToggled}></TraitSearchFilter></li>);

        return  <section className="whiteBox advancedSearch">
                  <ul className="traitFilter">
                    {filters}
                  </ul>
                </section>;
    }
}

export class TraitSearchFilter extends React.Component
{
    constructor(props) 
    {
      super(props);
      this.toggleSelection = this.toggleSelection.bind(this);
      this.openDropdown = this.openDropdown.bind(this);
     
      this.state = 
      {
        values: []
      };
    }

    openDropdown()
    {
        var dropdown = document.getElementById(`selector_${this.props.traitStats.trait.replace("/","")}`);
        if(!dropdown.className.includes("appear"))
          dropdown.className += " appear";

        var anyBtnId = `anybtn_${this.props.traitStats.trait.replace("/","")}`;
        document.getElementById(anyBtnId)
          .style["display"] = "none";

        this.setState({ dropDownOpen:true});
    }

    toggleSelection(evt)
    {
        var selection = evt.target.dataset.val;

        var selectedValues = this.state.values;
        if(!selectedValues.includes(selection))
        {
           selectedValues.push(selection);
        }
        else 
        {
            var index = selectedValues.indexOf(selection);
            selectedValues.splice(index,1);
        }
        
        this.setState({ values: selectedValues});

        this.props.onSelectionToggled(this.props.traitStats.trait, selectedValues);
    }

    render()
    {
        var dropdownId = `selector_${this.props.traitStats.trait.replace("/","")}`;
        var anyBtnId = `anybtn_${this.props.traitStats.trait.replace("/","")}`;

        var selectedValues = this.state.values;
        var anyButton = "";
        if(!this.state.dropDownOpen)
            anyButton = <input id={anyBtnId}  type="button" onClick={this.openDropdown} value="any"/>;
            
        var options = this.props.traitStats.traitValueStats.map(p=>{
            var text = `${p.value} (${p.count})`;
            var className= selectedValues.includes(p.value) ? "selected" : "";
            
            return <input key={p.value} type="button" onClick={this.toggleSelection}  data-val={p.value} className={className} value={text}/>
        });

        return <section className="traitSearchFilter">                   
                    <h1>{this.props.traitStats.trait}</h1> 
                    {anyButton}
                    <ul id={dropdownId}  className="dropdownOptions">
                      {options}
                    </ul>
               </section> 

    }
}