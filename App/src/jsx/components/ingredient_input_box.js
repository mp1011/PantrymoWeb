var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import '/node_modules/autocompleter/autocomplete.js';
import * as Constants from '/src/constants.mjs';

// eslint-disable-next-line no-undef
export var IngredientInputBox = function (_React$Component) {
    _inherits(IngredientInputBox, _React$Component);

    function IngredientInputBox(props) {
        _classCallCheck(this, IngredientInputBox);

        var _this = _possibleConstructorReturn(this, (IngredientInputBox.__proto__ || Object.getPrototypeOf(IngredientInputBox)).call(this, props));

        _this.onItemSelected = _this.onItemSelected.bind(_this);
        _this.suggestIngredients = _this.suggestIngredients.bind(_this);
        _this.addCurrentSelection = _this.addCurrentSelection.bind(_this);
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        _this.getPlaceholderText = _this.getPlaceholderText.bind(_this);
        _this.state = { text: "", selectedIngredients: [] };
        return _this;
    }

    _createClass(IngredientInputBox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var input = document.getElementById("ingredientPicker");

            // eslint-disable-next-line no-undef
            autocomplete({
                input: input,
                fetch: this.suggestIngredients,
                onSelect: this.onItemSelected
            });
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(evt) {
            if (evt.keyCode === Constants.KeyCode_Enter) {
                var text = document.getElementById("ingredientPicker").value;
                if (text && text.length > 0) {
                    this.onItemSelected({ label: text });
                }
            }
        }
    }, {
        key: 'onItemSelected',
        value: function onItemSelected(item) {
            this.props.onIngredientAdded(item.label);
            document.getElementById("ingredientPicker").value = "";
        }
    }, {
        key: 'suggestIngredients',
        value: function suggestIngredients(text, update) {
            if (text == this.lastSuggestion) return;
            this.lastSuggestion = text;

            var currentText = document.getElementById("ingredientPicker").value;
            if (currentText.length == 0) return;

            var selectedIngredients = this.props.selectedIngredients;
            this.props.recipeAppApi.ingredientSearch(text).then(function (suggestions) {
                var currentText = document.getElementById("ingredientPicker").value;
                if (currentText.length == 0) return;

                update(suggestions.filter(function (x) {
                    return !selectedIngredients.includes(x);
                }).map(function (s) {
                    return { "label": s, "value": s };
                }));
            });
        }
    }, {
        key: 'addCurrentSelection',
        value: function addCurrentSelection() {
            var text = document.getElementById("ingredientPicker").value;
            if (text) {
                this.props.onIngredientAdded(text);
                document.getElementById("ingredientPicker").value = "";
            }
        }
    }, {
        key: 'getPlaceholderText',
        value: function getPlaceholderText() {
            if (this.props.selectedIngredients.length > 0) return "add another...";else return "add ingredient...";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('input', {
                placeholder: this.getPlaceholderText(),
                id: 'ingredientPicker',
                onKeyUp: this.onKeyUp,
                onBlur: this.addCurrentSelection,
                autoComplete: 'off' });
        }
    }]);

    return IngredientInputBox;
}(React.Component);