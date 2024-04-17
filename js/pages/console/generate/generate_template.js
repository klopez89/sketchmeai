const denoisingInfo = "Each step reduces the noise a bit more, adding detail and coherence to the image. The more denoising steps, the more detailed and polished the image can become, but it also takes more time to generate; directly affecting generation cost. There is a drop off where more steps do not result in more details."
const negativePromptInfo = "The negative prompt in image generation acts as a guide for what the model should avoid including in the output image. It helps in steering the generation away from undesired elements or themes by explicitly stating what you do not want to appear in the final result."
const guidanceScaleInfo = "Also know as 'classifier free guidance' or cfg. Guidance scale controls how closely the generation should adhere to the input prompt. A higher value enforces greater fidelity to the prompt, potentially leading to more accurate but less varied results, while a lower value allows for more creative interpretations."
const imgToImgURLInfo = "Provides a starting image that the model will use as a base to apply the transformations specified by your prompt. A way to direct the AI to modify or build upon an existing image rather than creating one from scratch."
const promptStrengthInfo = "Only applicable for image to image generation. A higher value makes the final image adhere more closely to the details of the prompt, while a lower value retains more of the reference image's features."
const loraScaleInfo = "Adjusts the extent to which a fine-tuned model's specialized training influences the generated image, blending the base model's knowledge with the fine-tuned nuances."


function newGenItem_FromExistingGen(generation) {
    gen_string = JSON.stringify(generation);
    return newGridItemHTML(generation.rec_id, gen_string);
}

function newGenItem_FromNewGen(generation_id) {
    return newGridItemHTML(generation_id);
}


function newGridItemHTML(gen_id, gen_string="") {
    const placeholderImageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAAX8A+gBk0h+kgAAAABJRU5ErkJggg==";
    return `
    <div class="relative rounded-lg overflow-hidden" generation-id="${gen_id}" gen-info="${gen_string}">
        <div class="selectable group aspect-h-10 aspect-w-10 block w-full relative">

            <img src="${placeholderImageURL}" alt="" class="object-cover group-hover:opacity-95 transition-opacity opacity-0 duration-200 cursor-pointer data-[te-lightbox-disabled]:cursor-auto" onclick="goingToLightbox(event)">
            
            <div id="gen-loader" class="bg-gray-200 flex justify-center items-center">
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500" aria-hidden="true"></i>
                <p class="absolute bottom-0 right-0 pb-2 pr-2 text-xs text-gray-500" id="gen-status"></p>
                <button class="absolute top-0 right-0 p-2 text-xs text-gray-400 hover:text-gray-500 hidden" id="cancel-button">Cancel</button>
            </div>

            <div id="action-container" class="hidden bg-transparent group-hover:bg-gray-900 group-hover:bg-opacity-10 pointer-events-none group transition-bg-opacity duration-200">
                <button id="copy-button" class="absolute hidden md:flex bottom-2 right-2 p-2 text-md text-white border-2 border-white opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-gray-800 rounded-lg pointer-events-auto items-center justify-center transition-opacity duration-200">
                    <i class="fa fa-copy" aria-hidden="true"></i>
                </button>

				<button id="favorite-button" class="absolute w-16 h-16 aspect-w-1 aspect-h-1 flex bottom-0 left-0 p-2 text-2xl text-white border-0 border-white opacity-100 rounded-lg pointer-events-auto items-center justify-center transition-opacity duration-200">

					<div class="flex flex-grow items-center justify-center text-center">
						<span class="flex items-center justify-center pr-2 pt-2">
							<i class="fa-regular fa-heart" aria-hidden="true"></i>
						</span>
						<i class="fa fa-spinner fa-spin hidden absolute mr-2 mt-2" aria-hidden="true"></i>
					</div>
				</button>

            </div>

            <div id="gen-menu-shield" class="bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full hidden" onclick="tappedGenMenuShield(event)"></div>
        
			<div class="selection-overlay absolute inset-0 cursor-pointer pointer-events-none">
				<div class="overlay-bg h-full w-full"></div>
				<i class="fa fa-circle checkbox hidden absolute top-2 right-2 cursor-pointer text-gray-800 text-3xl"></i>
			</div>

        </div>
    </div>
    `;
}

function createGridHTML(numCopies) {
    let htmlString = '';
    for (let i = 0; i < numCopies; i++) {
        const imageUrl = imageUrls[i % imageUrls.length];
        htmlString += `
            <li class="relative">
                <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <img src="${imageUrl}" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                    <button type="button" class="absolute inset-0 focus:outline-none"></button>
                </div>
            </li>
        `;
    }
    return htmlString;
}

// <textarea id="prompt" name="prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 110px;"></textarea>


function dummyGridHTML() {

    return `
    <!-- 3 column wrapper -->
    <div class="mx-auto w-full h-full grow md:flex">

        <div id="generate-form-container" class="h-full overflow-y-auto bg-gray-100 pb-4 pt-4 min-w-80 md:w-[400px] max-w-full border-r border-gray-300 hidden md:block">

        </div>

        <!-- Right column area -->
        <div class="flex-1 md:flex h-full">
            <div class="bg-gray-100 px-0 py-0 md:flex-1 h-full">
                <div class="bg-gray-100 h-full relative">

					<div id="gen-top-menu" class="hidden md:flex opacity-0 transition-opacity duration-300 absolute bg-gray-100 p-2 z-20 w-full justify-between border-b border-gray-300">



						<div id="gen-top-collection-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
							<button type="button" class="flex h-full rounded-md cursor-pointer items-center gap-2 pl-3 pr-8 py-0 text-sm leading-6 bg-gray-200 hover:bg-gray-300 text-gray-700" id="mobile-bottom-action-menu-button" onclick="genTopCollectionMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="true" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
								<p class="text-gray-500">Collection: </p>
								<p id="gen-top-menu-collection-name">Coma</p>
							</button>

							<div class="absolute left-0 top-0 z-10 mt-9 ml-2 min-w-36 w-max">

								<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md overflow-hidden bg-white py-0 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1">

									<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); newCollectionPressed(event)">New Collection</a>

									<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); changeCollectionPressed(event)">Change Collection</a>

									<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 2 }" role="menuitem" tabindex="-1" id="user-menu-item-2" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 2)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); renameCollectionPressed(event)">Rename Collection</a>

								</div>
							</div>
						</div>



						<button type="button" class="select-to-share-button min-w-20 ml-3 inline-flex justify-center items-center rounded-md px-3 py-2 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600 bg-gray-200 text-gray-500 hover:bg-gray-300" onclick="toggleImageSelectability()">Select</button>
					</div>

					<div class="selection-bar absolute bottom-0 w-full right-0 py-5 px-5 bg-gray-100 shadow-sm border-t border-gray-200 z-[35] hidden">
						<div class="float-right space-x-4 flex">
							<button type="button" class="inline-flex items-center rounded-md px-3 py-2 text-sm shadow-sm bg-gray-200 text-gray-400 hover:bg-gray-300" onclick="toggleImageSelectability()">Cancel</button>
							
							<button type="button" class="ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm shadow-sm text-white bg-gray-200" onclick="deleteSelectedPressed(event)" id="deleteSelectedButton">Delete</button>

							<button id="share-button" type="button" class="share-button ml-3 flex flex-grow justify-center items-center text-center rounded-md bg-gray-200 px-3 py-2 text-sm text-white shadow-sm">
								<p id="desktop-gen-button-label" class="flex items-center">Share</p>
								<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
							</button>
						</div>
					</div>

                    <div id="collection-grid-container" class="relative h-full mx-auto max-w-7xl px-1 md:pt-[4.2rem] overflow-y-auto">
                        <div data-te-lightbox-init id="collection-grid" role="list" class="grid grid-cols-2 gap-x-1 gap-y-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" @click.away="clickedOutsideOfGenMenu()" onclick="clickedOnEmptyPartOfGrid()"></div>

                        <div id="grid-loader" class="absolute top-0 left-0 w-full h-full px-4 py-8 sm:px-6 lg:px-8">
                            <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                                <div class="mt-5">    
                                    <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>  
                        <div id="infiniteLoader" class="hidden text-4xl text-gray-500 w-full flex bg-transparent flex flex-col items-center mt-6 mb-6">
                            <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function baseGenMenuHTML() {
    return `
    <div class="gen-comp-menu hidden relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
        <button type="button" class="absolute text-2xl text-white rounded-lg w-12 h-12 aspect-w-1 aspect-h-1 top-2 right-2 flex items-center p-4 opacity-100 md:opacity-0 group-hover:opacity-100 hover:text-gray-200 transition-opacity duration-200" id="gen-menu-button" onClick="genMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
			<span class="flex items-start justify-end pr-2 pt-2">
				<i class="fa-solid fa-ellipsis-vertical shadow-2xl" aria-hidden="true"></i>
			</span>
        </button>

		<div class="p-2 absolute right-0 z-10 mt-11 origin-top-right">

			<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
			
				<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); useAsReferenceImagePressed(event)">Use as Reference</a>

				<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); copyPromptFromGenMenuPressed(event)">Copy Prompt</a>

				<a href="#" class="block px-3 py-1 text-sm leading-6 text-red-600" :class="{ 'bg-gray-50': activeIndex === 2 }" role="menuitem" tabindex="-1" id="user-menu-item-2" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 2)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); deleteButtonPressed(event)">Delete</a>

			</div>
		</div>

    </div>
    `;
}

function generate_form_html() {
	return `
	<form class="generate-form overflow-y-auto flex flex-col px-0 py-4" id="generateForm">

		<p class="text-xl font-bold mb-4 md:hidden">Generation Settings</p>

		<div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
			<div class="col-span-full" id="prompt-field-container">
				<div class="flex justify-between items-center">
					<label for="prompt" class="block text-sm font-medium leading-6 text-gray-900">Prompt</label>
					<button onclick="basicPromptExampleButtonPressed(event)" class="underline text-sm text-gray-700 hover:text-gray-900">Examples</button>
				</div>
				<div class="mt-2">
					<div id="prompt" name="prompt" rows="3" class="max-w-full overflow-y-auto bg-white whitespace-normal editable break-words outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 110px;"></div>
				</div>
			</div>

			<div class="col-span-full flex-col justify-center hidden md:flex" id="gen-button-container">
				<button id="gen-button" class="cursor-pointer rounded-md flex flex-grow justify-center items-center text-center bg-black px-3.5 py-2.5 text-lg text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onclick="generateButtonPressed(event)">
					<p id="desktop-gen-button-label" class="flex items-center">Generate</p>
					<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
				</button>
			</div>
		</div>

		<p class="text-xs text-gray-400 italic mt-1 ml-1" id="generation-estimate-label">Estimated cost: $0.04 ($0.11 from cold boot)<br>@ 20 denoising steps</p>

		<div class="px-0 pt-4 pb-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6" id="model-selection-section">

			<div class="col-span-full" id="models-field-container">
				<label for="models" class="block text-sm font-medium leading-6 text-gray-900">Models</label>
				<div class="mt-2">
					<select id="model-dropdown" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" size="6" multiple="">
						<option selected="" id="sdxl" instkey="zxc" modelname="sdxl" model="stability-ai/sdxl" version="39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b">&nbsp;&nbsp;Stable Diffusion SDXL</option>
					</select>
				</div>
			</div>
		</div>


		<div class="px-0 pt-4 pb-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6" id="rest-gen-settiongs-section">
			<div class="sm:col-span-3" id="gen-count-field-container">
				<label for="gen-count" class="block text-sm font-medium leading-6 text-gray-900"># of Images</label><div class="mt-2">
					<select id="gen-count" name="gen-count" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
						<option>10</option>
					</select>
				</div>
			</div>
			<div class="sm:col-span-3" id="denoising-steps-field-container">
					<label for="denoising-steps" class="text-sm font-medium leading-6 text-gray-900">Denoising Steps</label>
					<button onclick="event.preventDefault()" data-te-trigger="click" data-te-toggle="popover" data-te-title="Denoising Steps" data-te-content="Each step reduces the noise a bit more, adding detail and coherence to the image. The more denoising steps, the more detailed and polished the image can become, but it also takes more time to generate; directly affecting generation cost. There is a drop off where more steps do not result in more details." class="ml-2 text-gray-300" data-te-original-title="" title="">
						<i class="fa-solid fa-circle-info" aria-hidden="true"></i>
					</button>
					<div class="mt-2">
						<input type="number" name="denoising-steps" id="denoising-steps" placeholder="20" min="4" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
						<p class="text-right text-xs text-gray-400 mt-1 ml-1">4 - 100</p>
					</div>
			</div>
			<div class="col-span-full" id="neg-prompt-field-container">
				<label for="neg-prompt" class="text-sm font-medium leading-6 text-gray-900">Negative Prompt</label>
				<button onclick="event.preventDefault()" data-te-trigger="click" data-te-toggle="popover" data-te-title="Negative Prompt" data-te-content="The negative prompt in image generation acts as a guide for what the model should avoid including in the output image. It helps in steering the generation away from undesired elements or themes by explicitly stating what you do not want to appear in the final result." class="ml-2 text-gray-300" data-te-original-title="" title="">
					<i class="fa-solid fa-circle-info" aria-hidden="true"></i>
				</button>
				<div class="mt-2">
				<textarea id="neg-prompt" name="neg-prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 80px;">ugly, morbid, photorealistic</textarea>
				</div>
			</div>
			<div class="sm:col-span-3" id="gs-field-container">
				<label for="guidance-scale" class="text-sm font-medium leading-6 text-gray-900">Guidance Scale</label>
				<button onclick="event.preventDefault()" data-te-trigger="click" data-te-toggle="popover" data-te-title="Guidance Scale" data-te-content="Also know as 'classifier free guidance' or cfg. Guidance scale controls how closely the generation should adhere to the input prompt. A higher value enforces greater fidelity to the prompt, potentially leading to more accurate but less varied results, while a lower value allows for more creative interpretations." class="ml-2 text-gray-300" data-te-original-title="" title="">
					<i class="fa-solid fa-circle-info" aria-hidden="true"></i>
				</button>
				<div class="mt-2">
				<input type="number" name="guidance-scale" id="guidance-scale" placeholder="13" min="1.0" max="20.0" step="0.1" value="13" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
				<p class="text-right text-xs text-gray-400 mt-1 ml-1">1.0 - 20.0</p>
				</div>
			</div>
			<div class="sm:col-span-3" id="seed-field-container">
				<div class="flex items-center">
					<label for="seed" class="flex-grow block text-sm font-medium leading-6 text-gray-900">Seed</label>
					<button onclick="randomizeSeed(event)" title="Random seed">
						<i class="fa-solid fa-dice-three text-gray-500" aria-hidden="true"></i>
					</button>
				</div>
				<div class="mt-2">
					<input type="number" name="seed" id="seed" min="-1" max="4294967295" value="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" placeholder="Random">
					<p class="text-right text-xs text-gray-400 mt-1 ml-1">0 - 4294967295</p>
				</div>
			</div>
			<div class="sm:col-span-3" id="lora-field-container">
				<label for="lora-scale" class="text-sm font-medium leading-6 text-gray-900">Lora Scale</label>
				<button onclick="event.preventDefault()" data-te-trigger="click" data-te-toggle="popover" data-te-title="Lora Scale" data-te-content="Adjusts the extent to which a fine-tuned model's specialized training influences the generated image, blending the base model's knowledge with the fine-tuned nuances." class="ml-2 text-gray-300" data-te-original-title="" title="">
					<i class="fa-solid fa-circle-info" aria-hidden="true"></i>
				</button>
				<div class="mt-2">
					<input type="number" name="lora-scale" id="lora-scale" placeholder="0.8" min="0.0" max="1.0" step="0.01" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" value="0.8">
					<p class="text-right text-xs text-gray-400 mt-1 ml-1">0.00 - 1.00</p>
				</div>
			</div>

			<div class="col-span-full px-4 border-y border-gray-300">
				<!-- Start of the new nested accordion for img-2img-url and prompt-strength fields -->
				<div id="nestedAccordion">
					<h2 id="nestedHeading" class="flex items-center justify-between py-2">
						<button class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 text-right text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedImg2ImgCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed="">

							<span class="mr-2 mt-0 h-4 w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
								</svg>
							</span>

							Reference Image

						</button>

					<div class="flex gap-2">
						<button title="Clear reference image" onclick="clearRefImgElement(event)" class="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center">
							<i class="fa-solid fa-trash text-gray-500 text-xs" aria-hidden="true"></i>
						</button>
						
						<div id="edit-ref-comp-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">

							<button type="button" class="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center" id="gen-ref-menu-button" onclick="genRefMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
								<i class="fa-solid fa-pen text-gray-500 text-xs" aria-hidden="true"></i>
							</button>
					
							<div class="m-0 absolute right-0 z-10 mt-1 origin-top-right min-w-[15rem]">
					
								<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
								
									<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); showRefImageUrlModal(event)">Enter Image URL</a>
					
									<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); startRefUploadExperience()">Upload Image</a>
					
								</div>
							</div>
						</div>

					</div>

					</h2>
					<div id="nestedImg2ImgCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">
						<div class="accordion-body px-0 pb-4 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-6">

							<!-- img-2img-url field -->
							<div class="col-span-full" id="igm2img-field-container">
								<div id="ref-img-div-container" class="flex items-center justify-center pt-1 pb-2">
									<button id="ref-img-button" class="relative flex flex-col items-center justify-center block w-[8em] h-[8em] rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
										
										<img class="hidden absolute w-full h-full rounded-lg" src="">

										<div class="hidden absolute bg-gray-200 h-full w-full" id="upload-spinner">
											<div class="flex flex-col h-full items-center justify-center">		
												<p class="text-xs text-gray-500 break-words mb-2">Processing<br>Images</p>
												<i id="upload-spinner" class="text-gray-500 fa fa-spinner fa-spin" aria-hidden="true"></i>
											</div>
										</div>

										<div class="flex flex-col items-center">		
											<i id="upload-icon" class="fa text-3xl fa-images" aria-hidden="true"></i>
											
										</div>
									</button>
									<input id="localRefImgUploadInput" type="file" style="display:none;" multiple="">
								</div>
								
								<div class="mt-0">
									<input type="text" name="img-2-img-url" id="img-2-img" class="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
								</div>
							</div>


							<div class="col-span-3 flex items-center" id="mode-title-container">
								<label for="prompt-strength" class="text-sm font-medium leading-6 text-gray-900">Mode</label>
								<button onclick="event.preventDefault()" data-te-trigger="click" data-te-toggle="popover" data-te-title="Image to Image URL" data-te-content="Provides a starting image that the model will use as a base to apply the transformations specified by your prompt. A way to direct the AI to modify or build upon an existing image rather than creating one from scratch." class="ml-2 pt-0 text-gray-300" data-te-original-title="" title="">
									<i class="fa-solid fa-circle-info" aria-hidden="true"></i>
								</button>
							</div>

							<div class="col-span-3" id="mode-selector-container">
								<select id="gen-count" name="gen-count" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									<option>Image to Image</option>
								</select>
							</div>


							<div class="col-span-2" id="influence-title-container">
								<label for="influence" class="text-sm font-medium leading-6 text-gray-900">Influence, %</label>
							</div>

							<div class="col-span-4 flex gap-x-2" id="influence-slider-container">
								<input type="range" id="ref-influence-range" name="ref-influence-range" min="0" max="95" class="slider flex-grow" autocompleted="">
								<input type="number" name="prompt-str" id="prompt-str" placeholder="80" min="0" max="95" value="80" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
							</div>

						</div>
					</div>
				</div>
				<!-- End of the new nested accordion -->
			</div>
		</div>

		<div class="flex-grow"></div>
	</form>
	`;
}

function new_model_option(model) {
	console.log('the mode for a new model option: ', model);
	let model_id = model.rec_id;
	let replicate_name = model.replicate_name;
	let instKey = model.token_string ? model.token_string : "zxc";
	let long_version = model.version;
	let short_version = long_version.includes(':') ? long_version.split(':')[1] : long_version;
	let model_name = model.name;
	let gender_type = model.gender_type;
	var training_subject = model.training_subject ? model.training_subject : "person";
    return `
    <option id="${model_id}" instkey="${instKey}" model="${replicate_name}" version="${short_version}" modelName="${model_name}" trainingSubject="${training_subject}" genderType=${gender_type}>&nbsp;&nbsp;${model_name}</option>
    `;
}

function bottom_generation_menu_html() {
	return `
	<div id="mobile-bottom-menu" class="hidden md:hidden fixed right-0 bottom-0 m-4 z-30 flex gap-4 items-end bg-opacity-50">
		<button id="gen-settings-bottom-button" class="bg-gray-100 text-black text-xl shadow-lg rounded-full w-12 h-12 flex items-center justify-center" @click="open = !open">
			<i class="fa-solid fa-gear" aria-hidden="true"></i>
		</button>

		<div class="flex flex-col gap-4">


			<div id="mobile-bottom-action-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
				<button type="button" class="bg-gray-700 text-white text-lg shadow-lg rounded-full w-12 h-12 flex items-center justify-center" id="mobile-bottom-action-menu-button" onClick="mobileGenMoreMenuShowing()" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
					<i class="fa-solid fa-caret-up" aria-hidden="true"></i>
				</button>

				<div class="p-2 absolute right-0 bottom-0 z-10 mb-12 mr-4 min-w-36 w-max">

					<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md overflow-hidden bg-white py-0 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
					
						<div id="collection-name-label-container" class="block pl-3 pr-8 py-2 text-sm leading-6 bg-gray-100 text-gray-700 border-gray-200 border-b">
							<p class="text-xs text-gray-500">Collection</p>
							<p id="collection-name-label">Default</p>
						</div>

						<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); newCollectionPressed(event)">New Collection</a>

						<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); changeCollectionPressed(event)">Change Collection</a>

						<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 2 }" role="menuitem" tabindex="-1" id="user-menu-item-2" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 2)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); renameCollectionPressed(event)">Rename Collection</a>

						<a href="#" class="block pl-3 pr-8 py-2 text-sm leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 3 }" role="menuitem" tabindex="-1" id="user-menu-item-3" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 3)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); multiSelectPressed(event)">Multi-Select</a>

					</div>
				</div>
			</div>


			<button id="generate-bottom-button" class="bg-black text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center" onclick="generateButtonPressed(event)">
				<i id="mobile-gen-icon" class="fa-solid fa-bolt-lightning" aria-hidden="true"></i>
			</button>
		</div>
	</div>
	`;
}

function newCollectionModalHTML() {
	return `
	<div id="new-collection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl mx-auto bg-white p-7 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700" onclick="dismissNewCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-4">
				<h2 class="text-3xl text-gray-900 mb-2">New Collection</h2>
			</div>

			<div class="mb-1">
				<label for="new-collection-name" class="block text-sm font-medium leading-6 text-gray-900">Collection Name</label>
				<div class="relative flex">
					
					<input type="text" name="new-collection-name" id="new-collection-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
					<button id="create-new-collection-button" class="flex flex-grow justify-center items-center text-center bg-black text-white font-semibold px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToCreateNewCollection()">
						<p id="new-collection-button-label" class="flex items-center">Create</p>
						<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
					</button>
				</div>
			</div>

			<div class="flex space-x-2">
				<p id="new-collection-error-label" class="flex-1 text-left py-0 rounded text-xs text-red-500">&nbsp;</p>
			</div>
		</div>
	</div>
	`;
}

function changeCollectionModalHTML() {
	return `
	<div id="change-collection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl mx-auto bg-white p-7 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700" onclick="dismissChangeCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl text-gray-900 mb-4">Change Collection</h2>
			</div>

			<div class="mb-0">
				<label id="change-collection-label" class="block text-sm mb-1 font-medium leading-6 text-gray-400">from</label>
				<div class="relative flex">
					
					<select id="collection-list" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
						
					</select>

					<button id="change-collection" class="bg-black text-white px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToChangeCollection()">Change</button>
				</div>
			</div>

		</div>
	</div>
	`;
}

function renameCollectionModalHTML() {
	return `
	<div id="rename-collection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl mx-auto bg-white p-7 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700" onclick="dismissRenameCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl text-gray-900 mb-4">Rename Collection</h2>
			</div>

			<div class="mb-0">
				<label id="rename-collection-name-label" class="block text-sm font-medium leading-6 text-gray-400">for</label>
				<div class="relative flex">
					
					<input type="text" name="rename-collection-name" id="rename-collection-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">

					<button id="rename-new-collection-button" class="flex flex-grow justify-center items-center text-center bg-black text-white px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToRenameCollection()">
						<p id="rename-button-label" class="flex items-center">Rename</p>
						<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
					</button>

				</div>
			</div>
		</div>
	</div>
	`;
}

function enterRefImageUrlModalHTML() {
	return `
	<div id="enter-ref-img-url-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl mx-auto bg-white p-7 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700" onclick="dismissEnterRefImgUrlModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl text-gray-900 mb-4">Reference Image Url</h2>
			</div>

			<div class="mb-0">
				<div class="relative flex">
					
					<input type="text" name="ref-img-url" id="ref-img-url" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">

					<button id="ref-img-url-button" class="flex flex-grow justify-center items-center text-center bg-black text-white px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToEnterRefImgUrl()">
						<p id="rename-button-label" class="flex items-center"></p>
						<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
					</button>

				</div>
			</div>
		</div>
	</div>
	`;
}