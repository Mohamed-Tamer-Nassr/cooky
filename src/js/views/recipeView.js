// Importing the icons for SVG usage
import Fraction from 'fraction.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './view.js'; // Importing the base view class

class recipeView extends View {
  parentElement = document.querySelector('.recipe');

  /**
   * Renders the given data into the parent element.
   * @param {Object} data The data to render (e.g., recipe object).
   */

  /**
   * Attaches event listeners to the window for 'hashchange' and 'load' events.
   * @param {function} handler The function to call when the events occur.
   */
  handlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  handlerUpdateServings(handler) {
    this.parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo < 1) return;
      handler(updateTo);
    });
  }
  handlerAddBookmark(handler) {
    this.parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return; // If no button is clicked, exit the function
      handler(); // Call the handler function to toggle bookmark
    });
  }
  /**
   * Generates the HTML markup for displaying a recipe.
   * @returns {string} The HTML markup.
   */
  generateMarkup() {
    // Rendering recipe
    return `<figure class="recipe__fig">
                <img src="${this.data.image}" alt="${
      this.data.title
    }" class="recipe__img" />
                <h1 class="recipe__title">
                  <span>${this.data.title}</span>
                </h1>
              </figure>
      
              <div class="recipe__details">
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${
                    this.data.cookingTime
                  }</span>
                  <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${
                    this.data.servings
                  }</span>
                  <span class="recipe__info-text">servings</span>
      
                  <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update-to="${
                      this.data.servings - 1
                    }">
                      <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                      </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update-to="${
                      this.data.servings + 1
                    }">
                      <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                      </svg>
                    </button>
                  </div>
                </div>
      
                <div class="recipe__user-generated">
                
                </div>
                <button class="btn--round btn--bookmark">
                  <svg class="">
                    <use href="${icons}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
                  </svg>
                </button>
              </div>
      
              <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${
                  Array.isArray(this.data.ingredients)
                    ? this.data.ingredients
                        .map(
                          ing => `  
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit ?? ''}</span>
                ${ing.description}
              </div>      
            </li>
          `
                        )
                        .join('')
                    : '<li>No ingredients found.</li>'
                }
      
              
                </ul>
              </div>
      
              <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">${
                    this.data.publisher
                  }</span>. Please check out
                  directions at their website.
                </p>
                <a
                  class="btn--small recipe__btn"
                  href="${this.data.sourceUrl}"
                  target="_blank"
                >
                  <span>Directions</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
                </a>
              </div>`;
  }
}
export default new recipeView();
