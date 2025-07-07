import View from './view.js';

class Preview extends View {
  parentElement = document.querySelector('.results'); // or the correct selector for your app
  generateMarkup() {
    // Generates the HTML markup for displaying search results
    const id = window.location.hash.slice(1); // Get the current ID from the URL hash

    return `
        <li class="preview">
            <a class="preview__link ${
              id === this.data.id ? 'preview__link--active' : ''
            }" href="#${this.data.id}">
              <figure class="preview__fig">
                <img src="${this.data.image}" alt="${this.data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this.data.title}</h4>
                <p class="preview__publisher">${this.data.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}
export default new Preview(); // Exporting an instance of resultView
