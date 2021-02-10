export class BackToTopPanel extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.onScroll = this.onScroll.bind(this);        
        this.panelClicked = this.panelClicked.bind(this);
        this.getScrollToTop = this.getScrollToTop.bind(this);
        this.state = { shouldShow: false };
    }

    componentDidMount() 
    {    
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() 
    {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll()
    {
        if(!this.state)
            return;

        const scrollPosition = window.scrollY;
        let scrollToTop = this.getScrollToTop() + 200;

        var isShowing = this.state.shouldShow;
        if(isShowing && scrollPosition < scrollToTop - 100)
            this.setState({ shouldShow: false });
        else if(!isShowing && scrollPosition > scrollToTop)
            this.setState({ shouldShow: true });      
    }

    getScrollToTop()
    {
        let ingredientPicker = document.getElementById("ingredientPickerContainer");
        if(!ingredientPicker)
            return 0;
            
        let screenTop = ingredientPicker.getBoundingClientRect().top;
        
        let actualTop = screenTop + document.documentElement.scrollTop;
        return actualTop;
    }

    panelClicked()
    {       
        window.scrollTo(0,this.getScrollToTop());
    }

    render() 
    {
        if(this.state && this.state.shouldShow)
        {
            return <section className="backToTopPanel" onClick={this.panelClicked}>Back to top</section>
        }
        else 
            return "";
    }

}