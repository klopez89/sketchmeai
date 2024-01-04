configureHomePage();
configureNavMenuButtons();

function configureHomePage() {
	addHomePageToDOM();
}

function addHomePageToDOM() {
	let home_page_html = homePageHtml();
	let home_page_div = $($.parseHTML(home_page_html));
  $('body').append(home_page_div);
}

function configureNavMenuButtons() {
  // Select the menu button
  const menuButton = document.getElementById('menuButton');
	// Select the close button inside the mobile slide-over
  const closeButton = document.getElementById('closeMenuButton');
  // Select the mobile slide-over itself
  const mobileMenu = document.getElementById('mobileMenu');

  menuButton.addEventListener('click', function() {
    // Toggle the visibility of the mobile slide-over when the menu button is clicked
    mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
  });

  closeButton.addEventListener('click', function() {
    // Hide the mobile slide-over when the close button is clicked
    mobileMenu.style.display = 'none';
  });

  // Initialize the mobile slide-over to be hidden on page load
  mobileMenu.style.display = 'none';
}

