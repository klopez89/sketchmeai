const container = document.querySelector('.comp-container');
document.querySelector('.slider').addEventListener('input', function(e) {
    container.style.setProperty('--position', `${e.target.value}%`);
});