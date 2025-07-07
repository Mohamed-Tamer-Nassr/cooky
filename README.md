# Cookly - Your Ultimate Recipe Companion

Cookly is a modern web application designed to be your go-to resource for culinary exploration. It empowers users to effortlessly search through over a million recipes, delve into detailed cooking instructions, dynamically adjust serving sizes, save favorite recipes for future reference, and even contribute their own unique creations to the community.

---

## Features

- **Recipe Search:** Quickly find recipes by entering ingredients or dish names into the intuitive search bar.
- **Detailed Recipe View:** Access comprehensive information for each recipe, including a full list of ingredients, estimated cooking time, and step-by-step directions.
- **Dynamic Servings Adjustment:** Seamlessly modify the number of servings for any recipe, and the ingredient quantities will automatically recalculate to match.
- **Bookmark Functionality:** Easily save your preferred recipes to a personal collection for instant access. Bookmarks are conveniently stored in your local browser storage.
- **Add Your Own Recipes:** Share your culinary expertise by uploading new recipes, complete with all necessary details.
- **Responsive Design:** Enjoy a consistent and optimized user experience across a wide range of devices, from desktop computers to tablets and smartphones.

---

## Technologies Used

- **HTML5:** The foundational language used for structuring the web pages and content.
- **SCSS (Sass):** A powerful CSS preprocessor employed for writing maintainable and organized stylesheets, leveraging features like variables, nesting, and mixins.
  - `_base.scss`: Establishes global styles, defines key variables (colors, breakpoints), and sets up basic typography.
  - `_components.scss`: Contains modular styles for reusable UI elements such as buttons, loading spinners, and informational messages.
  - `_header.scss`: Manages the styling for the application's header section, encompassing the logo, search functionality, and navigation elements.
  - `_preview.scss`: Styles the visual preview cards used to display recipes in search results and bookmarked lists.
  - `_recipe.scss`: Dictates the appearance of the detailed recipe view, including the main image, title, ingredient list, and cooking directions.
  - `_searchResults.scss`: Handles the layout and styling of the search results display area and pagination controls.
  - `_upload.scss`: Provides styling for the modal window dedicated to uploading new recipe data.
- **JavaScript (ES6+):** The core programming language for implementing all interactive functionalities, managing data, and driving the application's logic.
- **Parcel:** (Inferred from project setup) A zero-configuration web application bundler, streamlining the development workflow by handling asset compilation and optimization.

---

## Project Structure (Frontend)

```
.
├── src/
│   ├── img/
│   │   ├── icons.svg
│   │   ├── Pasted image (5).png (favicon)
│   │   ├── Pasted image (6).png (logo)
│   │   └── test-1.jpg (placeholder image)
│   ├── js/
│   │   └── controller.js
│   └── sass/
│       ├── main.scss
│       ├── _base.scss
│       ├── _components.scss
│       ├── _header.scss
│       ├── _preview.scss
│       ├── _recipe.scss
│       ├── _searchResults.scss
│       └── _upload.scss
└── index.html
```

---

## Getting Started

Follow these straightforward steps to get a local copy of Cookly up and running on your machine.

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed.

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd cookly-app
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Start the development server:

```bash
npm start
# or
yarn start
```

The application should automatically open in your default web browser, typically at [http://localhost:1234](http://localhost:1234) (or an alternative available port).

---

## Usage

- **Search for Recipes:** Utilize the search bar located in the header to discover recipes by specific ingredients or dish names.
- **View Recipe Details:** Click on any recipe from the search results to access its complete details, including preparation steps and ingredient breakdown.
- **Adjust Servings:** On the detailed recipe page, use the + and - buttons to modify the number of servings, and watch the ingredient quantities update in real-time.
- **Bookmark Recipes:** Click the bookmark icon on a recipe's detail page to save it. Your bookmarked recipes can be easily accessed via the "Bookmarks" menu in the header.
- **Add Your Own Recipe:** Select the "Add recipe" button in the header to open a form, allowing you to input and upload your unique recipe creations.

---

## Contributing

Contributions are the cornerstone of the open-source community, fostering an environment of learning, inspiration, and collaborative creation. Your contributions are highly valued and greatly appreciated.

If you have an idea for an enhancement or a bug fix, please consider contributing!

1. **Fork the Project**
2. **Create your Feature Branch**  
   `git checkout -b feature/AmazingFeature`
3. **Commit your Changes**  
   `git commit -m 'Add some AmazingFeature'`
4. **Push to the Branch**  
   `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

Don't forget to give the project a star if you find it useful! Thank you for your support!

---

## License

This project is distributed under the MIT License. For more details, please refer to the LICENSE file in the repository.

---

## Contact

Mohamed Tamer - [Your LinkedIn Profile]

Project Link: [https://github.com/your_username/cookly-app](https://github.com/your_username/cookly-app)  
_(Please replace this with your actual GitHub repository link)_

---

## Acknowledgements

Special thanks to Jonas Schmedtmann for his exceptional JavaScript courses, which served as a significant inspiration for the development of this
