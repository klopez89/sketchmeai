

function homePageHtml() {
	let headerTitle = 'Spice up your socials with AI';
	let headerSubtitle = 'Using the latest in AI tech, easily train AI to your face and have it generate new images for you. Perfect for refreshing your social media presence, and getting people talking.';
	let headerButtonTitle = 'Get started';

	let first_feature_title = 'Upload';
	let first_feature_body = 'Select and upload 10 images of yourself or any other person. The images will be served to the AI as training data. Include some variety, ie. face pic, face w/ torso, selfie, different lighting conditions.';

	let second_feature_title = 'Train';
	let second_feature_body = 'The AI will train on the images you uploaded. This AI is configure to expect images of a person, so if you deviate from that, results may be unexpected.';

	let third_feature_title = 'Generate';
	let third_feature_body = 'Once the AI is trained, we will kick off generating images across a set of themes.';

	let fourth_feature_title = 'Receive';
	let fourth_feature_body = 'Once all images are generated, we will email you a link to your image set. From there, you can download and share your new images.';

	return `
	<div class="bg-white">
		<header class="absolute inset-x-0 top-0 z-50">
		<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="flex lg:flex-1">
			<a href="#" class="-m-1.5 p-1.5">
				<span class="sr-only">Your Company</span>
				<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="">
			</a>
			</div>
			<div class="flex lg:hidden">
			<button type="button" id="menuButton" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
				<span class="sr-only">Open main menu</span>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
				</svg>
			</button>
			</div>
			<div class="hidden lg:flex lg:gap-x-12">
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Product</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
			</div>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">→</span></a>
			</div>
		</nav>
		<!-- Mobile menu, show/hide based on menu open state. -->
		<div id="mobileMenu" class="lg:hidden" role="dialog" aria-modal="true" style="display: none;">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-50"></div>
			<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			<div class="flex items-center justify-between">
				<a href="#" class="-m-1.5 p-1.5">
				<span class="sr-only">Your Company</span>
				<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="">
				</a>
				<button type="button" id="closeMenuButton" class="-m-2.5 rounded-md p-2.5 text-blue-700">
				<span class="sr-only">Close menu</span>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
				<div class="space-y-2 py-6">
					<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
					<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
					<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
					<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
				</div>
				<div class="py-6">
					<a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
				</div>
				</div>
			</div>
			</div>
		</div>
		</header>

		<div class="relative isolate pt-4">
			<div class="py-24 sm:py-32 lg:pb-20">
				<div class="lg:flex justify-between mx-auto max-w-7xl px-6 lg:px-8 items-center">
					<div class="m-5 lg:m-10 mx-auto max-w-2xl text-center min-w-[40%]">
						<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">${headerTitle}</h1>
						<p class="mt-6 text-lg leading-8 text-gray-600">${headerSubtitle}</p>
						<div class="mt-10 flex items-center justify-center gap-x-6">
							<a href="https://www.sketchme.ai/purchase?priceId=price_1NlaTnLBuf172mCOWBlXjIhS" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">${headerButtonTitle}</a>
							<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
						</div>
					</div>
					<div class="mt-4 flow-root sm:mt-4">
						<div class="my-10 mx-0 md:mx-16 lg:mx-10">
							<img src="https://storage.googleapis.com/sketchme_site/homepage_main_image%402x.png" alt="App screenshot" width="2432" height="1442" class="max-h-min">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white py-24 sm:py-32">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center">
				<h2 class="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
				<p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to deploy your app</p>
				<p class="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
				</div>
				<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
				<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
					<div class="relative pl-16">
					<dt class="text-base font-semibold leading-7 text-gray-900">
						<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
							<p class="font-semibold text-2xl text-white">1</p>
						</div>
						${first_feature_title}
					</dt>
					<dd class="mt-2 text-base leading-7 text-gray-600">${first_feature_body}</dd>
					</div>
					<div class="relative pl-16">
					<dt class="text-base font-semibold leading-7 text-gray-900">
						<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
							<p class="font-semibold text-2xl text-white">2</p>
						</div>
						${second_feature_title}
					</dt>
					<dd class="mt-2 text-base leading-7 text-gray-600">${second_feature_body}</dd>
					</div>
					<div class="relative pl-16">
					<dt class="text-base font-semibold leading-7 text-gray-900">
						<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
							<p class="font-semibold text-2xl text-white">3</p>
						</div>
						${third_feature_title}
					</dt>
					<dd class="mt-2 text-base leading-7 text-gray-600">${third_feature_body}</dd>
					</div>
					<div class="relative pl-16">
					<dt class="text-base font-semibold leading-7 text-gray-900">
						<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
						<p class="font-semibold text-2xl text-white">4</p>
						</div>
						${fourth_feature_title}
					</dt>
					<dd class="mt-2 text-base leading-7 text-gray-600">${fourth_feature_body}</dd>
					</div>
				</dl>
				</div>
			</div>
		</div>
	  
	</div>
	`;
}