function firebaseUI_HTML() {
	let firebase_ui_html = `
	<div class="px-8 flex flex-col flex-grow h-full">
		<div class="flex flex-col flex-grow relative">

            <div id="loader" class="absolute opacity-100 bg-transparent w-full h-full flex justify-center items-center transition duration-500 z-10">
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500" aria-hidden="true"></i>
            </div>

			<div id="auth-area" class="hidden opacity-0 relative block w-full p-12 flex flex-col flex-grow justify-center transition duration-500">
                <div class="bg-white sm:px-0 mb-12">
                    <div class="flex flex-col items-center justify-between sm:flex-nowrap">
                        <div class="text-center">
                            <h3 class="text-4xl mb-4 font-semibold leading-6 text-gray-800">Authenticate</h3>
                            <p class="mt-1 text-sm text-gray-500">Create an account or sign in.</p>
                        </div>
                    </div>
                </div>

                <div>
					<div id="firebaseui-auth-container">
					</div>
				</div>

			</div>
		</div>
	</div>
	`; 
	return firebase_ui_html
}