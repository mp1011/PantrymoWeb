var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var BackToTopPanel = function (_React$Component) {
    _inherits(BackToTopPanel, _React$Component);

    function BackToTopPanel(props) {
        _classCallCheck(this, BackToTopPanel);

        var _this = _possibleConstructorReturn(this, (BackToTopPanel.__proto__ || Object.getPrototypeOf(BackToTopPanel)).call(this, props));

        _this.onScroll = _this.onScroll.bind(_this);
        _this.panelClicked = _this.panelClicked.bind(_this);
        _this.getScrollToTop = _this.getScrollToTop.bind(_this);
        _this.state = { shouldShow: false };
        return _this;
    }

    _createClass(BackToTopPanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('scroll', this.onScroll);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll);
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            if (!this.state) return;

            var scrollPosition = window.scrollY;
            var scrollToTop = this.getScrollToTop() + 200;

            var isShowing = this.state.shouldShow;
            if (isShowing && scrollPosition < scrollToTop - 100) this.setState({ shouldShow: false });else if (!isShowing && scrollPosition > scrollToTop) this.setState({ shouldShow: true });
        }
    }, {
        key: 'getScrollToTop',
        value: function getScrollToTop() {
            var ingredientPicker = document.getElementById("ingredientPickerContainer");
            if (!ingredientPicker) return 0;

            var screenTop = ingredientPicker.getBoundingClientRect().top;

            var actualTop = screenTop + document.documentElement.scrollTop;
            return actualTop;
        }
    }, {
        key: 'panelClicked',
        value: function panelClicked() {
            window.scrollTo(0, this.getScrollToTop());
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state && this.state.shouldShow) {
                return React.createElement(
                    'section',
                    { className: 'backToTopPanel', onClick: this.panelClicked },
                    'Back to top'
                );
            } else return "";
        }
    }]);

    return BackToTopPanel;
}(React.Component);