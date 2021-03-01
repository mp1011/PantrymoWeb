var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var RecipesList = function (_React$Component) {
   _inherits(RecipesList, _React$Component);

   function RecipesList(props) {
      _classCallCheck(this, RecipesList);

      return _possibleConstructorReturn(this, (RecipesList.__proto__ || Object.getPrototypeOf(RecipesList)).call(this, props));
   }

   _createClass(RecipesList, [{
      key: "render",
      value: function render() {
         var _this2 = this;

         var loader = this.props.loading ? React.createElement(
            "section",
            { className: "loadingSpinner" },
            React.createElement(
               "section",
               { className: "recipeImage" },
               React.createElement("img", { src: "/style/stirring.gif", alt: "Finding recipes" })
            )
         ) : "";

         if (!this.props.loading && this.props.selectedIngredients.length > 0 && this.props.recipes.length == 0) {
            return React.createElement(
               "section",
               { className: "noResults" },
               React.createElement(
                  "p",
                  null,
                  "We didn't find any matches for all of those ingredients. Try starting with a ",
                  React.createElement(
                     "strong",
                     null,
                     "protein"
                  ),
                  ", a ",
                  React.createElement(
                     "strong",
                     null,
                     "vegetable"
                  ),
                  " and a ",
                  React.createElement(
                     "strong",
                     null,
                     "starch"
                  ),
                  "."
               )
            );
         } else {
            return React.createElement(
               "div",
               { id: "recipeListContainer" },
               React.createElement(
                  "ul",
                  { className: "recipeList" },
                  this.props.recipes.map(function (r) {
                     return React.createElement(Recipe, Object.assign({ key: r.key, debug: _this2.props.debug, selectedIngredients: _this2.props.selectedIngredients }, r));
                  }),
                  loader
               )
            );
         }
      }
   }]);

   return RecipesList;
}(React.Component);

export var Recipe = function (_React$Component2) {
   _inherits(Recipe, _React$Component2);

   function Recipe(props) {
      _classCallCheck(this, Recipe);

      var _this3 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

      _this3.getCssClass = _this3.getCssClass.bind(_this3);
      _this3.renderIngredient = _this3.renderIngredient.bind(_this3);
      return _this3;
   }

   _createClass(Recipe, [{
      key: "getCssClass",
      value: function getCssClass(ingredient) {
         if (this.props.selectedIngredients.includes(ingredient.name)) return "chosenIngredient";else if (ingredient.frequency >= 0.10) return "veryCommonIngredient";else if (ingredient.frequency >= 0.01) return "commonIngredient";else return "rareIngredient";
      }
   }, {
      key: "renderIngredient",
      value: function renderIngredient(ingredient) {
         if (this.props.debug) return React.createElement(
            "li",
            { key: ingredient.id, className: this.getCssClass(ingredient) },
            React.createElement(
               "span",
               null,
               React.createElement(
                  "p",
                  null,
                  ingredient.name.join(" or ")
               ),
               React.createElement(
                  "p",
                  null,
                  ingredient.originalText
               ),
               React.createElement(
                  "p",
                  null,
                  (ingredient.frequency * 100).toFixed(1)
               )
            )
         );else return React.createElement(
            "li",
            { key: ingredient.id, className: this.getCssClass(ingredient) },
            ingredient.name.join(" or ")
         );
      }
   }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
   }, {
      key: "render",
      value: function render() {
         if (this.props.isAdPlaceholder) {
            return React.createElement("section", { className: "recipe adpl" });
         }

         var namedIngredients = this.props.ingredients.filter(function (i) {
            return i.frequency > 0;
         });
         var unknownIngredients = this.props.ingredients.filter(function (i) {
            return i.frequency == 0;
         });

         var ingredients = namedIngredients.map(this.renderIngredient);

         if (unknownIngredients.length > 0) {
            if (this.props.debug) {
               ingredients.push(unknownIngredients.map(function (u) {
                  return React.createElement(
                     "li",
                     { className: "recipeIngredient", key: u.id },
                     u.name
                  );
               }));
            } else {
               ingredients.push(React.createElement(
                  "li",
                  { key: "extra" },
                  "+",
                  unknownIngredients.length,
                  " more"
               ));
            }
         }

         return React.createElement(
            "section",
            { className: "recipe" },
            React.createElement(
               "h1",
               null,
               React.createElement(
                  "a",
                  { target: "_blank", rel: "noopener noreferrer", href: this.props.url },
                  this.props.name
               )
            ),
            React.createElement(
               "h2",
               null,
               this.props.source
            ),
            React.createElement(
               "ul",
               { className: "ingredientsList" },
               ingredients
            ),
            React.createElement(
               "a",
               { target: "_blank", rel: "noopener noreferrer", className: "recipeImage", href: this.props.url },
               React.createElement("img", { src: this.props.image })
            ),
            this.props.debug ? React.createElement(
               "p",
               null,
               this.props.score
            ) : ""
         );
      }
   }]);

   return Recipe;
}(React.Component);