const searchInput = document.querySelector('input[type="search"]');

searchInput.addEventListener('input', e => {
  e.target.dataset.showIcon = e.target.value == '';
});
