var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */
export var CuisinePicker = function (_React$Component) {
    _inherits(CuisinePicker, _React$Component);

    function CuisinePicker(props) {
        _classCallCheck(this, CuisinePicker);

        return _possibleConstructorReturn(this, (CuisinePicker.__proto__ || Object.getPrototypeOf(CuisinePicker)).call(this, props));
    }

    _createClass(CuisinePicker, [{
        key: "addCuisineButton",
        value: function addCuisineButton(cuisineName, isTop, isOther) {
            var cuisine = this.props.cuisines.find(function (c) {
                return c.name == cuisineName;
            });

            return React.createElement(CuisineButton, { key: cuisine.name, isTop: isTop, isOther: isOther, cuisine: cuisine, onCuisineToggled: this.props.onCuisineToggled });
        }
    }, {
        key: "showMoreButtonClicked",
        value: function showMoreButtonClicked() {
            document.getElementById("showMoreCuisinesButton").style["display"] = "none";

            var elements = document.getElementsByClassName("otherMatch");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    item.style["display"] = "inherit";
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
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var showMoreButton = "";
            var cuisineButtons = [];
            var title = "";
            var subTitle = "";

            if (this.props.isForIngredientsPage) {
                if (!this.props.cuisines) return "";

                title = "Browse Ingredients by Cuisine";
                subTitle = React.createElement(
                    "p",
                    null,
                    "Choose a cuisine to see which ingredients appear in the most recipes."
                );

                cuisineButtons.push(this.props.cuisines.map(function (c) {
                    return _this2.addCuisineButton(c.name, true, false);
                }));
            } else {
                title = "Which cuisines do you cook at home?";
                subTitle = React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "i",
                        null,
                        "(Optional)"
                    ),
                    " Choose the cuisines you usually cook and we'll suggest recipes using ingredients common to those cuisines."
                );

                if (!this.props.rankedCuisines || this.props.rankedCuisines.best.length == 0 && this.props.rankedCuisines.good.length == 0 && this.props.rankedCuisines.other.length == 0) return "";

                cuisineButtons.push(this.props.rankedCuisines.best.map(function (c) {
                    return _this2.addCuisineButton(c, true, false);
                }));
                cuisineButtons.push(this.props.rankedCuisines.good.map(function (c) {
                    return _this2.addCuisineButton(c, false, false);
                }));
                cuisineButtons.push(this.props.rankedCuisines.other.map(function (c) {
                    return _this2.addCuisineButton(c, false, true);
                }));

                showMoreButton = this.props.rankedCuisines.other.length > 0 ? React.createElement(
                    "li",
                    null,
                    React.createElement("input", { id: "showMoreCuisinesButton", type: "button", value: "Show more...", onClick: this.showMoreButtonClicked })
                ) : "";
            }

            return React.createElement(
                "section",
                { className: "whiteBox cuisinePicker" },
                React.createElement(
                    "h2",
                    null,
                    title
                ),
                subTitle,
                React.createElement(
                    "ul",
                    { className: "cuisineList" },
                    cuisineButtons,
                    showMoreButton
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
            if (this.props.isTop) {
                return React.createElement(
                    "li",
                    { className: "topMatch" },
                    React.createElement("input", { type: "button", value: this.props.cuisine.name, onClick: this.toggleCuisine, className: this.props.cuisine.selected ? "selected" : "" })
                );
            } else if (this.props.isOther) {
                return React.createElement(
                    "li",
                    { className: "otherMatch" },
                    React.createElement("input", { type: "button", value: this.props.cuisine.name, onClick: this.toggleCuisine, className: this.props.cuisine.selected ? "selected" : "" })
                );
            } else {
                return React.createElement(
                    "li",
                    null,
                    React.createElement("input", { type: "button", value: this.props.cuisine.name, onClick: this.toggleCuisine, className: this.props.cuisine.selected ? "selected" : "" })
                );
            }
        }
    }]);

    return CuisineButton;
}(React.Component);