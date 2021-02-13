var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/react-in-jsx-scope */
import { RecipeAppApi } from '/src/services/recipeapp_api.js';
import { CuisinePicker } from '/src/jsx/components/cuisine_picker.js';
import { IngredientInputBox } from '/src/jsx/components/ingredient_input_box.js';
import { BackToTopPanel } from '/src/jsx/components/back_to_top_panel.js';
import { SelectedIngredientsPanel } from '/src/jsx/components/selected_ingredients_panel.js';
import { RecipesList } from '/src/jsx/components/recipes_list.js';
import { StateHandler } from '/src/services/state_handler.js';
import { getRecipeScore } from '/src/services/recipe_scoring_service.js';
import { settings } from '/src/app_settings.mjs';

// eslint-disable-next-line no-undef
export var RecipeApp = function (_React$Component) {
    _inherits(RecipeApp, _React$Component);

    function RecipeApp(props) {
        _classCallCheck(this, RecipeApp);

        var _this = _possibleConstructorReturn(this, (RecipeApp.__proto__ || Object.getPrototypeOf(RecipeApp)).call(this, props));

        _this.onIngredientAdded = _this.onIngredientAdded.bind(_this);
        _this.onIngredientRemoved = _this.onIngredientRemoved.bind(_this);
        _this.updateRecipes = _this.updateRecipes.bind(_this);
        _this.onCuisineToggled = _this.onCuisineToggled.bind(_this);
        _this.addFetchedPage = _this.addFetchedPage.bind(_this);
        _this.addRecipes = _this.addRecipes.bind(_this);
        _this.fetchMore = _this.fetchMore.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        _this.setInitialState = _this.setInitialState.bind(_this);
        _this.applyScores = _this.applyScores.bind(_this);
        _this.handleError = _this.handleError.bind(_this);
        _this.prepareSite = _this.prepareSite.bind(_this);
        _this.getIndexOfFirstRecipeBelowWindow = _this.getIndexOfFirstRecipeBelowWindow.bind(_this);
        _this.sortRecipesBelowWindow = _this.sortRecipesBelowWindow.bind(_this);
        _this.scrollToFirstResultIfNeeded = _this.scrollToFirstResultIfNeeded.bind(_this);
        _this.insertAds = _this.insertAds.bind(_this);
        _this.updateCuisines = _this.updateCuisines.bind(_this);

        var httpUtility = props.httpUtility;
        var stateHandler = new StateHandler();
        var recipeAppApi = new RecipeAppApi(httpUtility);

        _this.state = {
            selectedIngredients: [],
            cuisines: [],
            recipePages: [],
            recipes: [],
            httpUtility: httpUtility,
            recipeAppApi: recipeAppApi,
            stateHandler: stateHandler,
            debug: settings.debugMode
        };
        return _this;
    }

    _createClass(RecipeApp, [{
        key: 'handleError',
        value: function handleError(e) {
            //temporary
            alert("ERROR! " + e);
        }
    }, {
        key: 'onIngredientAdded',
        value: function onIngredientAdded(ingredient) {
            var ingredients = this.state.selectedIngredients;
            if (ingredients.includes(ingredient)) return;

            ingredients.push(ingredient);

            this.updateCuisines(ingredients);
            this.updateRecipes(ingredients, true);
        }
    }, {
        key: 'updateCuisines',
        value: function updateCuisines(ingredients) {
            var _this2 = this;

            this.state.recipeAppApi.getCuisinesByIngredients(ingredients).then(function (cuisineNames) {

                var cuisines = _this2.state.cuisines;
                var orderedCuisines = cuisineNames.map(function (c) {
                    return cuisines.find(function (p) {
                        return p.name == c;
                    });
                });

                _this2.setState({ cuisines: orderedCuisines });
            });
        }
    }, {
        key: 'updateRecipes',
        value: function updateRecipes(ingredients, autoScroll) {
            var selectedCuisines = this.state.cuisines.filter(function (c) {
                return c.selected;
            });
            this.state.stateHandler.onIngredientsChanged(ingredients);

            if (ingredients.length == 0) {
                this.setState({ recipes: [], recipePages: [], selectedIngredients: [], loadingRecipes: false, autoScroll: false });
                return;
            }

            this.setState({ loadingRecipes: true, autoScroll: autoScroll });
            this.setState({ recipes: [], recipePages: [], selectedIngredients: ingredients });
            this.state.recipeAppApi.recipeSearch(ingredients, selectedCuisines, 1).catch(this.handleError).then(this.applyScores).then(this.addFetchedPage);
        }
    }, {
        key: 'addFetchedPage',
        value: function addFetchedPage(recipeResult) {
            console.log('Found ' + recipeResult.recipes.length + ' recipes on page ' + recipeResult.page + ' of results');
            var pages = this.state.recipePages;

            var page = pages.filter(function (p) {
                return p.page == recipeResult.page;
            });
            if (page.length == 1) {
                page[0].loaded = true;
                page[0].recipes = recipeResult.recipes;
            } else pages.push(recipeResult);

            this.addRecipes(recipeResult.recipes);
        }
    }, {
        key: 'applyScores',
        value: function applyScores(result) {
            result.recipes.forEach(function (r) {
                r.score = getRecipeScore(r);
            });

            result.recipes = result.recipes.sort(function (a, b) {
                return b.score - a.score;
            });

            return result;
        }
    }, {
        key: 'addRecipes',
        value: function addRecipes(unfilteredRecipes) {
            var filteredRecipes = unfilteredRecipes.filter(function (r) {
                return r.score >= 0;
            });
            var pages = this.state.recipePages;

            if (filteredRecipes.length > 0) {
                console.log('Filtered to ' + filteredRecipes.length + ' recipes');
            } else if (unfilteredRecipes.length == 0) {
                console.log("No more recipes, adding remainder");
                filteredRecipes = [];
                pages.forEach(function (p) {
                    filteredRecipes = filteredRecipes.concat(p.recipes.filter(function (r) {
                        return r.score < 0;
                    }));
                });

                filteredRecipes = filteredRecipes.sort(function (a, b) {
                    return b.score - a.score;
                });
                this.setState({ loadingRecipes: false });
            } else {
                console.log("Did not find any valid recipes on page, fetching next page");
                this.fetchMore();
                return;
            }

            var recipesToDisplay = this.state.recipes.concat(filteredRecipes).groupBy(function (rec) {
                return rec.url;
            }).getValues().map(function (g) {
                return g[0];
            });

            recipesToDisplay = this.sortRecipesBelowWindow(recipesToDisplay);
            recipesToDisplay = this.insertAds(recipesToDisplay);

            this.setState({ recipePages: pages, recipes: recipesToDisplay });

            if (unfilteredRecipes.length > 0 && filteredRecipes.length < 5) this.fetchMore();
        }
    }, {
        key: 'fetchMore',
        value: function fetchMore() {
            if (this.state.selectedIngredients.length == 0) return;

            var pages = this.state.recipePages;

            if (pages.filter(function (p) {
                return !p.loaded;
            }).length > 0) return;

            //if any negative scored recipes are being shown, we've already fetched as much as we can
            if (this.state.recipes.filter(function (p) {
                return p.score < 0;
            }).length > 0) return;

            var nextPage = 1;
            if (pages && pages.length >= 1) {
                var pageNumbers = pages.map(function (p) {
                    return p.page;
                });
                nextPage = pageNumbers[pageNumbers.length - 1] + 1;
            }

            console.log('Fetching page ' + nextPage + ' of recipes');

            pages.push({ page: nextPage, loaded: false, recipes: [] });

            this.setState({ recipePages: pages, loadingRecipes: true });

            var selectedCuisines = this.state.cuisines.filter(function (c) {
                return c.selected;
            });

            this.state.recipeAppApi.recipeSearch(this.state.selectedIngredients, selectedCuisines, nextPage).catch(this.handleError).then(this.applyScores).then(this.addFetchedPage);
        }
    }, {
        key: 'onIngredientRemoved',
        value: function onIngredientRemoved(ingredient) {
            var ingredients = this.state.selectedIngredients.filter(function (ing) {
                return ing != ingredient;
            });
            this.updateRecipes(ingredients, true);
            this.updateCuisines(ingredients);
        }
    }, {
        key: 'onCuisineToggled',
        value: function onCuisineToggled(cuisine) {
            var allLoadedRecipes = [];
            this.setState({ recipes: [] });
            this.state.recipePages.forEach(function (pg) {
                return allLoadedRecipes = allLoadedRecipes.concat(pg.recipes);
            });

            this.state.stateHandler.onCuisineToggled(cuisine);
            this.updateRecipes(this.state.selectedIngredients, false);
        }
    }, {
        key: 'scrollToFirstResultIfNeeded',
        value: function scrollToFirstResultIfNeeded() {
            var recipePanel = document.getElementById("recipeListContainer");
            var recipePanelScreenTop = recipePanel.getBoundingClientRect().top;

            if (recipePanelScreenTop > document.documentElement.clientHeight * 0.9) {
                var ingredientPicker = document.getElementById("ingredientPickerContainer");
                var screenTop = ingredientPicker.getBoundingClientRect().top;

                var actualTop = screenTop + document.documentElement.scrollTop;
                window.scrollTo(0, actualTop);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.autoScroll && this.state.recipes.length > 0) this.scrollToFirstResultIfNeeded();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.prepareSite();
            window.addEventListener('scroll', this.onScroll);
        }
    }, {
        key: 'prepareSite',
        value: function prepareSite() {
            var _this3 = this;

            this.state.recipeAppApi.getCuisineNames().catch(function (e) {
                console.log(e);
            }).then(function (names) {
                if (names && names.length > 0) {
                    var cuisines = names.map(function (n) {
                        return { name: n, selected: false };
                    });
                    _this3.setState({ cuisines: cuisines, isSiteReady: true });
                    _this3.setInitialState();
                } else {
                    _this3.setState({ cuisines: [], isSiteReady: false });
                    setTimeout(_this3.prepareSite, 1000);
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll);
        }
    }, {
        key: 'setInitialState',
        value: function setInitialState() {
            var initialState = this.state.stateHandler.getInitialState();

            var cuisines = this.state.cuisines;

            if (initialState.selectedCuisines.length > 0) {
                initialState.selectedCuisines.forEach(function (c) {
                    cuisines.find(function (p) {
                        return p.name == c;
                    }).selected = true;
                });

                this.setState({ cuisines: cuisines });
            }

            if (initialState.selectedIngredients.length > 0) {
                this.updateRecipes(initialState.selectedIngredients, false);
            }
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            var totalHeight = document.documentElement.scrollHeight;
            var scrollPosition = window.scrollY + document.documentElement.clientHeight;
            var percent = scrollPosition / totalHeight;

            if (percent > 0.7) this.fetchMore();
        }
    }, {
        key: 'sortRecipesBelowWindow',
        value: function sortRecipesBelowWindow(recipes) {
            var firstIndexToSort = this.getIndexOfFirstRecipeBelowWindow();
            if (firstIndexToSort < 0) return recipes;

            var recipesInOrAboveWindow = recipes.slice(0, firstIndexToSort);
            var recipesBelowWindow = recipes.slice(firstIndexToSort).sort(function (a, b) {
                return b.score - a.score;
            });

            var mergedRecipes = recipesInOrAboveWindow.concat(recipesBelowWindow);
            return mergedRecipes;
        }
    }, {
        key: 'insertAds',
        value: function insertAds(recipes) {
            if (settings.adEvery <= 0) return recipes;

            var index = 0;
            while (index < recipes.length) {
                var shouldBeAd = (index + 1) % settings.adEvery == 0;
                if (!shouldBeAd && recipes[index].isAdPlaceholder) {
                    recipes.splice(index, 1);
                } else if (shouldBeAd && !recipes[index].isAdPlaceholder) {
                    recipes.splice(index, 0, { isAdPlaceholder: true, key: "ad_" + index });
                } else {
                    index++;
                }
            }

            return recipes;
        }
    }, {
        key: 'getIndexOfFirstRecipeBelowWindow',
        value: function getIndexOfFirstRecipeBelowWindow() {
            var index = 0;
            var foundResult = false;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = document.getElementsByClassName("recipe")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    if (!foundResult) {
                        var top = element.getBoundingClientRect().top;
                        if (top > window.innerHeight + 200) foundResult = true;else index++;
                    }
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

            return index;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.isSiteReady) {
                return React.createElement(
                    'section',
                    null,
                    React.createElement(
                        'section',
                        { className: 'whiteBox', id: 'ingredientPickerContainer' },
                        React.createElement(
                            'h2',
                            null,
                            'Tell us what ingredients you have and we\'ll find recipes you can cook!'
                        ),
                        React.createElement(IngredientInputBox, { onIngredientAdded: this.onIngredientAdded, recipeAppApi: this.state.recipeAppApi, selectedIngredients: this.state.selectedIngredients }),
                        React.createElement(SelectedIngredientsPanel, { selectedIngredients: this.state.selectedIngredients, onIngredientRemoved: this.onIngredientRemoved })
                    ),
                    React.createElement(CuisinePicker, { cuisines: this.state.cuisines, onCuisineToggled: this.onCuisineToggled }),
                    React.createElement(BackToTopPanel, null),
                    React.createElement(RecipesList, { loading: this.state.loadingRecipes, recipes: this.state.recipes, selectedIngredients: this.state.selectedIngredients, debug: this.state.debug })
                );
            } else {
                return React.createElement(
                    'p',
                    { className: 'notReady' },
                    'Please wait...'
                );
            }
        }
    }]);

    return RecipeApp;
}(React.Component);