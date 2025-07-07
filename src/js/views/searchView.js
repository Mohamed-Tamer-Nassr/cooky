class searchView {
  parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.parentElement.querySelector('.search__field').value;
    this.clearInput(); // Clear the input field after getting the query
    return query;
  }
  clearInput() {
    this.parentElement.querySelector('.search__field').value = '';
  }
  handlerSearch(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
      handler(); // Call the provided handler function
    });
  }
}
export default new searchView();
