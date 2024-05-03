const container = document.querySelector('.comparison-container');
document.querySelector('.slider').addEventListener('input', function(e) {
    container.style.setProperty('--position', `${e.target.value}%`);
});