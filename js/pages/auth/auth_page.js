var ui = new firebaseui.auth.AuthUI(firebase.auth());
var wasJustPendingRequest = false;


addFirebaseUIToDOM();
renderFirebaseAuthUI();
handleAuthStateChange();

setTimeout(() => {
    hideLoader();
    showAuthArea();
}, 1000);

function addFirebaseUIToDOM() {
    let firebaseUI_html = firebaseUI_HTML();
    let firebaseUI_div = $($.parseHTML(firebaseUI_html));
    $('body').append(firebaseUI_div);
}

function showAuthArea() {
    let authAreaDiv = document.getElementById('auth-area');
    authAreaDiv.classList.remove('hidden');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            authAreaDiv.classList.remove('opacity-0');
            authAreaDiv.classList.add('opacity-100');
        });
    });
}

function hideAuthArea() {
    let authAreaDiv = document.getElementById('auth-area');
    authAreaDiv.classList.add('opacity-0');
    authAreaDiv.classList.add('hidden');
}

function showLoader() {
    let loaderDiv = document.getElementById('loader');
    loaderDiv.classList.remove('hidden');
    setTimeout(() => {
        loaderDiv.classList.add('opacity-100');
    }, 0); // Timeout set to 0 to ensure the class is added after the element is visible
}


function hideLoader() {
    let loaderDiv = document.getElementById('loader');
    let duration = getDurationFromDiv(loaderDiv);
    loaderDiv.classList.remove('opacity-100');
    loaderDiv.classList.add('opacity-0');
    setTimeout(() => {
        loaderDiv.classList.add('hidden');
    }, duration);
}

function renderFirebaseAuthUI() {
    console.log('renderFirebaseAuthUI called');
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

          console.log('Successfully logged in');
          hideAuthArea();
          showLoader();
  
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          console.log(`Ui  shown function is called, isPendingRequest: ${ui.isPendingRedirect()}`);
        //   wasJustPendingRequest = ui.isPendingRedirect();
        //   if (ui.isPendingRedirect() === false) {
        //       console.log(`just before calling hideLoader in uishown, isPendingRequest: ${ui.isPendingRedirect()}`);
        //       hideLoader();
        //   }
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: `${window.location.href}/index.html?signIn=true`,
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
      tosUrl: `https://${CONSTANTS.SITE_URL}/terms-of-service`,
      // Privacy policy url.
      privacyPolicyUrl: `https://${CONSTANTS.SITE_URL}/privacy-policy`
    };
  
    ui.start('#firebaseui-auth-container', uiConfig);
}
  
function handleAuthStateChange() {
  
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var user_info = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                providerId: user.providerData[0].providerId
            };
            validateUserAuth(user_info);
        } else {
            // User is signed out or is signing out, thus in this case, do nothing.
        }
    });
}

function validateUserAuth(userInfo) {
	let action = `${CONSTANTS.BACKEND_URL}users/create`
	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify(userInfo),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log('users/create endpoint hit success, w/ response: ', response);
			let userDict = response['user'];

			let userRecId = userDict.hasOwnProperty('user_rec_id') ? userDict['user_rec_id'] : null;
            let numberOfValidAiModels = userDict.hasOwnProperty('number_of_valid_ai_models') ? userDict['number_of_valid_ai_models'] : null;
			
			if (userRecId != null) {
				console.log('We have a valid user and stored it locally');
                storeUserRecId(userRecId);

                let hasUserFineTunedAModel = numberOfValidAiModels > 0;
                if (hasUserFineTunedAModel) {
                    navigateToConsole();
                } else {
                    navigateToNewModelForm();
                }
				
			} else {
				console.log('Failed to retrieve or create a user in our database, needs dev review. Do nothing.');
			}
		},
		error: function (msg) {
			console.log("Fell into failure block for action - users/create, with msg: ", msg);
		},
  	});
}

function navigateToConsole() {
    window.location.href = `https://${CONSTANTS.SITE_URL}/console/generate`;
}

function navigateToNewModelForm() {
    let baseUrl = `https://${CONSTANTS.SITE_URL}/console/models`;
    let url = new URL(baseUrl);
    url.searchParams.set('newForm', 'true');
    window.location.href = url.href;
    // window.location.href = `https://${CONSTANTS.SITE_URL}/console/models/?newForm=true`;
}