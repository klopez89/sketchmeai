function firebaseUI_HTML() {
	let firebase_ui_html = `
    <div class="px-8 flex flex-col flex-grow h-full">
        <div class="flex flex-col flex-grow">
            <div class="relative block w-full p-12 flex flex-col flex-grow justify-center">
                <div class="bg-white sm:px-0 mb-12">
                    <div class="flex flex-col items-center justify-between sm:flex-nowrap">
                        <div class="text-center">
                            <h3 class="text-4xl mb-4 font-semibold leading-6 text-gray-800">Authenticate</h3>
                            <p class="mt-1 text-sm text-gray-500">Create an account or sign in.</p>
                        </div>
                    </div>
                </div>
            <div>
            <div id="firebaseui-auth-container" lang="en">
                <div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-idp-list"><li class="firebaseui-list-item"><button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" style="background-color:#ffffff" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Google</span></button></li><li class="firebaseui-list-item"><button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button" data-provider-id="password" style="background-color:#db4437" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with email</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Email</span></button></li></ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer"><p class="firebaseui-tos firebaseui-tospp-full-message">By continuing, you are indicating that you accept our <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>.</p></div></div></div>
                </div>
            </div>
        </div>
    </div>
	`; 
	return firebase_ui_html
}