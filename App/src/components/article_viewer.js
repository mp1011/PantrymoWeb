export class ArticleViewer extends React.Component 
{
    constructor(props) 
    {
      super(props);   

      this.loadArticleFromUrl = this.loadArticleFromUrl.bind(this);
      this.showArticle = this.showArticle.bind(this);
      this.createArticleElement = this.createArticleElement.bind(this);

      this.state = { 
                    httpUtility: props.httpUtility,
                    articles: [ 
                                { title: "About Pantrymo", file: "about", published: "Feb 13 2021" },
                                { title: "The Beginner's Survival Guide to Cooking", file: "beginnersguide", published: "Jan 10 2021" },
                                { title: "Skills you should learn", file: "skills", published: "Jan 10 2021" },
                                { title: "Dimensions of Flavor", file: "flavor", published: "Jan 14 2021" },
                                { title: "How to Cook Chicken Breast", file: "chickenbreast", published: "Feb 7 2021" },                                                                
                    ]};
    }

    componentDidMount() 
    {   
        this.loadArticleFromUrl(true);        
        window.onpopstate = () => this.loadArticleFromUrl(false);
    }

    loadArticleFromUrl(addToHistory)
    {
        let urlParts = window.location.href
            .trimEnd('/')
            .split('/')
            .filter(p=> p && p.length > 0);

        let lastPart = urlParts[urlParts.length-1];

        var lastPartSplit = lastPart.split('#');
        let jumpTo = null;

        if(lastPartSplit.length == 2)
        {
            lastPart = lastPartSplit[0];
            jumpTo = lastPartSplit[1];
        }

        let article = this.state.articles.find(f=>f.file == lastPart);
        if(article)
        {
            this.setState({ currentArticleTitle: article.title});
            this.showArticle(article, jumpTo, addToHistory);
        }
        else if(window.innerWidth < 1200)
        {
            this.setState({ currentArticleTitle: null});
        }
        else 
        {
            this.setState({ currentArticleTitle: this.state.articles[0].title});
            this.showArticle(this.state.articles[0], null, addToHistory);
        }
    }


    showArticle(e, jumpTo, addToHistory)
    {

        this.state.httpUtility.get(`/articles/${e.file}.md`)
            .then(text=> {

                this.setState({ currentArticleTitle: e.title});

                document.title = `Pantrymo - ${e.title}`;

                let html = marked(text);

                if(addToHistory)
                    history.pushState(e, e.title, `/articles/${e.file}`);

                document.getElementById('articleTitle').innerHTML = e.title;
                document.getElementById('articleBody').innerHTML = html;

                if(jumpTo)
                {
                    setTimeout(function(){
                        let jumpToElement = document.getElementById(jumpTo);
                        if(jumpToElement)
                            jumpToElement.scrollIntoView();
                    }, 100)                    
                }
             });
    }

    createArticleElement(article)
    {
        var selected = (article.title == this.state.currentArticleTitle) ? "selected" : "";
        return <li className={selected} onClick={()=> this.showArticle(article,null,true)} key={article.title}>
                    <span>{article.title}</span> <span className="date">{article.published}</span>
                </li>;
    }
   
    render() 
    {
        let articleList = this.state.articles.map(this.createArticleElement);

        var body = "";
        if(this.state.currentArticleTitle)
        {
            body = <section id='articleBodyContainer'>
                <h1 id='articleTitle'></h1>
                <article id='articleBody'></article>
                </section>;
        }

        return  <section className="whiteBox articlePage">
                    <ul className="articleList">{articleList}</ul> 
                    {body}     
                </section>
    }
}