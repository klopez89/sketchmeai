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
					<div id="firebaseui-auth-container">
					</div>
				</div>

			</div>
		</div>
	</div>
	`; 
	return firebase_ui_html
}