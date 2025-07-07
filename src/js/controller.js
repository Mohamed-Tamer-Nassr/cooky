// Importing necessary modules and polyfills
import 'core-js/stable'; // Polyfills for modern JavaScript features
import 'regenerator-runtime/runtime'; // Polyfills for async/await
// import icons from 'url:../img/icons.svg'; // Parcel 2
import * as model from './model.js'; // Importing the model module
import addRecipeView from './views/addRecipeView.js'; // Importing the add recipe view module
import bookMarksView from './views/bookMarksView.js'; // Importing the bookmarks view module
import paginationView from './views/paginationView.js'; // Importing the pagination view module
import recipeView from './views/recipeView.js'; // Importing the recipe view module
import resultView from './views/resultView.js'; // Importing the resultView
import searchView from './views/searchView.js'; // Importing the recipe view module
// Main controller function for handling recipe display
// if (module.hot) {
//   module.hot.accept(); // Accept hot module replacement for development
// }
const controllerRecipe = async function () {
  try {
    // Getting the ID from the URL hash
    const id = window.location.hash.slice(1);

    // If no ID is found in the URL, return immediately to prevent API call
    if (!id) return;
    recipeView.renderSpinner();

    // Render success message for the recipe view
    addRecipeView.renderMessage(model.state.recipe); // Render a success message in the add recipe view
    // resultView.update(model.state.search); // Update the search results view to show the current search state

    bookMarksView.update(model.state.bookmarks); // Update the bookmarks view to show the current bookmarks
    // Load the recipe data using the model
    await model.loadRecipe(id);

    // Render the recipe data to the view
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Catch any errors during recipe loading and render an error message
    recipeView.renderError(`${err.message}. Please try again later!`);
  }
};

const loadSearchResults = async function () {
  try {
    // Render a loading spinner for search results BEFORE fetching data
    resultView.renderSpinner();

    const query = searchView.getQuery(); // Get the search query from the search view
    if (!query) return; // If no query is provided, return immediately

    await model.loadSearchResult(query); // Load search results using the model

    // Render the search results for the new page
    resultView.render(model.getSearchResultsPage(1));

    // Render the pagination buttons for the new page
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err); // Use console.error for errors
    resultView.renderError(`Could not load search results: ${err.message}`);
  }
};
const controllerPagination = function (goToPage) {
  // Update the current page in the model's state
  model.state.search.page = goToPage;

  // Render the search results for the new page
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render the pagination buttons for the new page
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update servings in the model
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
  // render the updated recipe
  bookMarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookMarksView.render(model.state.bookmarks);
};
const controllerBookmark = function () {
  if (model.state.recipe.bookmarked) {
    // Use the model's deleteBookmark function!
    model.deleteBookmark(model.state.recipe.id);
    model.state.recipe.bookmarked = false;
  } else {
    model.addBookmark(model.state.recipe);
    model.state.recipe.bookmarked = true;
  }
  recipeView.update(model.state.recipe);
  bookMarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  // This function is called when the user clicks the bookmark button
  bookMarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    // Upload the new recipe (this sets model.state.recipe)
    await model.uploadRecipe(newRecipe);

    // Now model.state.recipe is defined!
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage(); // No need to pass model.state.recipe here

    bookMarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

// This function initializes the controller and sets up the event listeners
// It is called when the script is loaded
const init = function () {
  recipeView.handlerRender(controllerRecipe);
  bookMarksView.handlerRender(controlBookmarks);
  recipeView.handlerUpdateServings(controlServings);
  recipeView.handlerAddBookmark(controllerBookmark);
  searchView.handlerSearch(loadSearchResults);

  paginationView.addHandlerClick(controllerPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // Render bookmarks on page load
  controlBookmarks();
};
init();
