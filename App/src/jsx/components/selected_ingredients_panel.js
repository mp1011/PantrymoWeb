var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var SelectedIngredientsPanel = function (_React$Component) {
    _inherits(SelectedIngredientsPanel, _React$Component);

    function SelectedIngredientsPanel(props) {
        _classCallCheck(this, SelectedIngredientsPanel);

        return _possibleConstructorReturn(this, (SelectedIngredientsPanel.__proto__ || Object.getPrototypeOf(SelectedIngredientsPanel)).call(this, props));
    }

    _createClass(SelectedIngredientsPanel, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var list = this.props.selectedIngredients.map(function (ing) {
                return React.createElement(SelectedIngredient, { key: ing, value: ing, onIngredientRemoved: _this2.props.onIngredientRemoved });
            });
            var suffix = "";
            var label = "What can I make with . . .";

            if (list.length > 0) {
                label = "What can I make with ";
                suffix = React.createElement(
                    "h2",
                    { className: "suffix" },
                    "?"
                );
            }

            return React.createElement(
                "section",
                null,
                React.createElement(
                    "h2",
                    null,
                    label
                ),
                React.createElement(
                    "ul",
                    { className: "ingredientsList" },
                    list
                ),
                suffix
            );
        }
    }]);

    return SelectedIngredientsPanel;
}(React.Component);

export var SelectedIngredient = function (_React$Component2) {
    _inherits(SelectedIngredient, _React$Component2);

    function SelectedIngredient(props) {
        _classCallCheck(this, SelectedIngredient);

        var _this3 = _possibleConstructorReturn(this, (SelectedIngredient.__proto__ || Object.getPrototypeOf(SelectedIngredient)).call(this, props));

        _this3.remove = _this3.remove.bind(_this3);
        return _this3;
    }

    _createClass(SelectedIngredient, [{
        key: "remove",
        value: function remove() {
            this.props.onIngredientRemoved(this.props.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "li",
                { className: "chosenIngredient", onClick: this.remove },
                React.createElement("input", { type: "button", value: this.props.value, onClick: this.remove }),
                React.createElement(
                    "p",
                    { className: "delimiter" },
                    "&"
                )
            );
        }
    }]);

    return SelectedIngredient;
}(React.Component);