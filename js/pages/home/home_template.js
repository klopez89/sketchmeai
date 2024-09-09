

function homePageHtml() {

	let headerButtonTitle = 'Start generating with AI';
	let headerButtonUrl = `https://${CONSTANTS.SITE_URL}/auth`;
	let contactUsId = 'contact-form-section';

	// LinkedIn profile pic mad old? Let AI help out.
	// With easy-to-use model training and image generation, SketchMeAi enables you to create new profile photos and more with AI technology. See how you can reimagine yourself.
// Old Title: Explore what you can create with AI
// Old Subtitle: Harness the power of AI with easy-to-use model training and image generation. Manipulate prompt parameters to craft any image you can dream of. Unveil the potential of AI to capture your artistic flair, generating images that resonate with your aesthetic.

	let headerTitle = 'Reimagine<br>Yourself';
	let headerSubtitle = 'Go beyond a camera photo, and reimagine how you present to the online world. SketchMeAi uses the latest open-source tech to help you easily train a model and generate unique self portraits in endless styles.';


	let first_feature_title = 'Model Training';
	let first_feature_body = 'Upload 3 - 20 images of yourself and train your own AI model. For best training result, include a variety of images, ie. face pic, face w/ torso, selfie, different lighting conditions. Flux training coming soon!';


	let second_feature_title = 'Stable Diffusion + Flux';
	let second_feature_body = "Generate with Stable Diffusion SDXL and Black Forest Labs' Flux-schnell model. Control the direction of your generations with ControlNets and IP-Adapter. With the state-of-the-art Flux, you can drive a great amount of control with just your prompt. Similar SDXL adapters will soon be available for Flux."

	let third_feature_title = 'Generation Console';
	let third_feature_body = "Kick off as many image generations as you want while tweaking typical prompt settings like guidance scale, seed, image-to-image, and inpainting. You'll also find your trained models in this console; select one and include its name in your prompt text to generate images of the model's trained subject.";


	let fourth_feature_title = 'Collections';
	let fourth_feature_body = "Each generation is saved in a collection. You can create a new collection, rename it, and navigate between collections. Within a collection, you can favorite the ones you love and select the ones you want to delete or share with friends.";

	let fifth_feature_title = 'ControlNets and IP-Adapter';
	let fifth_feature_body = "ControlNets enable more control over the final output, utilizing techniques such as pose manipulation (OpenPose), edge detection (Canny), and depth mapping (Depth). IP-Adapter allows you to emulate the style, composition, or the face found in a reference image. In combination w/ a trained model, these tools make it possible to generate cool images that actually look like you!";

	

	// let second_feature_title = 'Train';
	// let second_feature_body = 'Kick off training your custom model  AI will train on the images you uploaded. The .';

	// let third_feature_title = 'Generate';
	// let third_feature_body = 'Once the AI is trained, we will kick off generating images across a set of themes.';

	// let fourth_feature_title = 'Receive';
	// let fourth_feature_body = 'Once all images are generated, we will email you a link to your image set. From there, download, share, and use your new images!';

	let timeline_a_title = 'Flux Training';
	let timeline_a_body = "With a trained Flux model, the quality and resemblance of your generations will be greatly improved in combination with the model's spectacular prompt adherence.";
	let timeline_a_date = 'September 2024';

	let timeline_b_title = 'Flux Adapters';
	let timeline_b_body = "The same adapters used to drive control in SDXL (ControlNets and IP-Adapter) will be made available for Flux; unlocking greater precision!";
	let timeline_b_date = 'October 2024';

	let timeline_c_title = 'SDXL + Flux Styles';
	let timeline_c_body = "With a trained style model (LoRa), you will be able to generate images that more precisely follows a particular style. The possibilities are endless when combining more than one style together!";
	let timeline_c_date = 'November 2024';

	
	let contactFormTitle = 'Contact Us';
	let currentYear = new Date().getFullYear().toString();

	// <div class="hidden lg:flex lg:gap-x-12">
	// 	<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Product</a>
	// 	<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Features</a>
	// 	<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Company</a>
	// </div>

	// <div class="hidden lg:flex lg:flex-1 lg:justify-end">
	// 	<a href="#" class="text-sm font-semibold leading-6 text-gray-900 hidden">Log in <span aria-hidden="true">→</span></a>
	// </div>

	return `
	<div class="bg-white flex flex-col gap-y-20">
		<header class="absolute inset-x-0 top-0 z-50">
			<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div class="flex lg:flex-1">
					<a href="#" class="-m-1.5 p-1.5 flex items-center">
						<img class="h-8 w-auto pr-2" src="https://storage.googleapis.com/sketchmeai-public/branding/sketchmeai%20logo%403x.png" alt=""><span class="font-medium text-xl pt-1 hidden md:block">SketchMeAi</span>
					</a>
				</div>

				<button id="basic-examples-button" onclick="takeToBlog()" class="cursor-pointer border-2 border-black rounded-md flex-0 float-right text-center px-8 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Checkout Our Blog</button>
				
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
			<div class="pt-24" id="hphero">
				<div class="lg:flex justify-between mx-auto max-w-7xl px-6 lg:px-8 items-center">
					<div class="m-5 lg:m-10 mx-auto max-w-2xl text-center min-w-[40%]">
						<p id="dev-log-str"></p>
						<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-left">${headerTitle}</h1>
						<p class="mt-6 text-lg leading-8 text-secondary text-left">${headerSubtitle}</p>
						<div class="mt-10 flex flex-col items-start justify-left gap-x-6">
							<a href="${headerButtonUrl}" class="rounded-md bg-black px-8 py-2.5 text-lg text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">${headerButtonTitle}</a>
							<div class="mt-4">
								<label class="text-gray-800">Already have an account?</label>
								<button class="text-black font-semibold ml-1" onclick="attemptToLogin()">Login</button>
							</div>
						</div>
					</div>
					<div class="mt-4 flow-root sm:mt-4">
						<div class="mt-6 mb-4 mx-0 md:mx-16 lg:mx-10">
							<img src="https://storage.googleapis.com/sketchmeai-public/branding/homepage_09.24/homepage_hero_09.24.png" alt="App screenshot" width="2432" height="1442" class="max-h-min">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-gray-100" id="generateWithControl">
			<div class="my-24 mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Generate with Control</h1>
				</div>

				<div class="mt-14 mb-12 mx-0 md:mx-16 lg:mx-24">
					<img src="https://storage.googleapis.com/sketchmeai-public/branding/homepage_09.24/homepage_generate_with_control.png" alt="Generation example" width="2432" height="1442" class="max-h-min">
				</div>

				<div class="mx-auto max-w-2xl lg:max-w-4xl">
					<p class="mt-7 text-lg leading-8 text-secondary text-leftx">Use Flux to generate with prompt precision and then transform it to look like you! With control nets and IP-adapter, control the composition of generations while maintaining facial resemblance.</p>
				</div>
			</div>
		</div>

		<div class="bg-transparent" id="howitworks">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
				<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">SkechMeAi Features</p>
				</div>
				<div class="mx-auto mt-14 max-w-2xl lg:max-w-4xl">
					<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-12">
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
						<div class="relative pl-16">
							<dt class="text-base font-semibold leading-7 text-gray-800">
								<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
									<p class="font-semibold text-2xl text-white">4</p>
								</div>
								${fourth_feature_title}
							</dt>
							<dd class="mt-2 text-base leading-7 text-gray-600">${fourth_feature_body}</dd>
						</div>
						<div class="relative pl-16">
							<dt class="text-base font-semibold leading-7 text-gray-800">
								<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
									<p class="font-semibold text-2xl text-white">5</p>
								</div>
								${fifth_feature_title}
							</dt>
							<dd class="mt-2 text-base leading-7 text-gray-600">${fifth_feature_body}</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>

		<div id="console-screenshot-container" class="bg-gray-100 py-24">
			<h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center">Powered by Stable Diffusion and Flux</h2>
			<p class="mt-2 text-lg leading-8 text-secondary text-center mx-auto max-w-2xl lg:max-w-4xl italic">Training on Flux coming soon!</p>
			<div class="flex flex-center">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<img src="https://storage.googleapis.com/sketchmeai-public/branding/homepage_09.24/desktop_hp_capture.gif" class="mt-12 mb-14 shadow-2xl" width="750" height="1442">
					<div class="text-center mt-8">
						<button class="rounded-md bg-black px-8 py-2.5 text-lg text-white shadow-sm hover:bg-gray-700">
							Start generating with AI
						</button>
						<div class="mt-4">
							<label class="text-gray-800">Already have an account?</label>
							<button class="text-black font-semibold ml-1" onclick="attemptToLogin()">Login</button>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div id="faq-container" class="px-6 lg:px-8 bg-transparent">
			<div class="my-4 mx-auto max-w-4xl divide-y divide-gray-900/10">
				<h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center">Frequently asked questions</h2>
				<dl class="mt-12 space-y-6 divide-y divide-gray-900/10">
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
								Image generation and model training both require SketchMeAi credit to use; which can be purchased via Stripe. For SDXL, cost of generation and training depends on denoising steps and amount of training data, respectively. Where on average, SDXL generation is ~$0.04/image and training a model is ~$0.90/training (on 3 images). For Flux (schnell), cost of generation is simply $0.008/image.
							</p>
						</dd>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										How long does it take to train a model? (SDXL)
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
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									Training a custom SDXL model typically takes 25-30 minutes, based on 10 starting images. We'll send you an email to notify you when your model is complete and a link taking you to the generation console with the new model selected.
								</p>
							</dd>
						</div>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										How long does it take to generate images?
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
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									On SDXL, a simple image takes as little as 10-15 seconds at 20 denoising steps, and closer to 35-55s when using any of the adapters. However, our custom SDXL server first needs to be spun up for use, which can take ~2 minutes; this is called cold booting. Once our server has cold booted or whenever a generation is made, the server will remain "warm" for about 5 minutes; no longer needing to wait for a cold boot. This auto-warming mechanism was introduced in September 2024. Flux generations are much faster, taking only 2-3 seconds per image and doesn't require any cold booting.
								</p>
							</dd>
						</div>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										What happens if I cancel a training?
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
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									If for whatever reason, you decide to cancel a training before it has completed, you will only be charged against the active training time. For example, when kicking off a training, the total estimated cost will be deducted from your credit balance and if you cancel mid-training, the unused portion of that cost will be credited back to your account automatically. Image generations cannot be canceled or refunded.
								</p>
							</dd>
						</div>

						<div x-data="{ open: false }" class="pt-6">
							<dt>
								<button type="button" x-description="Expand/collapse question button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" @click="open = !open" aria-expanded="false" x-bind:aria-expanded="open.toString()">
									<span class="text-base font-semibold leading-7">
										Why is my trained model not generating images that resemble the training data?
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
							<dd class="mt-2 pr-12" id="faq-0" x-show="open">
								<p class="text-base leading-7 text-gray-600">
									Resemblance to your training data depends on a number of factors. The first and most impactful is the quality of your training data; high quality images with varied angles and good lighting means better resemblance in your results. Prompt settings, like lora scale and guidance scale, can be adjusted to improve resemblance. Our default values usually work well for us, but you may need to play around with the settings to yield the best results for your models and prompts. The number of denoising steps can influence the resemblance and detail of your generated image, but note that increasing denoising steps will increase generation cost. Lastly, another way to drive resemblance is to use IP-Adapter with a closeup face picture as the reference image and set to 'use the face'. Once you generate an image that good resemblance, you can use that image w/ one or more controlnets to drive resemblance even further.
								</p>
							</dd>
						</div>

					</div>
					<div class="text-sm leading-7 mt-12">Have more questions? Send us a message using the contact form below.</div>
				</dl>
			</div>
		</div>
	  
		<div id="roadmap" class="bg-gray-100">
			<div class="my-24 mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl text-center mb-12">
					<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Roadmap</p>
				</div>
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
						
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
							<p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">${timeline_c_title}</p>
							<p class="mt-1 text-base leading-7 text-gray-600">${timeline_c_body}</p>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div id="${contactUsId}" class="bg-transparent border dark:border-white/10">
			<div class="mt-4 mx-auto max-w-2xl text-center mb-12">
					<p class="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">${contactFormTitle}</p>
			</div>
			<div class="mt-8 mb-4 mx-auto block max-w-md rounded-lg bg-transparent px-6 shadow-4 dark:bg-surface-dark">
				<form id="contact-us-form">
					<div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

						<div class="col-span-full" id="name-field-container">
							<div class="flex items-center">
								<label for="user-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
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
		

		<footer class="bg-gray-100">
			<div class="text-center pt-4">
				<a href="#hphero" class="text-gray-500">Back to top ^</a>
			</div>
			<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
				<div class="flex justify-center space-x-6 md:order-2">
					<a href="https://www.facebook.com/profile.php?id=61557690907112&mibextid=LQQJ4d" class="text-gray-400 hover:text-gray-800">
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
						</svg>
					</a>
					<a href="https://www.instagram.com/sketchmeai?igsh=MXRlOGVtb3E5c2I2Zw%3D%3D&utm_source=qr" class="text-gray-400 hover:text-gray-800">
						<span class="sr-only">Instagram</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
						</svg>
					</a>
					<a href="https://x.com/sketchmeai?s=21&t=HOU0u5IkpDBQn5iBI7cHIg" class="text-gray-400 hover:text-gray-800">
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