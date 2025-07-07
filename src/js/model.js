import { API_URL, KEY } from './config.js'; // Importing the API URL and API key from config
import { getJSON } from './helper.js'; // Importing the helper function for making API calls

// State object to hold application data
export const state = {
  recipe: {}, // Stores the currently loaded recipe
  search: {
    query: '', // Stores the current search query
    searchResults: [], // Stores the results of the last search
    resultPerPage: 15, // Number of results to display per page
    page: 1, // Current page number for pagination
  },
  bookmarks: [], // Stores bookmarked recipes
};

/**
 * Loads a recipe from the API based on its ID.
 * @param {string} id The ID of the recipe to load.
 */
export const loadRecipe = async function (id) {
  try {
    // Fetch recipe data from the API using the provided ID
    const data = await getJSON(`${API_URL}/${id}`);

    // Check if data, data.data, or data.data.recipe is missing
    if (!data || !data.data || !data.data.recipe) {
      throw new Error('Recipe not found'); // Throw an error if recipe data is incomplete
    }

    // Extract the recipe object from the API response
    let recipe = data.data.recipe;

    // Map the API recipe data to a more convenient format for the application state
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(b => b.id === id)) {
      // If the recipe is already bookmarked, set the bookmarked property to true
      state.recipe.bookmarked = true;
    } else {
      // If the recipe is not bookmarked, set the bookmarked property to false
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    // Re-throw the error to be handled by the calling function (e.g., in controller.js)
    throw err;
  }
};

/**
 * Loads search results from the API based on a query.
 * @param {string} query The search query string.
 */
export const loadSearchResult = async function (query) {
  try {
    // Fetch search results from the API
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query; // Store the current search query in state

    // Map the API search results to a more convenient format for the application state
    state.search.searchResults = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    // Log the error to the console for debugging
    console.error('Error in loadSearchResult:', err);
    // Re-throw the error to be handled by the calling function
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  // Validate the page number
  state.search.page = page; // Update the current page in state
  const start = (page - 1) * state.search.resultPerPage; // Calculate the starting index for the current page
  const end = page * state.search.resultPerPage; // Calculate the ending index for the current page
  return state.search.searchResults.slice(start, end); // Return the results for the current page
};

export const updateServings = function (newServings) {
  if (newServings < 1) return;
  state.recipe.ingredients.forEach(ing => {
    // Update each ingredient's quantity based on the new servings
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings; // Update the servings in the recipe state
  // Note: No need to return anything here, as the state is updated directly
};

const persistBookMarks = function () {
  // Save the bookmarks to local storage
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Your logic to add a bookmark
  state.bookmarks.push(recipe);
  // Optionally, you can also update the bookmarked property in the recipe
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true; // Mark the current recipe as bookmarked
  }
  persistBookMarks(); // Persist the updated bookmarks to local storage
};
export const deleteBookmark = function (id) {
  // Find the index of the bookmark to be deleted
  const index = state.bookmarks.findIndex(b => b.id === id);
  if (index !== -1) {
    // Remove the bookmark from the bookmarks array
    state.bookmarks.splice(index, 1);
  }
  // If the deleted bookmark was the current recipe, update its bookmarked status
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }
  persistBookMarks(); // Persist the updated bookmarks to local storage
};

const init = function () {
  // Load bookmarks from local storage when the application initializes
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage); // Parse the stored bookmarks and set them in state
  }
};
// Call the initialization function to load bookmarks
init();

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1].split(',').map(el => el.trim());
      if (ingArr.length !== 3 || !ingArr[2]) {
        throw new Error(
          'Wrong ingredient format! Please use the correct format: "Quantity,Unit,Description"'
        );
      }
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  try {
    // Corrected API call: Use the actual KEY constant
    const response = await fetch(`${API_URL}?key=${KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        servings: +newRecipe.servings,
        cooking_time: +newRecipe.cookingTime,
        ingredients,
      }),
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message} (${response.status})`);
    }

    const data = await response.json();

    state.recipe = {
      id: data.data.recipe.id,
      title: data.data.recipe.title,
      publisher: data.data.recipe.publisher,
      sourceUrl: data.data.recipe.source_url,
      image: data.data.recipe.image_url,
      servings: data.data.recipe.servings,
      cookingTime: data.data.recipe.cooking_time,
      ingredients: data.data.recipe.ingredients,
    };
    addBookmark(state.recipe);
  } catch (err) {
    console.error('Error in uploadRecipe:', err);
    throw err;
  }
};
