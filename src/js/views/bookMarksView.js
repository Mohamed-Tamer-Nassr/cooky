import View from './view.js';

class bookmarkView extends View {
  parentElement = document.querySelector('.bookmarks__list'); // The parent element where bookmarks will be rendered

  handlerRender(handler) {
    // Adds an event listener to the parent element for rendering bookmarks
    window.addEventListener('load', handler()); // Calls the handler function to get bookmarks and renders them
  }
  generateMarkup() {
    // Generates the HTML markup for displaying bookmarks
    return this.data
      .map(
        result => `
    <li class="preview">
         <a class="preview__link ${result.id ? 'active' : ''}"  href="#${
          result.id
        }">
          <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
    `
      )
      .join('');
  }
}
export default new bookmarkView(); // Exporting an instance of resultView
