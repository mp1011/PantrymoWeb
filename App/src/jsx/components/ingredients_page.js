var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { RecipeAppApi } from '/src/services/recipeapp_api.js';
import { CuisinePicker } from '/src/jsx/components/cuisine_picker.js';
import { isMobileScreenSize } from '/src/services/general.js';

// eslint-disable-next-line no-undef
export var IngredientsPage = function (_React$Component) {
    _inherits(IngredientsPage, _React$Component);

    function IngredientsPage(props) {
        _classCallCheck(this, IngredientsPage);

        var _this = _possibleConstructorReturn(this, (IngredientsPage.__proto__ || Object.getPrototypeOf(IngredientsPage)).call(this, props));

        var httpUtility = props.httpUtility;
        var recipeAppApi = new RecipeAppApi(httpUtility);
        _this.onCuisineToggled = _this.onCuisineToggled.bind(_this);
        _this.alignRows = _this.alignRows.bind(_this);
        _this.onResize = _this.onResize.bind(_this);
        _this.layoutItems = _this.layoutItems.bind(_this);
        _this.onLayoutChanged = _this.onLayoutChanged.bind(_this);
        _this.state = {
            httpUtility: httpUtility,
            recipeAppApi: recipeAppApi
        };
        return _this;
    }

    _createClass(IngredientsPage, [{
        key: 'alignRows',
        value: function alignRows(upperRow, lowerRow) {
            var column = 0;

            while (column < upperRow.length && column < lowerRow.length) {
                var upperItem = upperRow[column];
                var lowerItem = lowerRow[column];

                var upperPos = upperItem.getBoundingClientRect();
                var lowerPos = lowerItem.getBoundingClientRect();

                var gap = lowerPos.y - (upperPos.y + upperPos.height) - 16;
                if (gap > 0) lowerItem.style.top = '-' + gap + 'px';

                column++;
            }
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.layoutItems();
        }
    }, {
        key: 'layoutItems',
        value: function layoutItems() {
            var nodes = [].slice.call(document.getElementsByClassName("topNode"));
            nodes.forEach(function (n) {
                n.style.top = null;
            });

            var rows = nodes.groupBy(function (n) {
                return n.getBoundingClientRect().y;
            }).getValues();

            if (rows.length > 1) this.alignRows(rows[0], rows[1]);

            if (rows.length > 2) this.alignRows(rows[1], rows[2]);

            if (rows.length > 3) this.alignRows(rows[2], rows[3]);
        }
    }, {
        key: 'onLayoutChanged',
        value: function onLayoutChanged() {
            setTimeout(this.layoutItems, 0);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            window.addEventListener('resize', this.onResize);

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
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.layoutItems();

            if (this.state.rankedIngredients && isMobileScreenSize()) {
                var legendElement = document.getElementById("ingredientsLegend");
                if (legendElement) legendElement.scrollIntoView();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.onResize);
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

            this.setState({ selectedCuisine: cuisine.name });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            if (!this.state.cuisines) return "";

            var ingredientsTreeMain = document.getElementById("ingredientsTreeMain");
            if (ingredientsTreeMain) {
                ingredientsTreeMain.style.height = "inherit";
                var padding = [].slice.call(document.getElementsByClassName("ingredientTreePadding"));
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = padding[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        item.parentNode.removeChild(item);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            var tree = "";
            var legend = "";

            if (this.state.rankedIngredients) {
                var list = this.state.rankedIngredients.rankedChildren.map(function (c) {
                    return React.createElement(IngredientTree, { key: c.name,
                        ingredients: c,
                        selectedCuisine: _this4.state.selectedCuisine,
                        onLayoutChanged: _this4.onLayoutChanged,
                        depth: 1 });
                });

                tree = React.createElement(
                    'section',
                    { id: 'ingredientsTreeContainer' },
                    React.createElement(
                        'ul',
                        { id: 'ingredientsTreeMain', className: 'ingredientsTree' },
                        list
                    )
                );

                legend = React.createElement(
                    'ul',
                    { id: 'ingredientsLegend', className: 'ingredientsLegend whiteBox' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'p',
                            { className: 'stars' },
                            '\u2606\u2606\u2606\u2606'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '- Used in at least half of all recipes'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'p',
                            { className: 'stars' },
                            '\u2606\u2606\u2606'
                        ),
                        ' ',
                        React.createElement(
                            'p',
                            null,
                            '- Used in at least a quarter of all recipes'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'p',
                            { className: 'stars' },
                            '\u2606\u2606'
                        ),
                        ' ',
                        React.createElement(
                            'p',
                            null,
                            '- Used in at least 10% of recipes'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'p',
                            { className: 'stars' },
                            '\u2606'
                        ),
                        ' ',
                        React.createElement(
                            'p',
                            null,
                            '- Used in at least 2% of recipes'
                        )
                    )
                );
            }

            return React.createElement(
                'section',
                null,
                React.createElement(CuisinePicker, { isForIngredientsPage: 'true', cuisines: this.state.cuisines, onCuisineToggled: this.onCuisineToggled }),
                legend,
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

        var _this5 = _possibleConstructorReturn(this, (IngredientTree.__proto__ || Object.getPrototypeOf(IngredientTree)).call(this, props));

        _this5.showMoreButtonClicked = _this5.showMoreButtonClicked.bind(_this5);
        _this5.shouldHide = _this5.shouldHide.bind(_this5);
        return _this5;
    }

    _createClass(IngredientTree, [{
        key: 'showMoreButtonClicked',
        value: function showMoreButtonClicked(e) {
            var parentList = e.target.parentElement.parentElement;

            var listItems = parentList.getElementsByTagName("li");
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = listItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item.style["display"] == "none") {
                        item.style["display"] = "inherit";
                        item.className += " appear";
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            e.target.style.display = "none";
            this.props.onLayoutChanged();
        }
    }, {
        key: 'shouldHide',
        value: function shouldHide(item, thisIndex, totalCount) {
            var maxItemsPerNode = this.props.depth == 1 ? 10 : 5;
            if (isMobileScreenSize()) maxItemsPerNode = 10000;

            if (thisIndex < maxItemsPerNode) return false;

            //allow if its the last item in the list, and it has no children
            if (totalCount == maxItemsPerNode + 1 && thisIndex == totalCount - 1 && item.rankedChildren.length == 0) return false;

            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var displayStyle = {};

            if (this.props.shouldHide) {
                displayStyle = { display: 'none' };
            } else {
                displayStyle = { order: this.props.column };
            }

            var innerList = "";
            var percent = "";
            if (this.props.ingredients.frequency < 0.1) percent = "☆";else if (this.props.ingredients.frequency < 0.25) percent = "☆☆";else if (this.props.ingredients.frequency < 0.5) percent = "☆☆☆";else percent = "☆☆☆☆";

            var colorClass = "";
            if (this.props.ingredients.frequency >= 0.5) colorClass = "green";else if (this.props.ingredients.frequency >= 0.1) colorClass = "yellow";else if (this.props.ingredients.frequency > 0) colorClass = "orange";else colorClass = "hide";

            if (this.props.ingredients.rankedChildren.length > 0) {
                var itemCount = this.props.ingredients.rankedChildren.length;
                var childElements = this.props.ingredients.rankedChildren.map(function (c, ix) {
                    return React.createElement(IngredientTree, { key: c.name,
                        shouldHide: _this6.shouldHide(c, ix, itemCount),
                        ingredients: c,
                        selectedCuisine: _this6.props.selectedCuisine,
                        onLayoutChanged: _this6.props.onLayoutChanged,
                        depth: _this6.props.depth + 1 });
                });

                if (childElements.some(function (p) {
                    return p.props.shouldHide;
                })) childElements.push(React.createElement(
                    'li',
                    { key: 'showMore', className: 'showMoreContainer' },
                    React.createElement('input', { type: 'button', value: '\u25BC Show more...', className: 'showMoreIngredients', onClick: this.showMoreButtonClicked })
                ));

                innerList = React.createElement(
                    'ul',
                    null,
                    childElements
                );
            } else colorClass += " finalNode";

            if (this.props.depth == 1) colorClass += " topNode";

            return React.createElement(
                'li',
                { className: colorClass, style: displayStyle },
                React.createElement(
                    'a',
                    { href: '/#ingredients=' + this.props.ingredients.name + '&cuisines=' + this.props.selectedCuisine, className: 'ingredientName' },
                    this.props.ingredients.name,
                    React.createElement(
                        'section',
                        { className: "percent" },
                        percent
                    )
                ),
                innerList
            );
        }
    }]);

    return IngredientTree;
}(React.Component);