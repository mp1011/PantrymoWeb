export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error: error };
    }
    
    render() 
    {
      if (this.state.hasError) 
      {
        return <section className="errorPanel">
            <h1>Error:</h1>
            <h2>{this.state.error.message}</h2>    
            <p>{this.state.error.stack}</p>   
        </section>
      }
  
      return this.props.children; 
    }
  }