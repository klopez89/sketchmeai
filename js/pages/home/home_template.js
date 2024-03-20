

function homePageHtml() {

	let headerButtonTitle = 'Get Started';
	let headerButtonUrl = `https://${CONSTANTS.SITE_URL}/auth`;
	let contactUsId = 'contact-form-section';

	let headerTitle = 'Explore what you can create with AI';
	let headerSubtitle = 'Harness the power of AI with easy-to-use model training and image generation. Manipulate prompt parameters to craft any image you can dream of. Unveil the potential of AI to capture your artistic flair, generating images that resonate with your aesthetic.';

	let first_feature_title = 'Model Training';
	let first_feature_body = 'Upload 10 - 20 images of yourself or any other person and train your own AI to generate images. To improve quality of training, aim to include some variety of images, ie. face pic, face w/ torso, selfie, different lighting conditions.';

	let second_feature_title = 'Generation Console';
	let second_feature_body = 'Kick off as many image generations as you want while tinkering with typical prompt features like guidance scale, lora scale, and image-to-image. You can also fire off a generation for the same prompt across several trained models.';


	let third_feature_title = 'Stable Diffusion Tech';
	let third_feature_body = "Currently, our training and generation is powered by StabilityAI's Stable Diffusion SDXL. The technology has a lot of community support and add-ons that make this open-source tool powerful and versatile. We plan to bring those add-on features soon (<a href=\"#roadmap\" class=\"text-black\">see Roadmap</a>)."

	// let second_feature_title = 'Train';
	// let second_feature_body = 'Kick off training your custom model  AI will train on the images you uploaded. The .';

	// let third_feature_title = 'Generate';
	// let third_feature_body = 'Once the AI is trained, we will kick off generating images across a set of themes.';

	// let fourth_feature_title = 'Receive';
	// let fourth_feature_body = 'Once all images are generated, we will email you a link to your image set. From there, download, share, and use your new images!';
	
	let timeline_a_title = 'Collections';
	let timeline_a_body = "Organize your generated images into collections for distinct projects, allowing for better management and retrieval of your creations.";
	let timeline_a_date = 'Mar 2024';

	let timeline_b_title = 'Image Prompt Adapter';
	let timeline_b_body = "The IP-adapter is an add-on for Stable Diffusion that transforms images into prompts. It empowers you to emulate the style, composition, or specific facial characteristics found in a reference image."
	let timeline_b_date = 'Apr 2024';

	let timeline_c_title = 'ControlNet';
	let timeline_c_body = "ControlNet brings a new level of precision to Stable Diffusion's image generation by conditioning input images and prompts. It will enable more control over the final output, utilizing techniques such as pose manipulation, edge detection, and depth mapping.";
	let timeline_c_date = 'May 2024';

	let timeline_d_title = 'LoRA Mixing';
	let timeline_d_body = "Each trained model is of a LoRA type, and by combining multiple LoRA you can merge multiple concepts together in new ways, ie. a LoRA of a particular style and a LoRA of your face.";
	let timeline_d_date = 'Jun 2024';

	
	let contactFormTitle = 'Contact Us';
	let currentYear = new Date().getFullYear().toString();


	return `
	<div class="bg-white flex flex-col gap-y-20">
		<header class="absolute inset-x-0 top-0 z-50">
			<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div class="flex lg:flex-1">
					<a href="#" class="-m-1.5 p-1.5 flex items-center">
						<img class="h-8 w-auto pr-2" src="https://storage.googleapis.com/sketchmeai-public/branding/sketchmeai%20logo%403x.png" alt=""><span class="font-medium text-xl pt-1">SketchMeAi</span>
					</a>
				</div>
				<div class="flex lg:hidden hidden">
					<button type="button" id="menuButton" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
						<span class="sr-only">Open main menu</span>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
						</svg>
					</button>
				</div>
				<div class="hidden lg:flex lg:gap-x-12">
					<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Product</a>
					<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Features</a>
					<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Company</a>
				</div>
				<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Log in <span aria-hidden="true">→</span></a>
				</div>
			</nav>
			<!-- Mobile menu, show/hide based on menu open state. -->
			<div id="mobileMenu" class="lg:hidden hidden" role="dialog" aria-modal="true" style="display: none;">
				<!-- Background backdrop, show/hide based on slide-over state. -->
				<div class="fixed inset-0 z-50"></div>
				<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
				<div class="flex items-center justify-between">
					<a href="#" class="-m-1.5 p-1.5 flex items-center">
						<img class="h-8 w-auto pr-2" src="https://storage.googleapis.com/sketchmeai-public/branding/sketchmeai%20logo%403x.png" alt=""><span class="font-medium text-xl pt-1">SketchMeAi</span>
					</a>
					<button type="button" id="closeMenuButton" class="-m-2.5 rounded-md p-2.5 text-gray-800">
					<span class="sr-only">Close menu</span>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hidden">Product</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hidden">Features</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hidden">Company</a>
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
			<div class="pt-24">
				<div class="lg:flex justify-between mx-auto max-w-7xl px-6 lg:px-8 items-center">
					<div class="m-5 lg:m-10 mx-auto max-w-2xl text-center min-w-[40%]">
						<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">${headerTitle}</h1>
						<p class="mt-6 text-lg leading-8 text-secondary text-justify">${headerSubtitle}</p>
						<div class="mt-10 flex items-center justify-center gap-x-6">
							<a href="${headerButtonUrl}" class="rounded-md bg-black px-8 py-2.5 text-lg text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">${headerButtonTitle}</a>
							<a href="#howitworks" class="text-lg leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
						</div>
					</div>
					<div class="mt-4 flow-root sm:mt-4">
						<div class="my-10 mx-0 md:mx-16 lg:mx-10">
							<img src="https://storage.googleapis.com/sketchmeai-public/branding/top_homepage_img.png" alt="App screenshot" width="2432" height="1442" class="max-h-min">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-gray-100" id="howitworks">
			<div class="my-24 mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center">
				<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">What We Offer</p>
				</div>
				<div class="mx-auto mt-12 max-w-2xl lg:max-w-4xl">
				<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-gray-800">
							<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
								<p class="font-semibold text-2xl text-white">1</p>
							</div>
							${first_feature_title}
						</dt>
						<dd class="mt-2 text-base leading-7 text-gray-600">${first_feature_body}</dd>
					</div>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-gray-800">
							<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
								<p class="font-semibold text-2xl text-white">2</p>
							</div>
							${second_feature_title}
						</dt>
						<dd class="mt-2 text-base leading-7 text-gray-600">${second_feature_body}</dd>
					</div>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-gray-800">
							<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
								<p class="font-semibold text-2xl text-white">3</p>
							</div>
							${third_feature_title}
						</dt>
						<dd class="mt-2 text-base leading-7 text-gray-600">${third_feature_body}</dd>
					</div>
				</dl>
				</div>
			</div>
		</div>

		<div id="console-screenshot-container" class="mx-auto max-w-7xl px-6 lg:px-8">
			<img src="https://storage.googleapis.com/sketchmeai-public/branding/homepage_console_screenshot1.png" class="my-14 shadow-2xl">
		</div>

		<div id="faq-container" class="px-6 lg:px-8 bg-gray-100">
			<div class="my-24 mx-auto max-w-4xl divide-y divide-gray-900/10">
				<h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Frequently asked questions</h2>
				<dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
					<div x-data="{ open: true }" class="pt-6">
						<dt>
							<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
								<span class="text-base font-semibold leading-7">
									What does it cost to use SketchMeAi?
								</span>
								<span class="ml-6 flex h-7 items-center">
									<svg x-description="Icon when question is collapsed." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6" :class="{ 'hidden': open }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
									</svg>
									<svg x-description="Icon when question is expanded." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6 hidden" :class="{ 'hidden': !(open) }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
									</svg>
								</span>
							</button>
						</dt>
						<dd class="mt-2 pr-12" id="faq-0" x-show="open" style="display: none;">
							<p class="text-base leading-7 text-gray-600">
								Image generation and model training both require SketchMeAi credit to use; which can be purchased via Stripe. Cost of generation and training depends on denoising steps and amount of training data, respectively. On average, generation is ~$0.04/image and training a model is ~$3.00/training.
							</p>
						</dd>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										What happens if I cancel a training?</span>
									<span class="ml-6 flex h-7 items-center">
										<svg x-description="Icon when question is collapsed." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6" :class="{ 'hidden': open }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
										</svg>
										<svg x-description="Icon when question is expanded." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6 hidden" :class="{ 'hidden': !(open) }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
										</svg>
									</span>
								</button>
							</dt>
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									You are only charged against the active training time. For example, when kicking off a training, w/ 10 images, an estimated cost will be deducted from your credit balance and if you cancel mid-training, you will be refunded half the estimated cost. Image generations currently cannot be canceled once kicked off.
								</p>
							</dd>
						</div>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										Why is my trained model not generating images that resemble the training data?</span>
									<span class="ml-6 flex h-7 items-center">
										<svg x-description="Icon when question is collapsed." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6" :class="{ 'hidden': open }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
										</svg>
										<svg x-description="Icon when question is expanded." x-state:on="Item expanded" x-state:off="Item collapsed" class="h-6 w-6 hidden" :class="{ 'hidden': !(open) }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"></path>
										</svg>
									</span>
								</button>
							</dt>
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									Resemblance to your training data depends on a number of factors. The first and most impactful is the quality of your training data. High quality images with varied angles and lighting tend to lead to a well-trained model w/ respect to resemblance. The other factors can be found in your prompt settings. While tbe provided default values tend to yield resemblant images, each trained model may need these adjusted to yield best results. The values to adjust are Lora Scale and Guidance Scale. Denoising steps can have some influence too but note that increasing the value may mean an increase in generation cost.
								</p>
							</dd>
						</div>

					</div>
				</dl>
			</div>
		</div>
	  
		<div id="roadmap" class="bg-white">
			<div class="my-4 mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center mb-12">
					<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Roadmap</p>
				</div>
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
						<div>
							<time class="flex items-center text-sm font-semibold leading-6 text-gray-500">
								<svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
								<circle cx="2" cy="2" r="2" fill="currentColor" />
								</svg>
								${timeline_a_date}
								<div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
							</time>
							<p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-800">${timeline_a_title}</p>
							<p class="mt-1 text-base leading-7 text-gray-600">${timeline_a_body}</p>
						</div>
						<div>
							<time class="flex items-center text-sm font-semibold leading-6 text-gray-500">
								<svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
								<circle cx="2" cy="2" r="2" fill="currentColor" />
								</svg>
								${timeline_b_date}
								<div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
							</time>
							<p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-800">${timeline_b_title}</p>
							<p class="mt-1 text-base leading-7 text-gray-600">${timeline_b_body}</p>
						</div>
						<div>
							<time class="flex items-center text-sm font-semibold leading-6 text-gray-500">
								<svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
								<circle cx="2" cy="2" r="2" fill="currentColor" />
								</svg>
								${timeline_c_date}
								<div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
							</time>
							<p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-800">${timeline_c_title}</p>
							<p class="mt-1 text-base leading-7 text-gray-600">${timeline_c_body}</p>
						</div>
						<div>
							<time class="flex items-center text-sm font-semibold leading-6 text-gray-500">
								<svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
								<circle cx="2" cy="2" r="2" fill="currentColor" />
								</svg>
								${timeline_d_date}
								<div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
							</time>
							<p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">${timeline_d_title}</p>
							<p class="mt-1 text-base leading-7 text-gray-600">${timeline_d_body}</p>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div id="${contactUsId}" class="bg-gray-100 border dark:border-white/10">
			<div class="mt-24 mx-auto max-w-2xl lg:text-center mb-12">
					<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">${contactFormTitle}</p>
			</div>
			<div class="mt-8 mb-24 mx-auto block max-w-md rounded-lg bg-transparent px-6 shadow-4 dark:bg-surface-dark">
				<form id="contact-us-form">
					<div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

						<div class="col-span-full" id="name-field-container">
							<div class="flex items-center">
								<label for="model-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
							</div>
							<div class="mt-2">
								<input type="text" name="user-name" id="user-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
							</div>
						</div>

						<div class="col-span-full" id="email-field-container">
							<div class="flex items-center">
								<label for="user-email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
							</div>
							<div class="mt-2">
								<input type="text" name="user-email" id="user-email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocompleted="">
							</div>
						</div>

						<div class="col-span-full" id="message-field-container">
							<div class="flex items-center">
								<label for="user-message" class="block text-sm font-medium leading-6 text-gray-900">Message</label>
							</div>
							<div class="mt-2">
								<textarea id="user-message" name="user-message" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 181px;"></textarea>
							</div>
						</div>

						<div class="col-span-full flex flex-col justify-center" id="contact-button-container">
							<button id="contact-us-button" type="submit" class="w-full h-full flex justify-center items-center rounded-md flex-grow-0 flex-shrink-0 text-center border border-transparent px-3.5 py-2.5 text-lg text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-200 hover:bg-gray-200" disabled="">
								<p id="contact-us-button-label" class="flex items-center">Send Message</p>
								<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
							</button>
						</div>

					</div>
				</form>
			</div>
		</div>
		

		<footer class="bg-white">
		<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
			<div class="hidden flex justify-center space-x-6 md:order-2">
				<a href="#" class="text-gray-400 hover:text-gray-800">
					<span class="sr-only">Facebook</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-800">
					<span class="sr-only">Instagram</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
					</svg>
				</a>
				<a href="#" class="text-gray-400 hover:text-gray-800">
					<span class="sr-only">Twitter</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
					</svg>
				</a>
			</div>
			<div class="mt-8 md:order-1 md:mt-0">
			<p class="text-center text-xs leading-5 text-gray-500">&copy; ${currentYear} SketchMeAi, Inc. All rights reserved.</p>
			</div>
		</div>
		</footer>
	</div>
	`;
}