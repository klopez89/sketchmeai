
function animateAway(element, duration) {
    element.classList.remove('opacity-100');
    element.classList.add('opacity-0');
    setTimeout(() => {
        element.classList.add('hidden');
    }, duration);
}