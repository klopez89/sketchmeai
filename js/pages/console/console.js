// addConsoleToDOM();
configureOffCanvasMenu();


function addConsoleToDOM() {
	let console_html = consoleHtml();
	let console_div = $($.parseHTML(console_html));
  $('body').append(console_div);
}

function configureOffCanvasMenu() {
    // Get the off-canvas menu and the buttons that open and close it
    var offCanvasMenu = document.querySelector('.off-canvas-menu');
    var openButton = document.querySelector('.off-canvas-open-button'); // replace with your actual open button selector
    var closeButton = document.querySelector('.off-canvas-close-button');

    // Add an event listener to the open button
    openButton.addEventListener('click', function() {
        // Remove the 'leaving' class and add the 'entering' class to the off-canvas menu
        offCanvasMenu.classList.remove('leaving');
        offCanvasMenu.classList.add('entering');
    });

    // Add an event listener to the close button
    closeButton.addEventListener('click', function() {
        // Remove the 'entering' class and add the 'leaving' class to the off-canvas menu
        offCanvasMenu.classList.remove('entering');
        offCanvasMenu.classList.add('leaving');
    });
}