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
            .map(t=> <TraitSearchFilter trait={t.trait}></TraitSearchFilter>);

        return  <section className="whiteBox advancedSearch">
                    {filters}
                </section>;
    }
}

export class TraitSearchFilter extends React.Component
{
    constructor(props) 
    {
      super(props);
    }

    render()
    {
        return <p>{this.props.trait}</p>;
    }
}