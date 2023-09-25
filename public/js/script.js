const radioBtns = document.querySelectorAll('label');
const pageTitle = document.querySelector('.radio-wrap').getAttribute('data');
const image = document.querySelector('.card img');
const loader = document.querySelector('.loader');
const person = document.querySelector('.person');
const title = document.querySelector('.show_title');

radioBtns.forEach((btn) => {
  if (btn.getAttribute('data') === pageTitle) {
    btn.style.background = 'navy';
  }
});

document.addEventListener('change', (ev) => {
  if (!ev.target.closest('input[type="radio"]:checked')) return;
  let option = ev.target.closest('input[type="radio"]:checked').value;
  location.replace(`/movies/${option}`);
});
