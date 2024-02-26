addFirebaseUIToDOM();
renderFirebaseAuthUI();

function addFirebaseUIToDOM() {
    let firebaseUI_html = firebaseUI_HTML();
    let firebaseUI_div = $($.parseHTML(firebaseUI_html));
    $('body').append(firebaseUI_div);
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
      signInSuccessUrl: `${window.location.href}?signIn=true`,
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