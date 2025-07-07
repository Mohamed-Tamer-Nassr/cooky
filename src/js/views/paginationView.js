import icons from '../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; // If no button is clicked, exit the function
      const goToPage = +btn.dataset.goto; // Get the page number from the button's data attribute
      handler(goToPage); // Call the handler function with the page number
    });
  }
  generateMarkup() {
    const currentPage = this.data.page;
    const numPages = Math.ceil(
      this.data.searchResults.length / this.data.resultPerPage
    );

    // Page 1, more pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;
    }

    // Last page, more than 1 page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
              </button>`;
    }

    // Middle pages
    if (currentPage > 1 && currentPage < numPages) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
              </button>
              <button data-goto="${
                currentPage + 1
              }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;
    }

    // Only 1 page
    return '';
  }
}

export default new PaginationView();
