var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var AdvancedSearch = function (_React$Component) {
    _inherits(AdvancedSearch, _React$Component);

    function AdvancedSearch(props) {
        _classCallCheck(this, AdvancedSearch);

        return _possibleConstructorReturn(this, (AdvancedSearch.__proto__ || Object.getPrototypeOf(AdvancedSearch)).call(this, props));
    }

    _createClass(AdvancedSearch, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            if (!this.props.stats) return "";

            var filters = this.props.stats.traitStats.map(function (t) {
                return React.createElement(
                    "li",
                    { key: t.trait },
                    React.createElement(TraitSearchFilter, { traitStats: t, onSelectionToggled: _this2.props.onSelectionToggled })
                );
            });

            return React.createElement(
                "section",
                { className: "whiteBox advancedSearch" },
                React.createElement(
                    "ul",
                    { className: "traitFilter" },
                    filters
                )
            );
        }
    }]);

    return AdvancedSearch;
}(React.Component);

export var TraitSearchFilter = function (_React$Component2) {
    _inherits(TraitSearchFilter, _React$Component2);

    function TraitSearchFilter(props) {
        _classCallCheck(this, TraitSearchFilter);

        var _this3 = _possibleConstructorReturn(this, (TraitSearchFilter.__proto__ || Object.getPrototypeOf(TraitSearchFilter)).call(this, props));

        _this3.toggleSelection = _this3.toggleSelection.bind(_this3);
        _this3.openDropdown = _this3.openDropdown.bind(_this3);

        _this3.state = {
            values: []
        };
        return _this3;
    }

    _createClass(TraitSearchFilter, [{
        key: "openDropdown",
        value: function openDropdown() {
            var dropdown = document.getElementById("selector_" + this.props.traitStats.trait.replace("/", ""));
            if (!dropdown.className.includes("appear")) dropdown.className += " appear";

            var anyBtnId = "anybtn_" + this.props.traitStats.trait.replace("/", "");
            document.getElementById(anyBtnId).style["display"] = "none";

            this.setState({ dropDownOpen: true });
        }
    }, {
        key: "toggleSelection",
        value: function toggleSelection(evt) {
            var selection = evt.target.dataset.val;

            var selectedValues = this.state.values;
            if (!selectedValues.includes(selection)) {
                selectedValues.push(selection);
            } else {
                var index = selectedValues.indexOf(selection);
                selectedValues.splice(index, 1);
            }

            this.setState({ values: selectedValues });

            this.props.onSelectionToggled(this.props.traitStats.trait, selectedValues);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var dropdownId = "selector_" + this.props.traitStats.trait.replace("/", "");
            var anyBtnId = "anybtn_" + this.props.traitStats.trait.replace("/", "");

            var selectedValues = this.state.values;
            var anyButton = "";
            if (!this.state.dropDownOpen) anyButton = React.createElement("input", { id: anyBtnId, type: "button", onClick: this.openDropdown, value: "any" });

            var options = this.props.traitStats.traitValueStats.map(function (p) {
                var text = p.value + " (" + p.count + ")";
                var className = selectedValues.includes(p.value) ? "selected" : "";

                return React.createElement("input", { key: p.value, type: "button", onClick: _this4.toggleSelection, "data-val": p.value, className: className, value: text });
            });

            return React.createElement(
                "section",
                { className: "traitSearchFilter" },
                React.createElement(
                    "h1",
                    null,
                    this.props.traitStats.trait
                ),
                anyButton,
                React.createElement(
                    "ul",
                    { id: dropdownId, className: "dropdownOptions" },
                    options
                )
            );
        }
    }]);

    return TraitSearchFilter;
}(React.Component);