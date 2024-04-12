
function animateAway(element, duration) {
    element.classList.remove('opacity-100');
    element.classList.add('opacity-0');
    setTimeout(() => {
        element.classList.add('hidden');
    }, duration);
}

function animateIn(element) {
    element.classList.remove('hidden');
    // Double requestAnimationFrame for browser to have time for a reflow
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.classList.remove('opacity-0');
            element.classList.add('opacity-100');
        });
    });
}

function showLoaderOnButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonText = button.querySelector('p');
    buttonLoaderIcon.classList.remove('hidden');
    buttonText.classList.add('text-transparent');
}

function hideLoaderOnButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonText = button.querySelector('p');
    buttonLoaderIcon.classList.add('hidden');
    buttonText.classList.remove('text-transparent');
}

function showLoaderOnFavoriteButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonFavIcon = button.querySelector('span i');
    buttonLoaderIcon.classList.remove('hidden');
    buttonFavIcon.classList.add('text-transparent');
}

function hideLoaderOnFavoriteButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonFavIcon = button.querySelector('span i');
    buttonLoaderIcon.classList.add('hidden');
    buttonFavIcon.classList.remove('text-transparent');
}