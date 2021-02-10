var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var CuisinePicker = function (_React$Component) {
    _inherits(CuisinePicker, _React$Component);

    function CuisinePicker(props) {
        _classCallCheck(this, CuisinePicker);

        return _possibleConstructorReturn(this, (CuisinePicker.__proto__ || Object.getPrototypeOf(CuisinePicker)).call(this, props));
    }

    _createClass(CuisinePicker, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var cuisines = Object.values(this.props.cuisines).map(function (c) {
                return React.createElement(CuisineButton, { key: c.name, cuisine: c, onCuisineToggled: _this2.props.onCuisineToggled });
            });

            return React.createElement(
                "section",
                { className: "whiteBox cuisinePicker" },
                React.createElement(
                    "h2",
                    null,
                    "Which cuisines do you cook at home?"
                ),
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "i",
                        null,
                        "(Optional)"
                    ),
                    " Choose the cuisines you usually cook and we'll suggest recipes using ingredients common to those cuisines."
                ),
                React.createElement(
                    "ul",
                    { className: "cuisineList" },
                    cuisines
                )
            );
        }
    }]);

    return CuisinePicker;
}(React.Component);

export var CuisineButton = function (_React$Component2) {
    _inherits(CuisineButton, _React$Component2);

    function CuisineButton(props) {
        _classCallCheck(this, CuisineButton);

        var _this3 = _possibleConstructorReturn(this, (CuisineButton.__proto__ || Object.getPrototypeOf(CuisineButton)).call(this, props));

        _this3.toggleCuisine = _this3.toggleCuisine.bind(_this3);
        return _this3;
    }

    _createClass(CuisineButton, [{
        key: "toggleCuisine",
        value: function toggleCuisine() {
            var _this4 = this;

            this.setState(function (state, props) {
                props.cuisine.selected = !props.cuisine.selected;
                props.onCuisineToggled(_this4.props.cuisine);

                return {};
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "li",
                null,
                React.createElement("input", { type: "button", value: this.props.cuisine.name, onClick: this.toggleCuisine, className: this.props.cuisine.selected ? "selected" : "" })
            );
        }
    }]);

    return CuisineButton;
}(React.Component);