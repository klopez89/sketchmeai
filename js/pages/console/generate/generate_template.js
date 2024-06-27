const denoisingInfo = "Each step reduces the noise a bit more, adding detail and coherence to the image. The more denoising steps, the more detailed and polished the image can become, but it also takes more time to generate; directly affecting generation cost. There is a drop off where more steps do not result in more details."
const negativePromptInfo = "The negative prompt in image generation acts as a guide for what the model should avoid including in the output image. It helps in steering the generation away from undesired elements or themes by explicitly stating what you do not want to appear in the final result."
const guidanceScaleInfo = "Also know as 'classifier free guidance' or cfg. Guidance scale controls how closely the generation should adhere to the input prompt. A higher value enforces greater fidelity to the prompt, potentially leading to more accurate but less varied results, while a lower value allows for more creative interpretations."
const imgToImgInfo = "Uses an image as a starting point for the generation, rather than starting from random noise. Ideal for guiding the color composition of your output."
const openPoseControlNetInfo = "Extracts the estimated position of the human pose in an image, and is then used to influence the human pose in your generation."
const cannyControlNetInfo = " Identifies the edges and shapes in an image, and then uses this information to guide the structure and form in your generated image."
const depthControlNetInfo = "Analyzes the depth information in an image to guide the generation process, ensuring that the generated image maintains a coherent sense of depth and spatial relationships."
const promptStrengthInfo = "Only applicable for image to image generation. A higher value makes the final image adhere more closely to the details of the prompt, while a lower value retains more of the reference image's features."
const loraScaleInfo = "Adjusts the extent to which a fine-tuned model's specialized training influences the generated image, blending the base model's knowledge with the fine-tuned nuances."


const md_font_size = "text-3xl";

var has_a_mouse = false;
if (matchMedia('(pointer:fine)').matches) {
	has_a_mouse = true;
}
let info_interaction_type = has_a_mouse ? "hover" : "click";

function newGenItem_FromExistingGen(generation) {
    let gen_string = JSON.stringify(generation);
    return newGridItemHTML(generation.rec_id, gen_string);
}

function newGenItem_FromNewGen(generation_id) {
    return newGridItemHTML(generation_id);
}


function newGridItemHTML(gen_id, gen_string="") {
    const placeholderImageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAAX8A+gBk0h+kgAAAABJRU5ErkJggg==";
    return `
    <div class="relative" generation-id="${gen_id}" gen-info="${gen_string}">
        <div class="selectable group aspect-h-10 aspect-w-10 block w-full relative">

            <img src="${placeholderImageURL}" alt="" class="rounded-lg object-cover group-hover:opacity-95 transition-opacity opacity-0 duration-200 cursor-pointer data-[te-lightbox-disabled]:cursor-auto" onclick="goingToLightbox(event)">
            
            <div id="gen-loader" class="bg-gray-200 flex justify-center items-center">
                <i class="fa fa-spinner fa-spin text-4xl md:text-6xl lg:text-4xl text-gray-500" aria-hidden="true"></i>
                <p class="absolute bottom-0 right-0 pb-2 pr-2 text-xs text-gray-500" id="gen-status"></p>
                <button class="absolute top-0 right-0 p-2 text-xs text-gray-400 hover:text-gray-500 hidden" id="cancel-button">Cancel</button>
            </div>

            <div id="action-container" class="hidden bg-transparent group-hover:bg-gray-900 group-hover:bg-opacity-10 pointer-events-none group transition-bg-opacity duration-200">
                <button id="copy-button" class="absolute hidden lg:flex bottom-2 right-2 p-2 text-md text-white border-2 border-white opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-gray-800 rounded-lg pointer-events-auto items-center justify-center transition-opacity duration-200">
                    <i class="fa fa-copy" aria-hidden="true"></i>
                </button>

				<button id="favorite-button" class="absolute w-10 h-10 md:w-14 md:h-14 lg:w-10 lg:h-10 aspect-w-1 aspect-h-1 flex bottom-2 md:bottom-3 lg:bottom-2 left-2 md:left-3 lg:left-2 p-2 text-xl md:text-4xl lg:text-2xl text-white border-0 border-white opacity-100 rounded-lg pointer-events-auto items-center justify-center transition-opacity duration-200">

					<div class="flex flex-grow items-center justify-center text-center">
						<span class="flex items-center justify-center">
							<div class="bg-black bg-opacity-30 p-2 md:p-3 lg:p-2 rounded-full flex items-center justify-center">
								<i class="fa-regular fa-heart text-white" aria-hidden="true"></i>
							</div>
						</span>
						<i class="fa fa-spinner fa-spin hidden absolute mr-0 mt-0" aria-hidden="true"></i>
					</div>
				</button>

            </div>

            <div id="gen-menu-shield" class="rounded-lg bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full hidden" onclick="tappedGenMenuShield(event)"></div>
        
			<div class="selection-overlay absolute inset-0 cursor-pointer pointer-events-none">
				<div class="overlay-bg h-full w-full"></div>
				<i class="fa fa-circle checkbox hidden absolute top-1 right-1 md:top-2 lg:top-1 md:right-2 lg:right-1 cursor-pointer text-gray-800 text-4xl md:text-6xl lg:text-5xl"></i>
			</div>

        </div>
    </div>
    `;
}



function baseGenMenuHTML() {
    return `
    <div class="gen-comp-menu hidden relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
        <button type="button" class="absolute text-xl md:text-4xl lg:text-2xl text-white rounded-lg w-10 md:w-12 lg:w-10 h-10 md:h-12 lg:h-10 aspect-w-1 aspect-h-1 top-0 md:top-1 lg:top-0 right-0 md:right-1 lg:right-0 flex items-center p-4 md:p-8 lg:p-6 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:text-gray-200 transition-opacity duration-200" id="gen-menu-button" onClick="genMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
			<span class="flex items-start justify-end pr-2 pt-2">
				<div class="bg-black bg-opacity-30 p-2 w-full h-full rounded-full flex items-center justify-center">
					<i class="fa-solid fa-ellipsis-vertical shadow-2xl" aria-hidden="true"></i>
				</div>
			</span>
        </button>

		<div class="p-2 absolute right-2 md:right-4 z-10 mt-8 md:mt-16 lg:mt-10 origin-top-right">

			<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
			
				<a href="#" class="block px-3 py-1 md:py-2 lg:py-1 text-sm md:text-3xl lg:text-lg leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); useAsReferenceImagePressed(event)">Use as Reference</a>

				<a href="#" class="block px-3 py-1 md:py-2 lg:py-1 text-sm md:text-3xl lg:text-lg leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); copyPromptFromGenMenuPressed(event)">Copy Prompt</a>

				<a href="#" class="block px-3 py-1 md:py-2 lg:py-1 text-sm md:text-3xl lg:text-lg leading-6 text-red-600" :class="{ 'bg-gray-50': activeIndex === 2 }" role="menuitem" tabindex="-1" id="user-menu-item-2" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 2)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); deleteButtonPressed(event)">Delete</a>

			</div>
		</div>

    </div>
    `;
}


function dummyGridHTML() {

    return `
    <!-- 3 column wrapper -->
    <div class="mx-auto w-full h-full grow lg:flex">

        <div id="generate-form-container" class="h-full overflow-y-auto bg-gray-100 pb-4 pt-0 min-w-80 lg:w-[400px] max-w-full border-r border-gray-300 hidden lg:block">

        </div>

        <!-- Right column area -->
        <div class="flex-1 lg:flex h-full">
            <div class="bg-gray-100 px-0 py-0 lg:flex-1 h-full">
                <div class="bg-gray-100 h-full relative">

					<div id="gen-top-menu" class="hidden lg:flex opacity-0 transition-opacity duration-300 absolute bg-gray-100 p-2 z-20 w-full justify-between border-b border-gray-300">



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



						<button type="button" class="select-to-share-button min-w-20 ml-3 inline-flex justify-center items-center rounded-md px-3 py-2 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600 bg-gray-200 text-gray-500 hover:bg-gray-300" onclick="toggleImageSelectability()">Multi-Select</button>
					</div>

					<div class="selection-bar absolute bottom-0 w-full right-0 py-5 px-5 bg-gray-100 shadow-sm border-t border-gray-200 z-[35] hidden">
						<div class="float-right space-x-4 md:space-x-6 lg:space-x-4 flex">
							<button type="button" class="inline-flex items-center rounded-md px-3 md:px-6 lg:px-3 py-2 md:py-4 lg:py-2 text-sm md:text-3xl lg:text-sm shadow-sm bg-gray-200 text-gray-400 hover:bg-gray-300" onclick="toggleImageSelectability()">Cancel</button>
							
							<button type="button" class="ml-3 inline-flex items-center rounded-md px-3 md:px-6 lg:px-3 py-2 md:py-4 lg:py-2 text-sm md:text-3xl lg:text-sm shadow-sm text-white bg-gray-200" onclick="deleteSelectedPressed(event)" id="deleteSelectedButton">Delete</button>

							<button id="share-button" type="button" class="share-button ml-3 flex flex-grow justify-center items-center text-center rounded-md bg-gray-200 px-3 md:px-6 lg:px-3 py-2 md:py-4 lg:py-2 text-sm md:text-3xl lg:text-sm text-white shadow-sm">
								<p id="share-button-label" class="flex items-center">Share</p>
								<i class="fa fa-spinner fa-spin hidden" aria-hidden="true"></i>
							</button>
						</div>
					</div>

                    <div id="collection-grid-container" class="relative h-full mx-auto max-w-7xl px-1 lg:pt-[3.8rem] overflow-y-auto">
                        <div data-te-lightbox-init id="collection-grid" role="list" class="grid grid-cols-2 gap-x-1 gap-y-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" @click.away="clickedOutsideOfGenMenu()" onclick="clickedOnEmptyPartOfGrid()"></div>

                        <div id="grid-loader" class="absolute top-0 left-0 w-full h-full px-4 py-8 sm:px-6 lg:px-8">
                            <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                                <div class="mt-5">    
                                    <i class="fa fa-spinner fa-spin text-4xl md:text-6xl lg:text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
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


function generate_form_html() {
	let basicGenSettingsSection = basicGenerationSettingsHTML();
	let referenceFormSection = imageToImageFormSectionHTML();
	let openPoseFormSection = openPoseFormSectionHTML();
	let cannyFormSection = cannyFormSectionHTML();
	let depthFormSection = depthFormSectionHTML();
	return `
	<form class="generate-form overflow-y-auto flex flex-col px-0 py-0" id="generateForm">

		<div class="py-3 md:py-5 lg:py-3 pl-4 md:pl-6 lg:pl-4 border-b border-gray-300 lg:hidden">
			<p class="text-xl md:text-4xl font-bold">Generation Settings</p>
			<p class="text-xs md:text-lg text-gray-400 italic" id="secondary-gen-estimate-label">~$0.04 ($0.11 from cold boot)</p>
		</div>


		<div class="col-span-full px-0 py-3 md:py-5 lg:py-3 border-b border-gray-300">
			<div class="px-0 pb-0 grid grid-cols-6 gap-x-5 gap-y-0 sm:grid-cols-6">
				
				<div class="hidden col-span-2 flex items-center pl-4" id="mode-title-container">
					<label class="text-sm font-medium leading-6 text-gray-700">Base Model</label>
				</div>
				<div class="hidden col-span-4 pr-4" id="base-model-selector-container">
					<select id="base-model-selector" name="base-model" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
						<option selected id="sdxl" instkey="zxc" modelname="sdxl" model="stability-ai/sdxl" version="39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b">SDXL</option>
					</select>
				</div>
				<div id="lora-component-container" class="col-span-full pt-0">

					<div class="flex px-4 md:px-6 lg:px-4 pb-1 md:pb-2 lg:pb-1 text-sm md:text-2xl lg:text-sm">
						<label class="leading-6 text-gray-700 pb-1">Person Model:&nbsp;</label>
						<label id="selected-person-lora" class="leading-6 text-gray-900">None</label>
					</div>

					<div id="lora-person-grid" role="list" class="flex flex-row space-x-2 overflow-y-auto pb-4 px-4 md:px-6 lg:px-4">
				
						<div class="relative cursor-pointer select-none selected" id="no-lora-person-button" instkey="" model="" modelname="" version="" trainingSubject="" genderType="" bgColor="#374151" onclick="loraPersonPressed(event)">
							<div class="group w-32 h-32 md:w-56 md:h-56 lg:w-32 lg:h-32 block relative">
								<div class="aspect-[1/1] rounded-lg bg-white" style="background-color: rgb(55, 65, 81);">
									<div id="selected-check" class="absolute top-0 right-0 p-2">
										<i class="fas fa-check text-white md:text-2xl lg:text-base" aria-hidden="true"></i>
									</div>
									<div class="flex justify-left items-end h-full">
										<p class="text-base md:${md_font_size} lg:text-base ml-3 mb-2" style="color:white;">None</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="hidden col-span-2 pl-4 flex items-center" id="person-lora-influence-title-container">
					<label class="text-sm font-medium leading-6 text-gray-700">Influence, %</label>
				</div>
				<div class="hidden col-span-4 flex gap-x-2 px-4" id="person-lora-influence-slider-container">
					<input type="range" id="person-lora-influence-range" min="0" max="100" step="1" class="slider flex-grow">
					<input type="number" name="person-lora-influence" id="person-lora-influence" placeholder="90" min="0" max="100" value="90" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
				</div>

				<div class="col-span-full flex justify-between px-4 md:px-6 lg:px-4 mt-2" id="person-influence-setting-selector-container">
						
						<label for="person-influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Resemblance</label>
						<div class="hidden">
							<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
							<select id="person-influence-setting-dropdown-selector" onChange="personInfSettingDropdownSelectionMade(event)" class="block w-full rounded-md border-gray-300 focus:border-black focus:ring-black">
								<option selected="" inf-setting="${InfluenceSetting.LOW}">Low</option>
								<option inf-setting="${InfluenceSetting.MEDIUM}">Medium</option>
								<option inf-setting="${InfluenceSetting.HIGH}">High</option>
							</select>
						</div>
						<div class="block">
							<nav id="person-influence-setting-tabs-selector" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Person Influence Setting">
								<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->

								<a href="#" inf-setting="${InfluenceSetting.LOW}" onClick="event.preventDefault(); personInfSettingTabSelected('${InfluenceSetting.LOW}')" class="text-gray-500 hover:text-gray-700 rounded-l-lg group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10" aria-current="page">
									<span>Low</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.MEDIUM}" onClick="event.preventDefault(); personInfSettingTabSelected('${InfluenceSetting.MEDIUM}')" class="text-gray-900 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Medium</span>
									<span id="inf-line" aria-hidden="true" class="bg-black absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.HIGH}" onClick="event.preventDefault(); personInfSettingTabSelected('${InfluenceSetting.HIGH}')" class="text-gray-500 hover:text-gray-700 rounded-r-lg group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>High</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
							</nav>
						</div>
					</div>

			</div>
		</div>


		<div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-2 sm:grid-cols-6 py-3 md:py-5 lg:py-3">
			<div class="col-span-full px-4 md:px-6 lg:px-4" id="prompt-field-container">
				<div class="flex justify-between items-center">
					<label for="prompt" class="block text-sm md:text-2xl lg:text-sm leading-6 text-gray-700">Prompt</label>
				</div>
				<div class="mt-2">
					<div id="prompt" name="prompt" rows="3" class="max-w-full h-28 md:h-36 lg:h-28 overflow-y-auto bg-white whitespace-normal editable break-words outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6"></div>
				</div>
			</div>
			<div id="prompt-style-container" class="col-span-full pt-1">
				<div class="flex px-4 md:px-6 lg:px-4 pb-1 text-sm md:text-2xl lg:text-sm">
					<label class="leading-6 text-gray-700 pb-1">Style:&nbsp;</label>
					<label id="selected-prompt-style-label" class="leading-6 text-gray-900">Comic</label>
				</div>

				<div id="prompt-style-grid" role="list" class="flex flex-row space-x-2 overflow-y-auto pb-0 px-4 md:px-6 lg:px-4">
			
					<div prompt-style="${PromptStyle.NONE}" class="relative cursor-pointer select-none" id="no-prompt-style-button" bgColor="#374151" onclick="promptStylePressed(event)">
						<div class="group w-32 h-32 md:w-56 md:h-56 lg:w-32 lg:h-32 block relative">
							<div class="aspect-[1/1] rounded-lg bg-white">
								<div id="selected-check" class="hidden absolute top-0 right-0 p-2">
									<i class="fas fa-check text-white md:text-2xl lg:text-base" aria-hidden="true"></i>
								</div>
								<div class="flex justify-left items-end h-full">
									<p class="text-base md:${md_font_size} lg:text-base ml-3 mb-2" style="color: rgb(55, 65, 81);">None</p>
								</div>
							</div>
						</div>
					</div>

					<div prompt-style="${PromptStyle.CELL_SHADING}" class="relative cursor-pointer select-none selected" id="cell-shading-style-button" bgColor="#000" onclick="promptStylePressed(event)">
						<div class="group w-32 h-32 md:w-56 md:h-56 lg:w-32 lg:h-32 block relative">
							<div class="aspect-[1/1] rounded-lg bg-white" style="background-color: rgb(0, 0, 0);">
								<img src="https://storage.googleapis.com/sketchmeai-public/Prompt_Styles/cell-shading-320.png" alt="Description" class="absolute inset-0 object-cover w-full h-full rounded-lg opacity-60">
								<div id="selected-check" class="absolute top-0 right-0 p-2">
									<i class="fas fa-check text-white md:text-2xl lg:text-base" aria-hidden="true"></i>
								</div>
								<div class="flex justify-left items-end h-full">
									<p class="text-base md:${md_font_size} lg:text-base ml-3 mb-2 z-10" style="color:white;">Comic</p>
								</div>
							</div>
						</div>
					</div>

					<div prompt-style="${PromptStyle.PIXEL_ART}" class="relative cursor-pointer select-none" id="pixel-art-style-button" bgColor="#000" onclick="promptStylePressed(event)">
						<div class="group w-32 h-32 md:w-56 md:h-56 lg:w-32 lg:h-32 block relative">
							<div class="aspect-[1/1] rounded-lg bg-white">
								<img src="https://storage.googleapis.com/sketchmeai-public/Prompt_Styles/pixel-art-320.png" alt="Description" class="absolute inset-0 object-cover w-full h-full rounded-lg opacity-60">
								<div id="selected-check" class="absolute top-0 right-0 p-2 hidden">
									<i class="fas fa-check text-white md:text-2xl lg:text-base" aria-hidden="true"></i>
								</div>
								<div class="flex justify-left items-end h-full">
									<p class="text-base md:${md_font_size} lg:text-base ml-3 mb-2 z-10" style="color: rgb(0, 0, 0);">Pixel-Art</p>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="col-span-full flex-col px-4 md:px-6 lg:px-4 pb-2 pt-3 justify-center hidden lg:flex border-t border-gray-300" id="gen-button-container">
			<button id="gen-button" class="cursor-pointer rounded-md flex flex-grow justify-center items-center text-center bg-black px-3.5 md:px-7 lg:px-3.5 py-2.5 md:py-5 lg:py-2.5 text-lg md:text-3xl lg:text-lg text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onclick="generateButtonPressed(event)">
				<i id="mobile-gen-icon" class="fa-solid fa-bolt-lightning" aria-hidden="true"></i>
				<p id="desktop-gen-button-label" class="ml-2 md:ml-4">Generate</p>
			</button>
			<p class="text-xs md:text-2xl lg:text-xs text-gray-400 italic mt-1 ml-1" id="generation-estimate-label">~$0.04 ($0.11 from cold boot)</p>
		</div>


		${basicGenSettingsSection}

		${referenceFormSection}

		${openPoseFormSection}

		${cannyFormSection}

		${depthFormSection}

		<div class="flex-grow"></div>
	</form>
	`;
}

function new_model_option(model) {
	// console.log('the mode's for a new model option: ', model);
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

function new_lora_model_option(model, bg_color) {
	let model_id = model.rec_id;
	let replicate_name = model.replicate_name;
	let instKey = model.token_string ? model.token_string : "zxc";
	let long_version = model.version;
	let short_version = long_version.includes(':') ? long_version.split(':')[1] : long_version;
	let model_name = model.name;
	let gender_type = model.gender_type;
	var training_subject = model.training_subject ? model.training_subject : "person";
	return `
	<div class="relative cursor-pointer select-none" id="${model_id}" instkey="${instKey}" model="${replicate_name}" version="${short_version}" modelName="${model_name}" trainingSubject="${training_subject}" genderType="${gender_type}" bgColor="${bg_color}" onclick="loraPersonPressed(event)">
		<div class="group w-32 h-32 md:w-56 md:h-56 lg:w-32 lg:h-32 block relative">
			<div class="aspect-[1/1] rounded-lg bg-white">
				<div id="selected-check" class="hidden absolute top-0 right-0 p-2">
					<i class="fas fa-check text-white md:text-2xl lg:text-base" aria-hidden="true"></i>
				</div>
				<div class="flex justify-left items-end h-full">
					<p class="text-base md:${md_font_size} lg:text-base ml-3 mb-2" style="color:${bg_color};">${model_name}</p>
				</div>
			</div>
		</div>
	</div>
	`;
}

function bottom_generation_menu_html() {
	return `
	<div id="mobile-bottom-menu" class="hidden lg:hidden fixed right-0 bottom-0 m-4 z-30 flex gap-4 items-end bg-opacity-50">
		

		<div class="flex flex-col gap-4">

			<div class="flex justify-end space-x-4">
			
				<button id="gen-settings-bottom-button" class="bg-gray-100 text-black text-xl md:text-4xl shadow-lg rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center justify-center" x-on:click="open = !open; showGenerationSettingsMobileButtonPressed()">
					<i class="fa-solid fa-gear" aria-hidden="true"></i>
				</button>

				<div id="mobile-bottom-action-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
					<button type="button" class="bg-gray-700 text-white text-lg md:text-4xl shadow-lg rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center justify-center" id="mobile-bottom-action-menu-button" onClick="mobileGenMoreMenuShowing()" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
						<i class="fa-solid fa-caret-up" aria-hidden="true"></i>
					</button>

					<div class="p-2 absolute right-0 bottom-0 z-10 mb-12 md:mb-24 mr-4 md:mr-6 min-w-36 w-max">

						<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md overflow-hidden bg-white py-0 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
						
							<div id="collection-name-label-container" class="block pl-3 md:pl-6 pr-8 md:pr-10 py-2 md:py-6 text-sm md:${md_font_size} leading-6 bg-gray-100 text-gray-700 border-gray-200 border-b">
								<p class="text-xs md:text-2xl text-gray-500">Collection</p>
								<p id="collection-name-label">Default</p>
							</div>

							<a href="#" class="block pl-3 md:pl-6 pr-8 md:pr-10 py-2 md:py-6 text-sm md:${md_font_size} leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); newCollectionPressed(event)">New Collection</a>

							<a href="#" class="block pl-3 md:pl-6 pr-8 md:pr-10 py-2 md:py-6 text-sm md:${md_font_size} leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); changeCollectionPressed(event)">Change Collection</a>

							<a href="#" class="block pl-3 md:pl-6 pr-8 md:pr-10 py-2 md:py-6 text-sm md:${md_font_size} leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 2 }" role="menuitem" tabindex="-1" id="user-menu-item-2" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 2)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); renameCollectionPressed(event)">Rename Collection</a>

							<a href="#" class="block pl-3 md:pl-6 pr-8 md:pr-10 py-2 md:py-6 text-sm md:${md_font_size} leading-6 text-gray-700 border-gray-200 border-b" :class="{ 'bg-gray-50': activeIndex === 3 }" role="menuitem" tabindex="-1" id="user-menu-item-3" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 3)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); multiSelectPressed(event)">Multi-Select</a>

						</div>
					</div>
				</div>

			</div>


			<button id="generate-bottom-button" class="bg-black px-6 md:px-10 text-white text-lg md:text-3xl shadow-lg rounded-full h-12 md:h-24 flex items-center justify-center" onclick="generateButtonPressed(event)">
				<i id="mobile-gen-icon" class="fa-solid fa-bolt-lightning" aria-hidden="true"></i>
				<p class="ml-2 md:ml-4">Generate</p>
			</button>
		</div>
	</div>
	`;
}

function imageReferenceModeSelectionModalHTML(modal_title, imgSrc) {
	return `
	<div id="img-ref-mode-selection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl md:max-w-3xl lg:max-w-2xl mx-auto bg-white p-7 md:p-9 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 md:top-6 lg:top-3 right-3 md:right-6 lg:right-3 text-3xl md:text-4xl lg:text-3xl text-gray-500 hover:text-gray-700" onclick="dismissImageRefModeSelectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-4">
				<h2 class="text-2xl md:text-4xl lg:text-3xl text-gray-900 mb-2 md:mb-3 lg:mb-2">${modal_title}</h2>
			</div>

			<div class="relative flex flex-col justify-center items-center gap-y-2">
				<button class="w-9/12 bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow" onclick="userSelectedImgRefMode('${RefImageMode.IMG2IMG}','${imgSrc}')">Image-to-Image</button>
				<button class="w-9/12 bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow" onclick="userSelectedImgRefMode('${RefImageMode.OPENPOSE}','${imgSrc}')">OpenPose</button>
				<button class="w-9/12 bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow" onclick="userSelectedImgRefMode('${RefImageMode.CANNY}','${imgSrc}')">Canny</button>
				<button class="w-9/12 bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow" onclick="userSelectedImgRefMode('${RefImageMode.DEPTH}','${imgSrc}')">Depth</button>
				<button class="w-9/12 bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow" onclick="userSelectedImgRefMode('ALL','${imgSrc}')">All</button>
			</div>

		</div>
	</div>
	`;
}

function newCollectionModalHTML() {
	return `
	<div id="new-collection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl md:max-w-3xl lg:max-w-2xl mx-auto bg-white p-7 md:p-9 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 md:top-6 lg:top-3 right-3 md:right-6 lg:right-3 text-3xl md:text-4xl lg:text-3xl text-gray-500 hover:text-gray-700" onclick="dismissNewCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-4">
				<h2 class="text-3xl md:text-4xl lg:text-3xl text-gray-900 mb-2 md:mb-3 lg:mb-2">New Collection</h2>
			</div>

			<div class="mb-1">
				<label for="new-collection-name" class="block text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-900">Collection Name</label>
				<div class="relative flex">
					
					<input type="text" name="new-collection-name" id="new-collection-name" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg: py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-3xl lg:text-sm leading-6" autocomplete="off">
					<button id="create-new-collection-button" class="flex flex-grow justify-center items-center text-center bg-black text-white md:text-3xl lg:text-base px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToCreateNewCollection()">
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
		<div class="max-w-2xl md:max-w-3xl mx-auto bg-white p-7 md:p-9 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 md:top-6 right-3 md:right-6 text-3xl md:text-4xl text-gray-500 hover:text-gray-700" onclick="dismissChangeCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl md:text-4xl text-gray-900 mb-4 md:py-3">Change Collection</h2>
			</div>

			<div class="mb-0">
				<label id="change-collection-label" class="block text-sm md:text-2xl mb-1 font-medium leading-6 text-gray-400">from</label>
				<div class="relative flex">
					
					<select id="collection-list" class="block w-full rounded-md border-0 py-1.5 md:py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-3xl leading-6">
						
					</select>

					<button id="change-collection" class="bg-black text-white md:text-3xl px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToChangeCollection()">Change</button>
				</div>
			</div>

		</div>
	</div>
	`;
}

function renameCollectionModalHTML() {
	return `
	<div id="rename-collection-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl md:max-w-3xl mx-auto bg-white p-7 md:p-9 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 md:top-6 right-3 md:right-6 text-3xl md:text-4xl text-gray-500 hover:text-gray-700" onclick="dismissRenameCollectionModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl md:text-4xl text-gray-900 mb-4 md:py-3">Rename Collection</h2>
			</div>

			<div class="mb-0">
				<label id="rename-collection-name-label" class="block text-sm md:text-2xl font-medium leading-6 text-gray-400">for</label>
				<div class="relative flex">
					
					<input type="text" name="rename-collection-name" id="rename-collection-name" class="block w-full rounded-md border-0 py-1.5 md:py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-3xl leading-6" autocomplete="off">

					<button id="rename-new-collection-button" class="flex flex-grow justify-center items-center text-center bg-black text-white md:text-3xl px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToRenameCollection()">
						<p id="rename-button-label" class="flex items-center">Rename</p>
						<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
					</button>

				</div>
			</div>
		</div>
	</div>
	`;
}

function enterRefImageUrlModalHTML(refImgMode) {
	return `
	<div id="enter-ref-img-url-modal" class="absolute bg-black bg-opacity-90 h-full w-full z-[81] px-4 flex flex-col justify-center transition duration-500 opacity-0">
		<div class="max-w-2xl md:max-w-3xl  mx-auto bg-white p-7 md:p-9 rounded-lg shadow-lg w-full relative">
			<button class="absolute top-3 md:top-6 right-3 md:right-6 text-3xl md:text-4xl text-gray-500 hover:text-gray-700" onclick="dismissEnterRefImgUrlModal()">
				<i class="fas fa-times" aria-hidden="true"></i>
			</button>
			<div class="mb-0">
				<h2 class="text-3xl md:text-4xl text-gray-900 mb-4 md:py-3">Reference Image Url</h2>
			</div>

			<div class="mb-0">
				<div class="relative flex">
					
					<input type="text" name="ref-img-url" id="ref-img-url" mode="${refImgMode}" class="block w-full rounded-md border-0 py-1.5 md:py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-3xl leading-6" autocomplete="off">

					<button id="ref-img-url-button" class="flex flex-grow justify-center items-center text-center bg-black text-white md:text-3xl px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToEnterRefImgUrl()">
						<p id="rename-button-label" class="flex items-center">Enter</p>
						<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
					</button>

				</div>
			</div>
		</div>
	</div>
	`;
}

function imageToImageFormSectionHTML() {
	return `
	<div class="col-span-full px-4 md:px-6 lg:px-4 border-t border-gray-300">
		<!-- Start of the new nested accordion for reference image fields -->
		<div id="nestedAccordion">

			<h2 id="nestedHeading" class="flex items-center justify-between py-2 md:py-4 lg:py-2">
				<div class="flex">
					<button id="i2i-section-button" class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 pr-4 text-right text-sm md:text-2xl lg:text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedImg2ImgCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed>

						<span class="mr-2 mt-0 h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
							</svg>
						</span>

						Image-to-Image

					</button>
					<button id="i2i-mode-info-button" onclick="event.preventDefault();event.stopPropagation()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Image to Image" data-te-content="${imgToImgInfo}" class="ml-2 pt-0 text-gray-300">
						<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
					</button>
				</div>

				<div class="flex gap-2">
					<button id="clear-ref-button" mode="${RefImageMode.IMG2IMG}" title="Clear reference image" onclick="clearRefImgElement(event)" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center">
						<i class="fa-solid fa-trash text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
					</button>
					
					<div id="edit-ref-comp-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">

						<button type="button" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center" id="gen-ref-menu-button" onclick="genRefMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
							<i class="fa-solid fa-pen text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
						</button>
				
						<div class="m-0 absolute right-0 z-10 mt-1 origin-top-right min-w-[15rem]">
				
							<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
							
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); showRefImageUrlModal(event,'${RefImageMode.IMG2IMG}')">Enter Image URL</a>
				
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); startRefUploadExperience(event)">Upload Image</a>
				
							</div>
						</div>
					</div>
				</div>
			</h2>

			<div id="nestedImg2ImgCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">
				<div class="accordion-body px-0 pb-4 grid grid-cols-6 gap-x-5 gap-y-5 sm:grid-cols-6">

					<div class="col-span-full" id="igm2img-field-container">
						<div id="ref-img-div-container" class="flex flex-col items-center justify-center pt-1 pb-2">

							<div class="w-[8em] md:w-[16em] lg:w-[8em]">
								<button id="i2i-img-button" mode="${RefImageMode.IMG2IMG}" class="relative flex flex-col items-center justify-center block h-[8em] md:h-[16em] lg:h-[8em] rounded-lg border-2 md:border-4 lg:border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
									
									<img class="hidden absolute w-full h-full rounded-lg object-cover" src="">

									<div class="hidden absolute bg-gray-200 h-full w-full" id="upload-spinner">
										<div class="flex flex-col h-full items-center justify-center">		
											<p class="text-xs text-gray-500 break-words mb-2">Processing<br>Images</p>
											<i id="upload-spinner" class="text-gray-500 fa fa-spinner fa-spin" aria-hidden="true"></i>
										</div>
									</div>

									<div class="flex flex-col items-center">		
										<i id="upload-icon" class="fa text-3xl md:text-6xl lg:text-3xl fa-images" aria-hidden="true"></i>
										
									</div>
								</button>
								<input id="localRefImgUploadInput" type="file" style="display:none;" multiple="">
								<button class="text-gray-400 text-sm py-1 text-left" onClick="event.preventDefault(); copyToOtherReferenceMode('${RefImageMode.IMG2IMG}')">Copy to...</button>
							</div>
							
						</div>
						
						<div class="mt-0">
							<input type="text" id="${RefImgUrlInputId.IMG2IMG}" class="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
						</div>
					</div>


					<div class="hidden col-span-2 flex items-center" id="influence-title-container">
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence, %</label>
					</div>

					<div class="hidden col-span-4 flex gap-x-2" id="influence-slider-container">
						<input type="range" id="ref-influence-range" name="ref-influence-range" min="0" max="100" class="slider flex-grow" autocompleted="">
						<input type="number" name="prompt-str" id="prompt-str" placeholder="${Img2ImgSettingValue.LOW}" min="0" max="100" value="${Img2ImgSettingValue.LOW}" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
					</div>


					<div class="col-span-full flex justify-between" id="influence-setting-selector-container">
						
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence</label>
						
						<div class="block">
							<nav id="i2i-influence-setting-tabs-selector" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Influence Setting">
								<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->

								<a href="#" inf-setting="${InfluenceSetting.LOW}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.LOW}','${RefImageMode.IMG2IMG}')" class="text-gray-900 rounded-l-lg group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10" aria-current="page">
									<span>Low</span>
									<span id="inf-line" aria-hidden="true" class="bg-black absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.MEDIUM}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.MEDIUM}','${RefImageMode.IMG2IMG}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Medium</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.HIGH}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.HIGH}','${RefImageMode.IMG2IMG}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>High</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.FULL}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.FULL}','${RefImageMode.IMG2IMG}')" class="text-gray-500 rounded-r-lg hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Full</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
							</nav>
						</div>
					</div>


				</div>

			</div>

		</div>
	</div>
	`;
}

function openPoseFormSectionHTML() {
	return `
	<div class="col-span-full px-4 md:px-6 lg:px-4 border-t border-gray-300">
		<div id="nestedAccordion">

			<h2 id="nestedHeading" class="flex items-center justify-between py-2 md:py-4 lg:py-2">
				<div class="flex">
					<button id="openpose-section-button" class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 pr-4 text-right text-sm md:text-2xl lg:text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedOpenposeCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed>

						<span class="mr-2 mt-0 h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
							</svg>
						</span>

						OpenPose ControlNet

					</button>
					<button id="openpose-mode-info-button" onclick="event.preventDefault();event.stopPropagation()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Open Pose, ControlNet" data-te-content="${openPoseControlNetInfo}" class="ml-2 pt-0 text-gray-300">
						<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
					</button>
				</div>

				<div class="flex gap-2">
					<button id="clear-ref-button" mode="${RefImageMode.OPENPOSE}" title="Clear open pose image" onclick="clearRefImgElement(event)" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center">
						<i class="fa-solid fa-trash text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
					</button>
					
					<div id="edit-ref-comp-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">

						<button type="button" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center" id="gen-ref-menu-button" onclick="genRefMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
							<i class="fa-solid fa-pen text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
						</button>
				
						<div class="m-0 absolute right-0 z-10 mt-1 origin-top-right min-w-[15rem]">
				
							<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" tabindex="-1" style="display: none;">
							
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); showRefImageUrlModal(event,'${RefImageMode.OPENPOSE}')">Enter Image URL</a>
				
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); startRefUploadExperience(event)">Upload Image</a>
				
							</div>
						</div>
					</div>
				</div>
			</h2>

			<div id="nestedOpenposeCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">
				<div class="accordion-body px-0 pb-4 grid grid-cols-6 gap-x-5 gap-y-5 sm:grid-cols-6">

					<div class="col-span-full" id="igm2img-field-container">
						<div id="ref-img-div-container" class="flex flex-col items-center justify-center pt-1 pb-2">

							<div class="w-[8em] md:w-[16em] lg:w-[8em]">
								<button id="openpose-img-button" mode="${RefImageMode.OPENPOSE}" class="relative flex flex-col items-center justify-center block h-[8em] md:h-[16em] lg:h-[8em] rounded-lg border-2 md:border-4 lg:border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
									
									<img class="hidden absolute w-full h-full rounded-lg object-cover" src="">

									<div class="hidden absolute bg-gray-200 h-full w-full" id="upload-spinner">
										<div class="flex flex-col h-full items-center justify-center">		
											<p class="text-xs text-gray-500 break-words mb-2">Processing<br>Images</p>
											<i id="upload-spinner" class="text-gray-500 fa fa-spinner fa-spin" aria-hidden="true"></i>
										</div>
									</div>

									<div class="flex flex-col items-center">		
										<i id="upload-icon" class="fa text-3xl md:text-6xl lg:text-3xl fa-images" aria-hidden="true"></i>
										
									</div>
								</button>
								<button class="text-gray-400 text-sm py-1 text-left" onClick="event.preventDefault(); copyToOtherReferenceMode('${RefImageMode.OPENPOSE}')">Copy to...</button>
							</div>
							<input id="localRefImgUploadInput" type="file" style="display:none;" multiple="">
						</div>
						
						<div class="mt-0">
							<input type="text" id="${RefImgUrlInputId.OPENPOSE}" class="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
						</div>
					</div>


					<div class="hidden col-span-2 flex items-center" id="influence-title-container">
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence, %</label>
					</div>

					<div class="hidden col-span-4 flex gap-x-2" id="influence-slider-container">
						<input type="range" id="openpose-scale-range" name="openpose-scale-range" min="0" max="100" class="slider flex-grow" autocompleted="">
						<input type="number" id="openpose-cnet-scale" placeholder="${OpenPoseSettingValue.FULL}" min="0" max="100" value="${OpenPoseSettingValue.FULL}" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
					</div>


					<div class="col-span-full flex justify-between" id="influence-setting-selector-container">
						
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence</label>
						
						<div class="block">
							<nav id="openpose-influence-setting-tabs-selector" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Influence Setting">
								<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->

								<a href="#" inf-setting="${InfluenceSetting.LOW}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.LOW}','${RefImageMode.OPENPOSE}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Low</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.MEDIUM}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.MEDIUM}','${RefImageMode.OPENPOSE}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Medium</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.HIGH}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.HIGH}','${RefImageMode.OPENPOSE}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>High</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.FULL}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.FULL}','${RefImageMode.OPENPOSE}')" class="text-gray-500 rounded-r-lg hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10" aria-current="page">
									<span>Full</span>
									<span id="inf-line" aria-hidden="true" class="bg-black absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
							</nav>
						</div>
					</div>


				</div>

			</div>

		</div>
	</div>
	`;
}

function cannyFormSectionHTML() {
	return `
	<div class="col-span-full px-4 md:px-6 lg:px-4 border-t border-gray-300">
		<div id="nestedAccordion">

			<h2 id="nestedHeading" class="flex items-center justify-between py-2 md:py-4 lg:py-2">
				<div class="flex">
					<button id="canny-section-button" class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 pr-4 text-right text-sm md:text-2xl lg:text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedCannyCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed>

						<span class="mr-2 mt-0 h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
							</svg>
						</span>

						Canny ControlNet

					</button>
					<button id="canny-mode-info-button" onclick="event.preventDefault();event.stopPropagation()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Canny, ControlNet" data-te-content="${cannyControlNetInfo}" class="ml-2 pt-0 text-gray-300">
						<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
					</button>
				</div>

				<div class="flex gap-2">
					<button id="clear-ref-button" mode="${RefImageMode.CANNY}" title="Clear open pose image" onclick="clearRefImgElement(event)" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center">
						<i class="fa-solid fa-trash text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
					</button>
					
					<div id="edit-ref-comp-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">

						<button type="button" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center" id="gen-ref-menu-button" onclick="genRefMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
							<i class="fa-solid fa-pen text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
						</button>
				
						<div class="m-0 absolute right-0 z-10 mt-1 origin-top-right min-w-[15rem]">
				
							<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" tabindex="-1" style="display: none;">
							
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); showRefImageUrlModal(event,'${RefImageMode.CANNY}')">Enter Image URL</a>
				
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); startRefUploadExperience(event)">Upload Image</a>
				
							</div>
						</div>
					</div>
				</div>
			</h2>

			<div id="nestedCannyCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">
				<div class="accordion-body px-0 pb-4 grid grid-cols-6 gap-x-5 gap-y-5 sm:grid-cols-6">

					<div class="col-span-full" id="igm2img-field-container">
						<div id="ref-img-div-container" class="flex flex-col items-center justify-center pt-1 pb-2">

							<div class="w-[8em] md:w-[16em] lg:w-[8em]">
								<button id="canny-img-button" mode="${RefImageMode.CANNY}" class="relative flex flex-col items-center justify-center block h-[8em] md:h-[16em] lg:h-[8em] rounded-lg border-2 md:border-4 lg:border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">

									<img class="hidden absolute w-full h-full rounded-lg object-cover" src="">

									<div class="hidden absolute bg-gray-200 h-full w-full" id="upload-spinner">
										<div class="flex flex-col h-full items-center justify-center">		
											<p class="text-xs text-gray-500 break-words mb-2">Processing<br>Images</p>
											<i id="upload-spinner" class="text-gray-500 fa fa-spinner fa-spin" aria-hidden="true"></i>
										</div>
									</div>

									<div class="flex flex-col items-center">		
										<i id="upload-icon" class="fa text-3xl md:text-6xl lg:text-3xl fa-images" aria-hidden="true"></i>
										
									</div>
								</button>
								<button class="text-gray-400 text-base py-1 text-left" onClick="event.preventDefault(); copyToOtherReferenceMode('${RefImageMode.CANNY}')">Copy to...</button>
							</div>
							<input id="localRefImgUploadInput" type="file" style="display:none;" multiple="">
						</div>
						
						<div class="mt-0">
							<input type="text" id="${RefImgUrlInputId.CANNY}" class="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
						</div>
					</div>


					<div class="hidden col-span-2 flex items-center" id="influence-title-container">
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence, %</label>
					</div>

					<div class="hidden col-span-4 flex gap-x-2" id="influence-slider-container">
						<input type="range" id="canny-scale-range" name="canny-scale-range" min="0" max="100" class="slider flex-grow" autocompleted="">
						<input type="number" name="canny-cnet-scale" id="canny-cnet-scale" placeholder="${CannySettingValue.LOW}" min="0" max="100" value="${CannySettingValue.LOW}" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
					</div>


					<div class="col-span-full flex justify-between" id="influence-setting-selector-container">
						
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence</label>
						
						<div class="block">
							<nav id="canny-influence-setting-tabs-selector" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Influence Setting">
								<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->

								<a href="#" inf-setting="${InfluenceSetting.LOW}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.LOW}','${RefImageMode.CANNY}')" class="text-gray-900 rounded-l-lg group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10" aria-current="page">
									<span>Low</span>
									<span id="inf-line" aria-hidden="true" class="bg-black absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.MEDIUM}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.MEDIUM}','${RefImageMode.CANNY}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Medium</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.HIGH}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.HIGH}','${RefImageMode.CANNY}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>High</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.FULL}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.FULL}','${RefImageMode.CANNY}')" class="text-gray-500 rounded-r-lg hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Full</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
							</nav>
						</div>
					</div>

					<div class="col-span-3" id="canny-start-field-container">
						<label class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Guidance Start</label>
						<button onclick="event.preventDefault()" data-te-trigger="hover" data-te-toggle="popover" data-te-title="Guidance Start" data-te-content="Determines what point in the generation the AI will use this control net as guidance. A zero means this control net will be used from the very start of the generation. A 25 means it will be used at the generation step equal to # of denoising steps * 0.25" class="ml-2 text-gray-300">
							<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
						</button>
						<div class="mt-2">
							<input type="number" name="canny-guidance-start" id="canny-guidance-start" placeholder="0" min="0.0" max="1.0" step="0.1" value="0" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
							<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">0.0 - 1.0</p>
						</div>
					</div>

					<div class="col-span-3" id="canny-end-field-container">
						<label class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Guidance End</label>
						<button onclick="event.preventDefault()" data-te-trigger="hover" data-te-toggle="popover" data-te-title="Guidance End" data-te-content="Determines what point in the generation the AI will stop using this control net as guidance. A one means this control net will be used from till the very end of the generation. A 75 means it will be used at the generation step equal to # of denoising steps * 0.75" class="ml-2 text-gray-300">
							<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
						</button>
						<div class="mt-2">
							<input type="number" name="canny-guidance-end" id="canny-guidance-end" placeholder="1" min="0.1" max="1.0" step="0.1" value="1" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
							<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">0.1 - 1.0</p>
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
	`;
}


function depthFormSectionHTML() {
	return `
	<div class="col-span-full px-4 md:px-6 lg:px-4 border-y border-gray-300 mb-5 md:mb-10 lg:mb-5">
		<div id="nestedAccordion">

			<h2 id="nestedHeading" class="flex items-center justify-between py-2 md:py-4 lg:py-2">
				<div class="flex">
					<button id="depth-section-button" class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 pr-4 text-right text-sm md:text-2xl lg:text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedDepthCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed>

						<span class="mr-2 mt-0 h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
							</svg>
						</span>

						Depth ControlNet

					</button>
					<button id="depth-mode-info-button" onclick="event.preventDefault();event.stopPropagation()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Depth, ControlNet" data-te-content="${depthControlNetInfo}" class="ml-2 pt-0 text-gray-300">
						<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
					</button>
				</div>

				<div class="flex gap-2">
					<button id="clear-ref-button" mode="${RefImageMode.DEPTH}" title="Clear open pose image" onclick="clearRefImgElement(event)" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center">
						<i class="fa-solid fa-trash text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
					</button>
					
					<div id="edit-ref-comp-menu" class="relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">

						<button type="button" class="w-7 h-7 md:w-14 md:h-14 lg:w-7 lg:h-7 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center" id="gen-ref-menu-button" onclick="genRefMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
							<i class="fa-solid fa-pen text-gray-500 text-xs md:text-2xl lg:text-xs" aria-hidden="true"></i>
						</button>
				
						<div class="m-0 absolute right-0 z-10 mt-1 origin-top-right min-w-[15rem]">
				
							<div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" tabindex="-1" style="display: none;">
							
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); showRefImageUrlModal(event,'${RefImageMode.DEPTH}')">Enter Image URL</a>
				
								<a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-700" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); startRefUploadExperience(event)">Upload Image</a>
				
							</div>
						</div>
					</div>
				</div>
			</h2>

			<div id="nestedDepthCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">
				<div class="accordion-body px-0 pb-4 grid grid-cols-6 gap-x-5 gap-y-5 sm:grid-cols-6">

					<div class="col-span-full" id="igm2img-field-container">
						<div id="ref-img-div-container" class="flex flex-col items-center justify-center pt-1 pb-2">

							<div class="w-[8em] md:w-[16em] lg:w-[8em]">
								<button id="depth-img-button" mode="${RefImageMode.DEPTH}" class="relative flex flex-col items-center justify-center block h-[8em] md:h-[16em] lg:h-[8em] rounded-lg border-2 md:border-4 lg:border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">

									<img class="hidden absolute w-full h-full rounded-lg object-cover" src="">

									<div class="hidden absolute bg-gray-200 h-full w-full" id="upload-spinner">
										<div class="flex flex-col h-full items-center justify-center">		
											<p class="text-xs text-gray-500 break-words mb-2">Processing<br>Images</p>
											<i id="upload-spinner" class="text-gray-500 fa fa-spinner fa-spin" aria-hidden="true"></i>
										</div>
									</div>

									<div class="flex flex-col items-center">		
										<i id="upload-icon" class="fa text-3xl md:text-6xl lg:text-3xl fa-images" aria-hidden="true"></i>
										
									</div>
								</button>
								<button class="text-gray-400 text-sm py-1 text-left" onClick="event.preventDefault(); event.stopPropagation(); copyToOtherReferenceMode('${RefImageMode.DEPTH}')">Copy to...</button>
							</div>
							<input id="localRefImgUploadInput" type="file" style="display:none;" multiple="">
						</div>
						
						<div class="mt-0">
							<input type="text" id="${RefImgUrlInputId.DEPTH}" class="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
						</div>
					</div>


					<div class="hidden col-span-2 flex items-center" id="influence-title-container">
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence, %</label>
					</div>

					<div class="hidden col-span-4 flex gap-x-2" id="influence-slider-container">
						<input type="range" id="depth-scale-range" name="depth-scale-range" min="0" max="100" class="slider flex-grow" autocompleted="">
						<input type="number" name="depth-cnet-scale" id="depth-cnet-scale" placeholder="${DepthSettingValue.LOW}" min="0" max="100" value="${DepthSettingValue.LOW}" class="block max-w-[4rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
					</div>


					<div class="col-span-full flex justify-between" id="influence-setting-selector-container">
						
						<label for="influence" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Influence</label>
						
						<div class="block">
							<nav id="depth-influence-setting-tabs-selector" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Influence Setting">
								<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->

								<a href="#" inf-setting="${InfluenceSetting.LOW}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.LOW}','${RefImageMode.DEPTH}')" class="text-gray-900 rounded-l-lg group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10" aria-current="page">
									<span>Low</span>
									<span id="inf-line" aria-hidden="true" class="bg-black absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.MEDIUM}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.MEDIUM}','${RefImageMode.DEPTH}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Medium</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.HIGH}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.HIGH}','${RefImageMode.DEPTH}')" class="text-gray-500 hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>High</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
								<a href="#" inf-setting="${InfluenceSetting.FULL}" onClick="event.preventDefault(); infSettingTabSelected('${InfluenceSetting.FULL}','${RefImageMode.DEPTH}')" class="text-gray-500 rounded-r-lg hover:text-gray-700 group relative flex-grow overflow-hidden bg-white py-4 md:py-6 lg:py-4 px-4 md:px-6 lg:px-4 text-center text-sm md:text-2xl lg:text-sm font-medium hover:bg-gray-50 focus:z-10">
									<span>Full</span>
									<span id="inf-line" aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
								</a>
							</nav>
						</div>
					</div>

					<div class="col-span-3" id="depth-start-field-container">
						<label class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Guidance Start</label>
						<button onclick="event.preventDefault()" data-te-trigger="hover" data-te-toggle="popover" data-te-title="Guidance Start" data-te-content="Determines what point in the generation the AI will use this control net as guidance. A zero means this control net will be used from the very start of the generation. A 25 means it will be used at the generation step equal to # of denoising steps * 0.25" class="ml-2 text-gray-300">
							<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
						</button>
						<div class="mt-2">
							<input type="number" name="depth-guidance-start" id="depth-guidance-start" placeholder="0" min="0.0" max="1.0" step="0.1" value="0" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
							<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">0.0 - 1.0</p>
						</div>
					</div>

					<div class="col-span-3" id="depth-end-field-container">
						<label class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Guidance End</label>
						<button onclick="event.preventDefault()" data-te-trigger="hover" data-te-toggle="popover" data-te-title="Guidance End" data-te-content="Determines what point in the generation the AI will stop using this control net as guidance. A one means this control net will be used from till the very end of the generation. A 75 means it will be used at the generation step equal to # of denoising steps * 0.75" class="ml-2 text-gray-300">
							<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
						</button>
						<div class="mt-2">
							<input type="number" name="depth-guidance-end" id="depth-guidance-end" placeholder="1" min="0.1" max="1.0" step="0.1" value="1" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
							<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">0.0 - 1.0</p>
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
	`;
}


function basicGenerationSettingsHTML() {
	return `
	<div class="col-span-full px-4 md:px-6 lg:px-4 border-t border-gray-300" id="more-prompt-settings">
		<!-- Start of the new nested accordion for prompt settings fields -->
		<div id="nestedAccordion">
			<h2 id="nestedHeading" class="flex items-center justify-between py-2 md:py-4 lg:py-2">
				<button id="prompt-settings-section-button" class="group relative flex items-center rounded-t-[15px] border-0 bg-transparent py-2 text-right text-sm md:text-2xl lg:text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-700" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedPromptSettingsCollapse" aria-expanded="false" aria-controls="nestedCollapse" data-te-collapse-collapsed="">

					<span class="mr-2 mt-0 h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-2 group-[[data-te-collapse-collapsed]]:rotate-[-90deg] group-[[data-te-collapse-collapsed]]:fill-[#336dec] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 md:h-6 md:w-6 lg:h-4 lg:w-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
						</svg>
					</span>

					Prompt Settings

				</button>
			</h2>

			<div id="nestedPromptSettingsCollapse" class="accordion-collapse collapse !visible hidden" aria-labelledby="nestedHeading" style="" data-te-collapse-item="">

				<div class="pb-3 pt-2" id="rest-gen-settings-section">
					<div class="col-span-full grid grid-cols-6 gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-2">

						<div class="col-span-full" id="neg-prompt-field-container">
							<label for="neg-prompt" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Negative Prompt</label>
							<button onclick="event.preventDefault()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Negative Prompt" data-te-content="The negative prompt in image generation acts as a guide for what the model should avoid including in the output image. It helps in steering the generation away from undesired elements or themes by explicitly stating what you do not want to appear in the final result." class="ml-2 text-gray-300" data-te-original-title="" title="">
								<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
							</button>
							<div class="mt-2">
								<textarea id="neg-prompt" name="neg-prompt" rows="3" class="block w-full h-20 md:h-32 lg:h-20 rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6"></textarea>
							</div>
						</div>


						<div class="col-span-3" id="gs-field-container">
							<label for="guidance-scale" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Guidance Scale</label>
							<button onclick="event.preventDefault()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Guidance Scale" data-te-content="Also know as 'classifier free guidance' or cfg. Guidance scale controls how closely the generation should adhere to the input prompt. A higher value enforces greater fidelity to the prompt, potentially leading to more accurate but less varied results, while a lower value allows for more creative interpretations." class="ml-2 text-gray-300" data-te-original-title="" title="">
								<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
							</button>
							<div class="mt-2">
							<input type="number" name="guidance-scale" id="guidance-scale" placeholder="6" min="1.0" max="20.0" step="0.1" value="6" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
							<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">1.0 - 20.0</p>
							</div>
						</div>
						<div class="col-span-3" id="seed-field-container">
							<div class="flex items-center">
								<label for="seed" class="flex-grow block text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Seed</label>
								<button onclick="randomizeSeed(event)" title="Random seed">
									<i class="fa-solid fa-dice-three text-gray-500 md:text-2xl lg:text-base" aria-hidden="true"></i>
								</button>
							</div>
							<div class="mt-2">
								<input type="number" name="seed" id="seed" min="-1" max="4294967295" value="" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6" placeholder="Random">
								<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">0 - 4294967295</p>
							</div>
						</div>


						<div class="col-span-3" id="gen-count-field-container">
							<label for="gen-count" class="block text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700"># of Images</label><div class="mt-2">
								<select id="gen-count" name="gen-count" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-900 md:text-2xl lg:text-base shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
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
						<div class="col-span-3" id="denoising-steps-field-container">
								<label for="denoising-steps" class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-700">Denoising Steps</label>
								<button onclick="event.preventDefault()" data-te-trigger="${info_interaction_type}" data-te-toggle="popover" data-te-title="Denoising Steps" data-te-content="Each step reduces the noise a bit more, adding detail and coherence to the image. The more denoising steps, the more detailed and polished the image can become, but it also takes more time to generate; directly affecting generation cost. There is a drop off where more steps do not result in more details." class="ml-2 text-gray-300" data-te-original-title="" title="">
									<i class="fa-solid fa-circle-info md:text-2xl lg:text-base" aria-hidden="true"></i>
								</button>
								<div class="mt-2">
									<input type="number" disabled name="denoising-steps" id="denoising-steps" placeholder="20" min="4" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 md:py-3 lg:py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-sm md:text-2xl lg:text-sm leading-6">
									<p class="text-right text-xs md:text-lg lg:text-xs text-gray-400 mt-1 ml-1">4 - 100</p>
								</div>
						</div>
						<div class="col-span-full" id="toggle-ays-field-container">
							<div class="flex items-center justify-between">
								<span class="flex flex-grow flex-col mr-1 md:mr-3 lg:mr-1">
									<span class="text-sm md:text-2xl lg:text-sm font-medium leading-6 text-gray-900" id="availability-label">Use AYS</span>
									<span class="text-sm md:text-2xl lg:text-sm text-gray-500" id="availability-description">Enables <a class="underline" href="https://research.nvidia.com/labs/toronto-ai/AlignYourSteps/" target="_blank">Align Your Steps</a>. Can improve prompt coherence and output quality. Disables denoising steps.</span>
								</span>
								<!-- Enabled: "bg-black, enabled", Not Enabled: "bg-gray-200" -->
								<button id="ays-toggle-button" type="button" onclick="toggleAysPressed(event)" class="enabled bg-black relative inline-flex h-6 w-10 md:h-11 md:w-20 lg:h-6 lg:w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-offset-2" role="switch" aria-checked="false" aria-labelledby="availability-label" aria-describedby="availability-description">
									<!-- Enabled: "translate-x-5 or x-10 if md", Not Enabled: "translate-x-0" -->
									<span aria-hidden="true" class="translate-x-5 md:translate-x-10 lg:translate-x-5 pointer-events-none inline-block h-5 w-5 md:h-10 md:w-10 lg:h-5 lg:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
								</button>
							</div>
						</div>

						<div class="col-span-full" id="toggle-hidiffusion-field-container">
							<div class="hidden flex items-center justify-between">
								<span class="flex flex-grow flex-col">
									<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">Use HiDiffusion</span>
									<span class="text-sm text-gray-500" id="availability-description">Enables HiDiffusion which will generate a hig-res (1024x1024) image with even more details.</span>
								</span>
								<!-- Enabled: "bg-black", Not Enabled: "bg-gray-200" -->
								<button id="hid-toggle-button" type="button" onclick="toggleHiDPressed(event)" class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-offset-2" role="switch" aria-checked="false" aria-labelledby="availability-label" aria-describedby="availability-description">
									<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
									<span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
								</button>
							</div>
						</div>	
					</div>
				</div>

			</div>
		</div>
	</div>
	`;
}