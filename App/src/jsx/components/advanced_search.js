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
            if (!this.props.stats) return "";

            var filters = this.props.stats.traitStats.map(function (t) {
                return React.createElement(TraitSearchFilter, { trait: t.trait });
            });

            return React.createElement(
                "section",
                { className: "whiteBox advancedSearch" },
                filters
            );
        }
    }]);

    return AdvancedSearch;
}(React.Component);

export var TraitSearchFilter = function (_React$Component2) {
    _inherits(TraitSearchFilter, _React$Component2);

    function TraitSearchFilter(props) {
        _classCallCheck(this, TraitSearchFilter);

        return _possibleConstructorReturn(this, (TraitSearchFilter.__proto__ || Object.getPrototypeOf(TraitSearchFilter)).call(this, props));
    }

    _createClass(TraitSearchFilter, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "p",
                null,
                this.props.trait
            );
        }
    }]);

    return TraitSearchFilter;
}(React.Component);