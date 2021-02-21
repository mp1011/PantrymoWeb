var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { RecipeAppApi } from '/src/services/recipeapp_api.js';
import { CuisinePicker } from '/src/jsx/components/cuisine_picker.js';

// eslint-disable-next-line no-undef
export var IngredientsPage = function (_React$Component) {
    _inherits(IngredientsPage, _React$Component);

    function IngredientsPage(props) {
        _classCallCheck(this, IngredientsPage);

        var _this = _possibleConstructorReturn(this, (IngredientsPage.__proto__ || Object.getPrototypeOf(IngredientsPage)).call(this, props));

        var httpUtility = props.httpUtility;
        var recipeAppApi = new RecipeAppApi(httpUtility);
        _this.onCuisineToggled = _this.onCuisineToggled.bind(_this);

        _this.state = {
            httpUtility: httpUtility,
            recipeAppApi: recipeAppApi
        };
        return _this;
    }

    _createClass(IngredientsPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.state.recipeAppApi.getCuisineNames().catch(function (e) {
                console.log(e);
            }).then(function (names) {
                if (names && names.length > 0) {
                    var cuisines = names.map(function (n) {
                        return { name: n, selected: false };
                    });
                    _this2.setState({ cuisines: cuisines });
                }
            });
        }
    }, {
        key: 'onCuisineToggled',
        value: function onCuisineToggled(cuisine) {
            var _this3 = this;

            var cuisines = this.state.cuisines;
            cuisines.forEach(function (c) {
                c.selected = c.name == cuisine.name;
            });

            this.state.recipeAppApi.rankIngredientsByCuisine(cuisine.name).then(function (r) {
                _this3.setState({ rankedIngredients: r, cuisines: cuisines });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.cuisines) return "";

            var tree = "";

            if (this.state.rankedIngredients) {
                var list = this.state.rankedIngredients.rankedChildren.map(function (c) {
                    return React.createElement(IngredientTree, { key: c.name, ingredients: c });
                });

                tree = React.createElement(
                    'section',
                    { id: 'ingredientsTreeContainer' },
                    React.createElement(
                        'ul',
                        { className: 'whiteBox ingredientsTree' },
                        list
                    )
                );
            }

            return React.createElement(
                'section',
                null,
                React.createElement(CuisinePicker, { isForIngredientsPage: 'true', cuisines: this.state.cuisines, onCuisineToggled: this.onCuisineToggled }),
                tree
            );
        }
    }]);

    return IngredientsPage;
}(React.Component);

export var IngredientTree = function (_React$Component2) {
    _inherits(IngredientTree, _React$Component2);

    function IngredientTree(props) {
        _classCallCheck(this, IngredientTree);

        return _possibleConstructorReturn(this, (IngredientTree.__proto__ || Object.getPrototypeOf(IngredientTree)).call(this, props));
    }

    _createClass(IngredientTree, [{
        key: 'render',
        value: function render() {
            var innerList = "";
            var percent = (this.props.ingredients.frequency * 100).toFixed(0) + "%";

            if (this.props.ingredients.rankedChildren.length > 0) {
                var childElements = this.props.ingredients.rankedChildren.map(function (c) {
                    return React.createElement(IngredientTree, { key: c.name, ingredients: c });
                });

                innerList = React.createElement(
                    'ul',
                    null,
                    childElements
                );
            }

            return React.createElement(
                'li',
                null,
                React.createElement(
                    'section',
                    { className: 'ingredientName' },
                    this.props.ingredients.name,
                    React.createElement(
                        'section',
                        { className: 'percent' },
                        percent
                    )
                ),
                innerList
            );
        }
    }]);

    return IngredientTree;
}(React.Component);