import View from './view.js';

class ResultView extends View {
  parentElement = document.querySelector('.results');

  generateMarkup() {
    // Generates the HTML markup for displaying search results

    return this.data
      .map(
        result => `
       <li class="preview">
         <a class="preview__link ${result.id ? 'active' : ''}" href="#${
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

export default new ResultView();
