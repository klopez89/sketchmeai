
initializePage();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);
var logoutPressed = false;

const PURCHASE_CONTEXT = {
    LOGIN: 0,
    PAYMENT: 1,
    UPLOAD: 2,
    SUMMARY: 3,
};

const PURCHASE_RESULT = {
	STRIPE_PRODUCT_NOT_FOUND: 'STRIPE_PRODUCT_NOT_FOUND',
	PURCHASE_EXISTS: 'PURCHASE_EXISTS',
	PURCHASE_CREATED: 'PURCHASE_CREATED',
	FAILED: 'FAILED'
}
const DELIVERY_STATE = {
    JUST_PAID: 'JUST_PAID',
    GENERATING_MODEL: 'GENERATING_MODEL',
    GENERATING_IMAGES: 'GENERATING_IMAGES',
    EMAILED_LINK: 'EMAILED_LINK'
}


const BASE_URL = "https://sketchmeaibackend-sxgjpzid6q-uk.a.run.app/";

var current_context = null;


// Functions

function initializePage() {
	$('body').attr('id','bodyDiv');

	let breadcrumb_html = breadcrumb_HTML();
	let breadcrumb_element = $($.parseHTML(breadcrumb_html));
	$('body').append(breadcrumb_element);
	
	let purchaseContextContainer_html = purchaseContextContainer_HTML();
	let purchaseContextContainer_element = $($.parseHTML(purchaseContextContainer_html));
	$('body').append(purchaseContextContainer_element);

	let loader_html = centeredLoader_HTML();
	let loader_element = $($.parseHTML(loader_html));
	$('.purchase-context-div').append(loader_element);
}

function renderFirebaseAuthUI() {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Preserve the query parameters in the URL after sign in unless we already have the priceId
        var currentUrl = window.location.href;
        var urlParams = new URLSearchParams(window.location.search);
		let hasPriceIDInUrl = urlParams.has('priceId');
        firebase.auth().onAuthStateChanged(function(user) {
        	if (user && !hasPriceIDInUrl) {
            window.location.href = currentUrl + '?' + urlParams.toString();
          }
        });
		
        // showLoader();

        // User successfully signed in.
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;

        var uid = user.uid;
        var email = user.email;
        var displayName = user.displayName;
        const newUserInfo = {
          uid : uid,
          email : email,
          displayName : displayName,
          providerId : providerId,
        }


        // Handle new user case
        if (isNewUser === true) {
          // signUpNewUser(newUserInfo);
          // console.log(`detected the user is brand spanking new, email: ${email}, uid: ${uid}, displayName: ${displayName}`);
        } else {
          // routeSignedInUser();
          // console.log(`detected the user is not new so just signing in again, email: ${email}, uid: ${uid}, displayName: ${displayName}`);
        }

		console.log('Successfully logged in');

        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        console.log(`Ui  shown function is called, isPendingRequest: ${ui.isPendingRedirect()}`);
        if (ui.isPendingRedirect() == false) {
        	console.log(`just before calling hideLoader in uishown, isPendingRequest: ${ui.isPendingRedirect()}`);
	        hideLoader();
        }
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    // signInSuccessUrl: '',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'https://www.sketchme.ai/login',
    // Privacy policy url.
    privacyPolicyUrl: 'https://www.sketchme.ai'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
}

function getPriceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const priceId = urlParams.get('priceId');
    if (!priceId) {
        console.log('No priceId found in the URL query parameters.');
        return null;
    }
    return priceId;
}

function validateUserAuth(userInfo) {
	let action = `${BASE_URL}users/create`
	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify(userInfo),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			let userDict = response['user'];

			let userRecId = userDict.hasOwnProperty('user_rec_id') ? userDict['user_rec_id'] : null;
			let purchasesSummary = userDict.hasOwnProperty('purchases_summary') ? userDict['purchases_summary'] : null;

			if (purchasesSummary != null) {
				saveUserPurchasesToLocalStorage(purchasesSummary);
			}
			if (userRecId != null) {
				storeUserRecId(userRecId);
			}

			let priceId = getPriceIdFromUrl();

			// Navigate to the appropriate context
			let purchase_rec_id = null;
			if (purchasesSummary.hasOwnProperty(priceId)) {
				purchase_rec_id = purchasesSummary[priceId];
				validatePreviousPurchase(purchase_rec_id);
			} else if (userRecId != null) {
				console.log('Gonna hit handlePaymentNavigation from validateUserAuth success block');
				handlePaymentNavigation(userRecId);
			} else {
				console.log('Failed to retrieve or create a user in our database, needs dev review. Falling back to login view');
				changePurchaseContext(PURCHASE_CONTEXT.LOGIN);
			}

		},
		error: function (msg) {
			console.log("Fell into failure block for action - users/create, with msg: ", msg);
		},
  	});
}

function saveUserPurchasesToLocalStorage(purchasesDict) {
    localStorage.setItem('userPurchases', JSON.stringify(purchasesDict));
}

function deleteUserPurchasesFromLocalStorage() {
    localStorage.removeItem('userPurchases');
}

// this is really about getting the purchase delivery state in order to determine next navigation path
function validatePreviousPurchase(purchase_rec_id) {
	const action = `${BASE_URL}purchase/validate`
	let json_payload = {
		purchase_rec_id : purchase_rec_id
	};
	console.log(`about to hit the validate purchase endpoint: ${action}, and json_payload: ${JSON.stringify(json_payload)}`);
	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify(json_payload),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log(`The validate purchase endpoint response is: ${JSON.stringify(response)}`);
			let purchase_result = PURCHASE_RESULT[response['purchase_result']];
			let delivery_state = DELIVERY_STATE[response['delivery_state']];
			handlePurchaseResponse(purchase_result, delivery_state);
		},
		error: function (msg) {
			console.log("Fell into failure block for validating existing purchase: ", msg);
		},
	});
}

function validatePurchase(userRecId, priceId, quantity) {
	const action = `${BASE_URL}purchase/save`
	let json_payload = {
		user_rec_id : userRecId,
		price_id 	: priceId,
		quantity	: quantity
	};

	console.log(`about to hit the purchase save endpoint: ${action}, and json_payload: ${JSON.stringify(json_payload)}`);
	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify(json_payload),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log(`The save purchase endpoint response is: ${JSON.stringify(response)}`);
			let purchase_result = PURCHASE_RESULT[response['purchase_result']];
			let delivery_state = DELIVERY_STATE[response['delivery_state']];

			let purchasesSummary = response['purchases_summary'];
			let userPurchases = JSON.parse(localStorage.getItem('userPurchases'));
			for (let key in purchasesSummary) {
				userPurchases[key] = purchasesSummary[key];
			}
			localStorage.setItem('userPurchases', JSON.stringify(userPurchases));

			handlePurchaseResponse(purchase_result, delivery_state);
		},
		error: function (msg) {
			console.log("Fell into failure block for saving the Stripe success purchase: ", msg);
		},
	});
}

function handlePurchaseResponse(purchase_result, delivery_state) {
	switch(purchase_result) {
		case PURCHASE_RESULT.STRIPE_PRODUCT_NOT_FOUND:
			console.log('Stripe product not found try again later');
			changePurchaseContext(PURCHASE_CONTEXT.PAYMENT);
		case PURCHASE_RESULT.PURCHASE_EXISTS:
			navigateWithDeliveryState(delivery_state);
			break;
		case PURCHASE_RESULT.PURCHASE_CREATED:
			changePurchaseContext(PURCHASE_CONTEXT.UPLOAD);
			break;
		case PURCHASE_RESULT.FAILED:
			console.log('Purchase save failed');
			changePurchaseContext(PURCHASE_CONTEXT.PAYMENT);
			break;
		default:
			console.log('Unknown result in saving the purchase');
			changePurchaseContext(PURCHASE_CONTEXT.PAYMENT);
	}
}

function storeUserRecId(userRecId) {
    localStorage.setItem('userRecId', userRecId);
}

function getUserRecId() {
    return localStorage.getItem('userRecId');
}

function removeUserRecId() {
    localStorage.removeItem('userRecId');
}

function getPurchaseRecIdFromLocalStorage() {
    let userPurchases = JSON.parse(localStorage.getItem('userPurchases'));
    let priceId = getPriceIdFromUrl();
    if (userPurchases && userPurchases.hasOwnProperty(priceId)) {
        return userPurchases[priceId];
    }
    return null;
}

function beginNewModelCreation() {
	const url_params = new URLSearchParams(window.location.search);
	const currentUser = firebase.auth().currentUser;
	const user_rec_id = getUserRecId();
	const purchase_rec_id = getPurchaseRecIdFromLocalStorage();

	if (purchase_rec_id == null || currentUser == null || user_rec_id == null) {
		console.log('Dont have a purchase_rec_id nor a current signed in firebase user nor a stored user rec id so wont kick off new model creation. Needs investigation.')
		return;
	}

	let action = `${BASE_URL}img_package/kickoff`
	let email = currentUser.email;
	let display_name = currentUser.displayName;
	let files = getUploadedFiles();

	let jsonObject = {
		user_rec_id: user_rec_id,
		email : email,
		display_name : display_name,
		purchase_rec_id : purchase_rec_id,
		files: files,
	}

	console.log("The json to be sent for model creation is: ", jsonObject);

	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify(jsonObject),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log('new model endpoint hit success, w/ response: ', response);
			showCheckmarkOnUploadButton();
			changePurchaseContext(PURCHASE_CONTEXT.SUMMARY);
		},
		error: function (msg) {
			console.log("Fell into failure block for new model creation! msg: ", msg);
			hideLoadingOnUploadButton();
			toggleUploadButtonInteraction();
		},
  	});
}


function navigateWithDeliveryState(delivery_state) {
	switch (delivery_state) {
		case DELIVERY_STATE.JUST_PAID:
			console.log('Take user to upload context');
			changePurchaseContext(PURCHASE_CONTEXT.UPLOAD);
			break;
		case DELIVERY_STATE.GENERATING_MODEL:
			console.log('Take user to Summary context and let them know that their purchase is in the Model Generation step');
			break;
		case DELIVERY_STATE.GENERATING_IMAGES:
			console.log('Take user to Summary context and let them know that their purchase is in the Image Generation step');
			break;
		case DELIVERY_STATE.EMAILED_LINK:
			console.log('Take user to Summary context and let them know that their purchase is ready for them and provide them w/ the link');
			break;
	}
}

function handlePaymentNavigation(user_rec_id) {
	const url_params = new URLSearchParams(window.location.search);
	const did_complete_payment = url_params.get('didCompletePayment', null);
	const price_id = url_params.get('priceId', null);
	const quantity = url_params.get('quantity', null);


	console.log('did_complete_payment: ', did_complete_payment, ', price_id: ', price_id, ', quantity: ', quantity);

	
	const did_arrive_from_stripe_redirect = (did_complete_payment != null) && (price_id != null) && (quantity != null)
	console.log("Value for did_arrive_from_stripe_redirect: ", did_arrive_from_stripe_redirect);

	if (did_arrive_from_stripe_redirect === true && did_complete_payment === 'true') {
		validatePurchase(user_rec_id, price_id, quantity);
	} else {
		changePurchaseContext(PURCHASE_CONTEXT.PAYMENT);
	}
}

// Upload related functions

function configureNewModelUploadArea() {
	// Get a reference to the drag-and-drop box
	let dropArea = document.getElementById('uploadAreaButton');
	let localUploadInput = document.getElementById('localUploadInput');

	// Add event listeners to handle drag-and-drop events
	if (dropArea != null) {
		dropArea.addEventListener('dragenter', handleDragEnter);
		dropArea.addEventListener('dragleave', handleDragLeave);
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		dropArea.addEventListener('click', triggerLocalUploadMenu);
	}

	if (localUploadInput != null) {
		localUploadInput.addEventListener("change", () => {
			console.log('Trigger change event of local upload input');
		 	const files = localUploadInput.files;
			
			handleFileUploads(files);
		});

		localUploadInput.addEventListener("click", () => {
			console.log('Trigger click event of local upload input');
		});
	}
}

function configureUploadButton() {
	let upload_button = document.getElementById('uploadToServerButton');
	if (upload_button != null) {
		upload_button.addEventListener("click", () => {
			upload_button.disabled = true;
			showLoadingOnUploadButton();
			beginNewModelCreation();
		});
	}
}

function triggerLocalUploadMenu(event) {
	event.preventDefault();

	let number_of_uploaded_files = numberOfUploadedFiles();
	let maximum_upload_count = getMaxUploadCount();

	if (isReadyToBeginNewModelCreation()) {
		console.log("ready to hit the new endpoint to kick off new model");
		// beginNewModelCreation();
	} else {
		console.log('time to show local upload flow');
		let localUploadInput = document.getElementById('localUploadInput');
		localUploadInput.click();
	}
}

function handleDragEnter(event) {
  // Highlight the drag-and-drop box when a file is dragged over it
  // this.classList.add('highlight');
}

function handleDragLeave(event) {
  // Un-highlight the drag-and-drop box when a file is dragged away from it
  // this.classList.remove('highlight');
}

function handleDragOver(event) {
  // Prevent the default behavior of the event
  event.preventDefault();
}

function handleDrop(event) {
  // Prevent the default behavior of the event
  event.preventDefault();

  // Un-highlight the drag-and-drop box
  // this.classList.remove('highlight');

  // Get the files that were dropped and handle them
  var files = event.dataTransfer.files;
 	handleFileUploads(files)
}

function handleFileUploads(files) {
	 let fileList = Array.from(files);
	 let number_of_new_files = fileList.length;
	 let number_of_uploaded_files = numberOfUploadedFiles();
	 let maximum_upload_count = getMaxUploadCount();

	 console.log(typeof fileList);


	if (isReadyToBeginNewModelCreation()) {
	  console.log("Maximum number of files reached. No more files can be uploaded.");

	} else {
	  let remaining_upload_count = maximum_upload_count - number_of_uploaded_files;
	  let files_to_upload = fileList.slice(0, remaining_upload_count);

	  console.log("the remaining upload count is: ", remaining_upload_count);
	  console.log("the files to upload are: ", files_to_upload);

		// Read the contents of each file
    for (var i = 0; i < files_to_upload.length; i++) {
    	let reader = new FileReader();
    	let file = files_to_upload[i];
  		let filename = file.name;
  		let fileType = file.type;
  		let fileSize = file.size;

		  if (fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/png') {
		    // Return early if the file type is not supported
		    return;
		  }

			reader.addEventListener('load', function(event) {
				let fileData = event.target.result;
				let fileInfo = {
					name: filename,
					type: fileType,
					size: summarizeFileSize(fileSize),
					data: fileData,
				};
				addFileUploadDivToDOM(fileInfo);
			});

      reader.readAsDataURL(files[i]);
    }
	}
}


// Upload related constant functions

function updateUploadAreaTitle() {
	let numberOfFilesLeftToUpload = (numberOfUploadedFiles() <= 10) ? (10 - numberOfUploadedFiles()) : 0;
	document.getElementById("upload-caption").innerHTML = "Drag or click to upload " + numberOfFilesLeftToUpload + " images";
	if (numberOfFilesLeftToUpload === getMaxUploadCount()) {
		document.getElementById('localUploadInput').value = "";
	}
}

function numberOfUploadedFiles() {
	let uploadedImages = $("#uploadEntryContainer").find("li");
	return uploadedImages.length;
}

function isReadyToBeginNewModelCreation() {
	let number_of_uploaded_files = numberOfUploadedFiles();
	let maximum_upload_count = getMaxUploadCount();
	return number_of_uploaded_files >= maximum_upload_count;
}

function getMaxUploadCount() {
	return 10;
}

function getUploadedFiles() {
	let uploaded_entries = $("#uploadEntryContainer").find("li");
	let img_list = [];

  uploaded_entries.each(function(index, entry) {
    let img_data = $(entry).find('#uploadedImage')[0].src;
		let img_name = $(entry).attr("filename");
		let img_type = $(entry).attr("filetype");
		let img = {
			name: img_name,
			data: img_data,
			type: img_type,
		};
		img_list.push(img);
  });

	return img_list;
}

function summarizeFileSize(sizeInBytes) {
  if (sizeInBytes >= 1073741824) {
    return (sizeInBytes / 1073741824).toFixed(2) + " GB";
  } else if (sizeInBytes >= 1048576) {
    return (sizeInBytes / 1048576).toFixed(2) + " MB";
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return sizeInBytes + " bytes";
  }
}

function addFileUploadDivToDOM(file) {
	let upload_count = numberOfUploadedFiles();
	let is_first_file = upload_count === 0;

	let upload_entry = uploadEntryDiv(file, is_first_file);
	let upload_entry_element = $($.parseHTML(upload_entry));

	let delete_button = upload_entry_element.find(".remove-upload-button")[0];
	delete_button.addEventListener('click', function(event) {
		event.preventDefault();

		let entry_is_inside_padding_container = upload_entry_element.parent('div').length > 0
		if (entry_is_inside_padding_container) {
			upload_entry_element.parent('div').remove();
		} else {
			upload_entry_element.remove();
		}

		updateUploadAreaTitle();
		toggleUploadAreaVisibility();
		toggleUploadButtonInteraction();
	});

	$('#uploadEntryContainer').prepend(upload_entry_element);
	resizeUploadThumbnailHeights()

	upload_entry_element.find('#uploadedImage')[0].src = file.data;
	updateUploadAreaTitle();
	toggleUploadAreaVisibility();
	toggleUploadButtonInteraction();
}

function toggleUploadAreaVisibility() {
	let shouldShow = !isReadyToBeginNewModelCreation();
	let $upload_area_button = $($('#uploadAreaButton')[0]);
	if (isReadyToBeginNewModelCreation() === true && $upload_area_button.children('i').is('.fa-check') === false) {
		$upload_area_button.children('i').removeClass('fa-images');
		$upload_area_button.children('i').addClass('fa-check');
		$upload_area_button.children('span').text('Ready to upload');
	}

	if (isReadyToBeginNewModelCreation() === false && $upload_area_button.children('i').is('.fa-check') === true) {
		$upload_area_button.children('i').addClass('fa-images');
		$upload_area_button.children('i').removeClass('fa-check');
		updateUploadAreaTitle();
	}
}

function toggleUploadButtonInteraction() {
	let sohuldEnable = isReadyToBeginNewModelCreation();
	if (sohuldEnable === true && $('#uploadToServerButton').is("[disabled]") === true) {
		$('#uploadToServerButton').removeAttr('disabled');
		$('#uploadToServerButton').removeClass('bg-gray-200');
		$('#uploadToServerButton').removeClass('hover:bg-gray-200');
		$('#uploadToServerButton').addClass('bg-orange-500');
		$('#uploadToServerButton').addClass('hover:bg-orange-700');
	} 

	if (sohuldEnable === false && $('#uploadToServerButton').is("[disabled]") === false) {
		$('#uploadToServerButton').attr('disabled','');
		$('#uploadToServerButton').addClass('bg-gray-200');
		$('#uploadToServerButton').addClass('hover:bg-gray-200');
		$('#uploadToServerButton').removeClass('bg-orange-500');
		$('#uploadToServerButton').removeClass('hover:bg-orange-700');
	}
}

function toggleLogoutButton(visibility) {
    let logoutButton = document.getElementById('logout');
    if (logoutButton != null) {
        logoutButton.style.display = visibility ? '' : 'none';
    }
}

function showLoadingOnUploadButton() {
	let uploadButtonTextElement = $('#uploadToServerButton p')[0];
	uploadButtonTextElement.style.color = "transparent";
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.style.display = '';
}

function hideLoadingOnUploadButton() {
	let uploadButtonTextElement = $('#uploadToServerButton p')[0];
	uploadButtonTextElement.style.color = "";
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.style.display = 'none';
}

function showCheckmarkOnUploadButton() {
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.classList.remove('fa-spin');
	uploadButtonLoadingElement.classList.remove('fa-spinner');
	uploadButtonLoadingElement.classList.add('fa-check');
}




// Loader related

function hideLoader() {
	let loader = document.getElementById('loader');
	if (loader != null) {
		loader.style.display = 'none';
	}
}

function showLoader() {
	let loader = document.getElementById('loader');
	if (loader != null) {
		loader.style.display = 'block';
	}
}

function hasInitiallyLoaded() {
	return current_context != null;
}

function resetCurrentContextIfPossible() {
	if (current_context == null) { return } 
	// reset breadcrumb's current context back to default, or unselected
	let bc_context_id = breadcrumbID(current_context);
	let bc_context_element = document.getElementById(bc_context_id);
	bc_context_element.classList.remove('text-gray-200');
	bc_context_element.classList.add('text-gray-400');
	// empty purchase-context-div except the loader
	let loader = document.getElementById('loader');
	document.querySelector('.purchase-context-div').innerHTML = loader.outerHTML.replace(/\\"/g, '"');
}

function removeQueryParamsFromUrl() {
    let url = window.location.href.split('?')[0];
    window.history.replaceState({}, document.title, url);
}

function configureForNewContext(new_context) {
	// add new context to purchase-context-div
	addUIForNewContext(new_context);

	// style breadcrumb's new context as selected
	if (ui.isPendingRedirect() == false) {
		let bc_context_id = breadcrumbID(new_context);
		let bc_context_element = document.getElementById(bc_context_id);
		bc_context_element.classList.remove('text-gray-400');
		bc_context_element.classList.add('text-gray-200');

		if (new_context != PURCHASE_CONTEXT.LOGIN) { //we don't hide loader here since the uishow callback hides the loader for that context
			hideLoader();
		}
	}

	// kickoff any processes for context after adding UI to DOM. NOTE: The isPendingRequest gets reset after starting the firebaseUI
	kickOffContextProcess(new_context);
}

function addUIForNewContext(new_context) {
	var context_html = null
	switch (new_context) {
		case PURCHASE_CONTEXT.LOGIN:
			context_html = firebaseUI_HTML();
      break
		case PURCHASE_CONTEXT.PAYMENT:
			context_html = paymentContext_HTML();
			break
		case PURCHASE_CONTEXT.UPLOAD:
			context_html = uploadContext_HTML();
		case PURCHASE_CONTEXT.SUMMARY:
	}

	if (context_html == null) { return }
	let context_element = $($.parseHTML(context_html));
	$('.purchase-context-div').append(context_element);
}

function kickOffContextProcess(new_context) {
		switch (new_context) {
		case PURCHASE_CONTEXT.LOGIN:
			renderFirebaseAuthUI();
			break
		case PURCHASE_CONTEXT.PAYMENT:
		case PURCHASE_CONTEXT.UPLOAD:
			configureNewModelUploadArea();
			configureUploadButton();
			break
		case PURCHASE_CONTEXT.SUMMARY:
	}
}

function changePurchaseContext(context) {
	showLoader();
	resetCurrentContextIfPossible();
	configureForNewContext(context);
	// if (ui.isPendingRedirect() == false) {
	// 	console.log(`just before calling hideLoader in changePurchaseContext, isPendingRequest: ${ui.isPendingRedirect()}`);
	// 	hideLoader();
	// }

	current_context = context;
}

function breadcrumbID(context) {
	switch (context) {
		case PURCHASE_CONTEXT.LOGIN:
			return 'bc-login'
		case PURCHASE_CONTEXT.PAYMENT:
			return 'bc-payment'
		case PURCHASE_CONTEXT.UPLOAD:
			return 'bc-upload'
		case PURCHASE_CONTEXT.SUMMARY:
			return 'bc-summary'
	}
}

// Window Events

window.onresize = (event) => {
	resizeUploadThumbnailHeights();
};

function resizeUploadThumbnailHeights() {
	let upload_img_width = $('.purchase-context-div').find('div img').width();
	$('.purchase-context-div').find('div img').height(upload_img_width);

	let upload_container_width = $('.purchase-context-div').find('li.flex.flex-col').width();
	$('.purchase-context-div').find('li.flex.flex-col').height(upload_container_width);
}

window.onload = (event) => {
  handleAuthStateChange();
};

function handleAuthStateChange() {

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			var user_info = {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				providerId: user.providerData[0].providerId
			};
			
			// Get reference to any local storage data for fast navgiation for returning users
			let userRecId = localStorage.getItem('userRecId');
			let purchasesDict = localStorage.getItem('userPurchases');

			let priceId = getPriceIdFromUrl();

			// Navigate to the appropriate context
			if (purchasesDict && purchasesDict.hasOwnProperty(priceId)) {
				purchase_rec_id = purchasesDict[priceId];
				validatePreviousPurchase(purchase_rec_id);
			} else if (userRecId) {
				console.log('Gonna hit handlePaymentNavigation from onAuthStateChanged');
				handlePaymentNavigation(userRecId);
			} else {
				validateUserAuth(user_info);
			}

			console.log('About to make the logout button visible');
			toggleLogoutButton(true);
		} 
		else { // User is signed out or is signing out
			if (logoutPressed === false) {
				console.log('In user is in signed out path, calling adapt from onAuthStateChanged');
				changePurchaseContext(PURCHASE_CONTEXT.LOGIN);
			}
		}
	});
}

function signOutUser() {
	logoutPressed = true;
	showLoader();
    firebase.auth().signOut().then(() => {
		console.log('Calling adapt from signOutSure');
		adaptToSignOutState();
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  }

function adaptToSignOutState() {
	toggleLogoutButton(false);
	setTimeout(function() {
		removeUserRecId();
		deleteUserPurchasesFromLocalStorage();
		changePurchaseContext(PURCHASE_CONTEXT.LOGIN);
		logoutPressed = false;
	}, 800);
}