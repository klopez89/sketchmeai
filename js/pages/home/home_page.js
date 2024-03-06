configureHomePage();
configureNavMenuButtons();
configureContactUsForm();

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

function configureContactUsForm() {
  let sendButton = document.getElementById('contact-us-button');
  sendButton.addEventListener('click', function(event) { 
    event.preventDefault();
    let nameValue = document.getElementById('user-name').value;
    let emailValue = document.getElementById('user-email').value;
    let messageValue = document.getElementById('user-message').value;
    console.log('the contact us info before sending is: ', nameValue, emailValue, messageValue);
    fireContactUsEndpoint(nameValue, emailValue, messageValue);
  });
}

function fireContactUsEndpoint(name, email, message) {
  let url = `${CONSTANTS.BACKEND_URL}contact_us/new`;
  let data = {
      "userName": name,
      "userEmail": email,
      "userMessage": message,
  };

  $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: 'json',
      success: function(response) {
          console.log('Response from contact_us/new endpoint: ', response);
      },
      error: function(error) {
          console.error('Error from contact_us/new endpoint call: ', error);
      }
  });
}