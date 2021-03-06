var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { isMobileScreenSize } from '/src/services/general.js';

export var ArticleViewer = function (_React$Component) {
    _inherits(ArticleViewer, _React$Component);

    function ArticleViewer(props) {
        _classCallCheck(this, ArticleViewer);

        var _this = _possibleConstructorReturn(this, (ArticleViewer.__proto__ || Object.getPrototypeOf(ArticleViewer)).call(this, props));

        _this.loadArticleFromUrl = _this.loadArticleFromUrl.bind(_this);
        _this.showArticle = _this.showArticle.bind(_this);
        _this.createArticleElement = _this.createArticleElement.bind(_this);

        _this.state = {
            httpUtility: props.httpUtility,
            articles: [{ title: "About Pantrymo", file: "about", published: "Feb 13 2021" }, { title: "The Beginner's Survival Guide to Cooking", file: "beginnersguide", published: "Jan 10 2021" }, { title: "Skills you should learn", file: "skills", published: "Jan 10 2021" }, { title: "Dimensions of Flavor", file: "flavor", published: "Jan 14 2021" }, { title: "How to Cook Chicken Breast", file: "chickenbreast", published: "Feb 7 2021" }, { title: "Broth vs Stock", file: "brothandstock", published: "Apr 3 2021" }, { title: "The Art of Figuring Out What the Heck to Eat Every Day", file: "decidingondinner", published: "Apr 15 2021" }, { title: "What Recipes Don't Tell You", file: "whatrecipesdonttellyou", published: "Apr 18 2021" }] };
        return _this;
    }

    _createClass(ArticleViewer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.loadArticleFromUrl(true);
            window.onpopstate = function () {
                return _this2.loadArticleFromUrl(false);
            };
        }
    }, {
        key: "loadArticleFromUrl",
        value: function loadArticleFromUrl(addToHistory) {
            var urlParts = window.location.href.trimEnd('/').split('/').filter(function (p) {
                return p && p.length > 0;
            });

            var lastPart = urlParts[urlParts.length - 1];

            var lastPartSplit = lastPart.split('#');
            var jumpTo = null;

            if (lastPartSplit.length == 2) {
                lastPart = lastPartSplit[0];
                jumpTo = lastPartSplit[1];
            }

            var article = this.state.articles.find(function (f) {
                return f.file == lastPart;
            });
            if (article) {
                this.setState({ currentArticleTitle: article.title });
                this.showArticle(article, jumpTo, addToHistory);
            } else if (isMobileScreenSize()) {
                this.setState({ currentArticleTitle: null });
            } else {
                this.setState({ currentArticleTitle: this.state.articles[0].title });
                this.showArticle(this.state.articles[0], null, addToHistory);
            }
        }
    }, {
        key: "showArticle",
        value: function showArticle(e, jumpTo, addToHistory) {
            var _this3 = this;

            this.state.httpUtility.get("/articles/" + e.file + ".md").then(function (text) {

                _this3.setState({ currentArticleTitle: e.title });

                document.title = "Pantrymo - " + e.title;

                var html = marked(text);

                if (addToHistory) history.pushState(e, e.title, "/articles/" + e.file);

                document.getElementById('articleTitle').innerHTML = e.title;
                document.getElementById('articleBody').innerHTML = html;

                if (jumpTo) {
                    setTimeout(function () {
                        var jumpToElement = document.getElementById(jumpTo);
                        if (jumpToElement) jumpToElement.scrollIntoView();
                    }, 100);
                }
            });
        }
    }, {
        key: "createArticleElement",
        value: function createArticleElement(article) {
            var _this4 = this;

            var jumpTo = isMobileScreenSize() ? "articleTitle" : null;

            var selected = article.title == this.state.currentArticleTitle ? "selected" : "";
            return React.createElement(
                "li",
                { className: selected, onClick: function onClick() {
                        return _this4.showArticle(article, jumpTo, true);
                    }, key: article.title },
                React.createElement(
                    "span",
                    null,
                    article.title
                ),
                " ",
                React.createElement(
                    "span",
                    { className: "date" },
                    article.published
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var articleList = this.state.articles.map(this.createArticleElement);

            var body = "";
            if (this.state.currentArticleTitle) {
                body = React.createElement(
                    "section",
                    { id: "articleBodyContainer" },
                    React.createElement("h1", { id: "articleTitle" }),
                    React.createElement("article", { id: "articleBody" })
                );
            }

            return React.createElement(
                "section",
                { className: "whiteBox articlePage" },
                React.createElement(
                    "ul",
                    { className: "articleList" },
                    articleList
                ),
                body
            );
        }
    }]);

    return ArticleViewer;
}(React.Component);