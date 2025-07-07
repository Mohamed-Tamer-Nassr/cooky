import icons from 'url:../../img/icons.svg'; // Import icons for the message
import View from './view.js';

class addRecipeView extends View {
  parentElement = document.querySelector('.upload'); // The parent element where the recipe form will be rendered
  window = document.querySelector('.add-recipe-window'); // The modal window for adding a recipe
  overlay = document.querySelector('.overlay'); // The overlay that appears behind the modal window
  buttonOpen = document.querySelector('.nav__btn--add-recipe'); // The button to open the add recipe modal
  buttonClose = document.querySelector('.btn--close-modal'); // The button to close the add recipe modal
  message = 'Recipe was successfully uploaded!'; // Success message after uploading a recipe

  constructor() {
    super();
    this.addHandlerHideWindow(); // Bind the hide window handler to the current instance
    this.addHandlerShowWindow(); // Bind the show window handler to the current instance
  }

  toggleWindow() {
    this.window.classList.toggle('hidden'); // Toggle the 'hidden' class on the modal
    this.overlay.classList.toggle('hidden'); // Toggle the 'hidden' class on the overlay
  }

  addHandlerShowWindow() {
    this.buttonOpen.addEventListener('click', this.toggleWindow.bind(this)); // Bind 'this' to the current instance
  }

  addHandlerHideWindow() {
    this.buttonClose.addEventListener('click', this.toggleWindow.bind(this)); // Bind 'this' to the current instance
    this.overlay.addEventListener('click', this.toggleWindow.bind(this)); // Bind 'this' to the current instance
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // This method will render a success message in the parent element
  renderMessage(message = this.message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.parentElement.innerHTML = ''; // Clear previous content
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup() {
    // This method is currently empty, but you can add form markup here if needed.
  }
}

export default new addRecipeView();
