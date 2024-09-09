configureHomePage();
configureNavMenuButtons();
configureContactUsForm();



// var has_a_mouse = false;
// if (matchMedia('(pointer:fine)').matches) {
// 	has_a_mouse = true;
// }

// let currentWindowWidth = window.innerWidth;
// let devLogElement = document.getElementById('dev-log-str');
// devLogElement.innerHTML = `Window Width: ${currentWindowWidth}px`;



function configureHomePage() {
	addHomePageToDOM();
}

function addHomePageToDOM() {
	let home_page_html = homePageHtml();
	let home_page_div = $($.parseHTML(home_page_html));
  $('body').append(home_page_div);
}

function configureNavMenuButtons() {
	// Select the close button inside the mobile slide-over
  const closeButton = document.getElementById('closeMenuButton');
  // Select the mobile slide-over itself
  const mobileMenu = document.getElementById('mobileMenu');

  closeButton.addEventListener('click', function() {
    // Hide the mobile slide-over when the close button is clicked
    mobileMenu.style.display = 'none';
  });

  // Initialize the mobile slide-over to be hidden on page load
  mobileMenu.style.display = 'none';
}

function configureContactUsForm() {
  document.getElementById('contact-us-form').addEventListener('input', function() {
    console.log('Form has been changed');
    toggleContactFormButtonState();
  });

  let sendButton = document.getElementById('contact-us-button');
  sendButton.addEventListener('click', function(event) { 
    event.preventDefault();
    let nameValue = document.getElementById('user-name').value;
    let emailValue = document.getElementById('user-email').value;
    // let messageValue = document.getElementById('user-message').value;
    // console.log('the contact us info before sending is: ', nameValue, emailValue, messageValue);
    fireContactUsEndpoint(nameValue, emailValue);
  });
}

function attemptToLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, redirect to the generation console
      window.location.href = `https://${CONSTANTS.SITE_URL}/console/generate`;
    } else {
      // No user is signed in, redirect to the auth page
      window.location.href = `https://${CONSTANTS.SITE_URL}/auth`;
    }
  });
}

function toggleContactFormButtonState() {
  let sendButtonText = document.querySelector('#contact-us-button p').innerHTML;
	if (sendButtonText === 'Signed Up!') {
		return;
	}
  
	let shouldEnable = isReadyToSubmitContactForm();
	if (shouldEnable === true && $('#contact-us-button').is("[disabled]") === true) {
		$('#contact-us-button').removeAttr('disabled');
		$('#contact-us-button').removeClass('bg-gray-200');
		$('#contact-us-button').removeClass('hover:bg-gray-200');
		$('#contact-us-button').addClass('bg-black');
		$('#contact-us-button').addClass('hover:bg-gray-800');
	} 

	if (shouldEnable === false && $('#contact-us-button').is("[disabled]") === false) {
		$('#contact-us-button').attr('disabled','');
		$('#contact-us-button').addClass('bg-gray-200');
		$('#contact-us-button').addClass('hover:bg-gray-200');
		$('#contact-us-button').removeClass('bg-black');
		$('#contact-us-button').removeClass('hover:bg-gray-800');
	}
}

function isReadyToSubmitContactForm() {
  let nameValue = document.getElementById('user-name').value;
  let emailValue = document.getElementById('user-email').value;
  let messageValue = document.getElementById('user-message').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(emailValue);

  return isEmailValid == true && nameValue != '' &&  messageValue != ''
}

function fireContactUsEndpoint(name, email, message) {
  showContactUsSpinner();

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
          hideContactUsSpinner();
          updateContactUsButtonAfterSend();
      },
      error: function(error) {
          console.error('Error from contact_us/new endpoint call: ', error);
          hideContactUsSpinner();
      }
  });
}

function updateContactUsButtonAfterSend() {
  let contactUsButton = $('#contact-us-button');
  let submittedTitle = 'Message Sent!';
  contactUsButton.find('p').html(submittedTitle);
  contactUsButton.prop('disabled', true);
  contactUsButton.removeClass('bg-black');
  contactUsButton.addClass('bg-gray-500');
  contactUsButton.removeClass('hover:bg-gray-800');
}

function showContactUsSpinner() {
  let contactUsButtonLabel = document.querySelector('#contact-us-button p');
  let contactUsSpinner = document.querySelector('#contact-us-button i');
  contactUsButtonLabel.classList.add('opacity-0');
  contactUsSpinner.classList.remove('hidden');
  $('#contact-us-button').prop('disabled', true);
}

function hideContactUsSpinner() {
  let contactUsButtonLabel = document.querySelector('#contact-us-button p');
  let contactUsSpinner = document.querySelector('#contact-us-button i');
  contactUsButtonLabel.classList.remove('opacity-0');
  contactUsSpinner.classList.add('hidden');
  $('#contact-us-button').prop('disabled', false);
}

function takeToBlog() {
  window.location.href = `https://${CONSTANTS.SITE_URL}/blog`;
}
