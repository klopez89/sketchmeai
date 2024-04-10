
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