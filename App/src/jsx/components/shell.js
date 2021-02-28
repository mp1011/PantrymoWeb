var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { RecipeApp } from '/src/jsx/components/recipe_app.js';
import { IngredientsPage } from '/src/jsx/components/ingredients_page.js';
import { ArticleViewer } from '/src/jsx/components/article_viewer.js';
import { settings } from '/src/app_settings.mjs';
import { CachedHttpUtility } from '/src/services/cached_http_utility.js';
import { HttpUtility } from '/src/services/http_utility.js';
var Router = window.ReactRouterDOM.BrowserRouter;
var Route = window.ReactRouterDOM.Route;
var NavLink = window.ReactRouterDOM.NavLink;
var Switch = window.ReactRouterDOM.Switch;

export var Shell = function (_React$Component) {
    _inherits(Shell, _React$Component);

    function Shell(props) {
        _classCallCheck(this, Shell);

        var _this = _possibleConstructorReturn(this, (Shell.__proto__ || Object.getPrototypeOf(Shell)).call(this, props));

        _this.state = {
            httpUtility: settings.enableCache ? new CachedHttpUtility() : new HttpUtility()
        };

        return _this;
    }

    _createClass(Shell, [{
        key: 'handleError',
        value: function handleError(e) {
            //temporary
            alert("ERROR! " + e);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Router,
                null,
                React.createElement(
                    'section',
                    { className: 'mainNav' },
                    React.createElement(
                        'nav',
                        null,
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    NavLink,
                                    { activeClassName: 'active', exact: true, to: '/' },
                                    'Recipes'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    NavLink,
                                    { activeClassName: 'active', to: '/articles' },
                                    'Articles'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    NavLink,
                                    { activeClassName: 'active', to: '/ingredients' },
                                    'Ingredients'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    Switch,
                    null,
                    React.createElement(
                        Route,
                        { path: '/articles' },
                        React.createElement(ArticleViewer, { httpUtility: this.state.httpUtility })
                    ),
                    React.createElement(
                        Route,
                        { path: '/ingredients' },
                        React.createElement(IngredientsPage, { httpUtility: this.state.httpUtility })
                    ),
                    React.createElement(
                        Route,
                        { path: '/' },
                        React.createElement(RecipeApp, { httpUtility: this.state.httpUtility })
                    )
                )
            );
        }
    }]);

    return Shell;
}(React.Component);