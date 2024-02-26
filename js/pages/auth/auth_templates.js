function firebaseUI_HTML() {
	let firebase_ui_html = `
	<div class="px-8 flex flex-col flex-grow">
		<div class="px-0 pt-7 pb-8 flex flex-col flex-grow">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-semibold leading-6 text-gray-800">Authenticate</h3>
						<p class="mt-1 text-sm text-gray-500">Create an account or sign in.</p>
					</div>
				</div>
			</div>

			<div class="relative block w-full p-12 flex flex-col flex-grow justify-center" >
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