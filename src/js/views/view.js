import icons from 'url:../../img/icons.svg'; // Parcel 2
/**
 * Base class for rendering views in the application.
 * Provides methods to render data, show loading spinners, and display error messages.
 */

export default class View {
  data;
  /**
   * Renders the provided data in the view.
   * @param {*} data The data to render.
   * If no data is provided, an error message is displayed.
   * @returns {void}
   * @throws Will throw an error if the data is invalid or empty.
   * @example
   * const view = new View();
   * view.render(data); // Renders the data in the view
   * @example
   * view.renderError('No data found!'); // Displays an error message if no data
   */
  render(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError('No data found!'); // If no data is provided, render an error message
    this.data = data;
    const markup = this.generateMarkup();
    // Clear the parent element and insert the new markup
    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError('No data found!'); // If no data is provided, render an error message
    this.data = data;
    const newMarkup = this.generateMarkup();
    // Create a temporary DOM element to compare the new markup with the existing one
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    // Compare the new elements with the current elements and update only changed ones
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Update changed text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  /**
   * Renders a loading spinner in the parent element.
   */
  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> `;
    this.parentElement.innerHTML = ''; // Clear previous content
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders an error message in the parent element.
   * @param {string} message The error message to display. Defaults to 'Something went wrong!'.
   */
  renderError(message = 'Something went wrong!') {
    // FIX: Changed 'massage' to 'message'
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this.parentElement.innerHTML = ''; // Clear previous content
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
