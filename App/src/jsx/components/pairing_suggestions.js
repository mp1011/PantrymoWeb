var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var PairingSuggestionsPanel = function (_React$Component) {
    _inherits(PairingSuggestionsPanel, _React$Component);

    function PairingSuggestionsPanel(props) {
        _classCallCheck(this, PairingSuggestionsPanel);

        return _possibleConstructorReturn(this, (PairingSuggestionsPanel.__proto__ || Object.getPrototypeOf(PairingSuggestionsPanel)).call(this, props));
    }

    _createClass(PairingSuggestionsPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.suggestedPairings.length == 0) return "";

            var ingredients = this.props.suggestedPairings.map(function (p) {
                return React.createElement(Pairing, { key: p.pairedIngredient, ingredient: p.pairedIngredient, onSuggestedIngredientSelected: _this2.props.onSuggestedIngredientSelected });
            });

            return React.createElement(
                'section',
                { className: 'pairingSuggestions' },
                React.createElement(
                    'p',
                    null,
                    'May we suggest:'
                ),
                React.createElement(
                    'ul',
                    null,
                    ingredients
                )
            );
        }
    }]);

    return PairingSuggestionsPanel;
}(React.Component);

export var Pairing = function (_React$Component2) {
    _inherits(Pairing, _React$Component2);

    function Pairing(props) {
        _classCallCheck(this, Pairing);

        var _this3 = _possibleConstructorReturn(this, (Pairing.__proto__ || Object.getPrototypeOf(Pairing)).call(this, props));

        _this3.onSuggestedIngredientSelected = _this3.onSuggestedIngredientSelected.bind(_this3);
        return _this3;
    }

    _createClass(Pairing, [{
        key: 'onSuggestedIngredientSelected',
        value: function onSuggestedIngredientSelected() {
            this.props.onSuggestedIngredientSelected(this.props.ingredient);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                React.createElement('input', { type: 'button', onClick: this.onSuggestedIngredientSelected, value: this.props.ingredient })
            );
        }
    }]);

    return Pairing;
}(React.Component);