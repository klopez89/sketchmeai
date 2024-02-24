
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
        <div class="group aspect-h-10 aspect-w-10 block w-full relative">

            <img src="${placeholderImageURL}" alt="" class="object-cover group-hover:opacity-95 transition-opacity opacity-0 duration-200 cursor-pointer data-[te-lightbox-disabled]:cursor-auto" onclick="goingToLightbox(event)">
            
            <div id="gen-loader" class="bg-gray-200 flex justify-center items-center">
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500" aria-hidden="true"></i>
                <p class="absolute bottom-0 right-0 pb-2 pr-2 text-xs text-gray-500" id="gen-status"></p>
                <button class="absolute top-0 right-0 p-2 text-xs text-gray-400 hover:text-gray-500 hidden" id="cancel-button">Cancel</button>
            </div>

            <div id="action-container" class="hidden bg-transparent group-hover:bg-gray-900 group-hover:bg-opacity-10 pointer-events-none group transition-bg-opacity duration-200">
                <button id="copy-button" class="absolute bottom-2 right-2 p-2 text-md text-white border-2 border-white opacity-0 group-hover:opacity-100 hover:bg-gray-800 rounded-lg pointer-events-auto flex items-center justify-center transition-opacity duration-200">
                    <i class="fa fa-copy" aria-hidden="true"></i>
                </button>
            </div>

            <div id="gen-menu-shield" class="bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full hidden" onclick="tappedGenMenuShield(event)"></div>
        
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
    inputTitle = "Prompt";
    inputPlaceholder = "Enter text for the AI to continue";
    return `
    <!-- 3 column wrapper -->
    <div class="mx-auto w-full h-full grow md:flex">

        <div class="bg-gray-100 pb-4 pt-4 min-w-[400px] md:max-w-[400px] max-w-full border-r border-gray-300">
                
            <form class="generate-form h-full overflow-y-auto px-8" id="generateForm">

                <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div class="col-span-full" id="prompt-field-container">
                        <label for="prompt" class="block text-sm font-medium leading-6 text-gray-900">Prompt</label>
                        <div class="mt-2">
							<div id="prompt" name="prompt" rows="3" class="max-w-full whitespace-normal editable break-words outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 110px;"></div>
                        </div>
                    </div>
	
                    <div class="col-span-full flex flex-col justify-center" id="gen-button-container">
                        <input type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center bg-black px-3.5 py-2.5 text-lg text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    </div>
                </div>


                <div id="accordionExample5">
                	<div class="rounded-t-lg bg-transparent">
						<h2 class="mb-0" id="headingOne5">
								<button class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-transparent pt-2 text-right text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-transparent [&:not([data-te-collapse-collapsed])]:text-gray-400" type="button" data-te-collapse-init="" data-te-target="#collapseOne5" aria-expanded="false" aria-controls="collapseOne5" data-te-collapse-collapsed="">
									<span class="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:text-gray-900 motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
									</span>
									Show Settings
								</button>
						</h2>
                    	<div id="collapseOne5" class="!visible hidden" aria-labelledby="headingOne5" style="" data-te-collapse-item="">
                      		<div class="px-0 py-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
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
									<label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Denoising Steps</label><div class="mt-2">
										<input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									</div>
								</div>

								<div class="col-span-full" id="neg-prompt-field-container">
									<label for="neg-prompt" class="block text-sm font-medium leading-6 text-gray-900">Negative Prompt</label><div class="mt-2">
									<textarea id="neg-prompt" name="neg-prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 80px;"></textarea>
									</div>
								</div>

								<div class="sm:col-span-3" id="gs-field-container">
									<label for="guidance-scale" class="block text-sm font-medium leading-6 text-gray-900">Guidance Scale</label>
									<div class="mt-2">
									<input type="number" name="guidance-scale" id="guidance-scale" min="1.0" max="20.0" step="0.1" value="7.5" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									</div>
								</div>
								<div class="sm:col-span-3" id="seed-field-container">
									<div class="flex items-center">
										<label for="seed" class="flex-grow block text-sm font-medium leading-6 text-gray-900">Seed</label>
										<button onclick="randomizeSeed(event)">
											<i class="fa-solid fa-dice" aria-hidden="true"></i>
										</button>
									</div>
									<div class="mt-2">
										<input type="number" name="seed" id="seed" min="-1" max="4294967295" value="-1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									</div>
								</div>

								<div class="col-span-full" id="igm2img-field-container">
									<label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Image2Image Url</label>
									<div class="mt-2">
										<input type="text" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									</div>
								</div>
								<div class="sm:col-span-3" id="ps-field-container">
									<label for="prompt-strength" class="block text-sm font-medium leading-6 text-gray-900">Prompt Strength</label>
									<div class="mt-2">
									<input type="number" name="prompt-strength" id="prompt-strength" min="0.0" max="1.0" step="0.1" value="0.8" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
									</div>
								</div>
								<div class="sm:col-span-3" id="lora-field-container">
									<label for="lora-scale" class="block text-sm font-medium leading-6 text-gray-900">Lora Scale</label>
									<div class="mt-2">
										<input type="number" name="lora-scale" id="lora-scale" min="0.0" max="1.0" step="0.01" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" value="0.6">
									</div>
								</div>
								<div class="col-span-full" id="models-field-container">
									<label for="models" class="block text-sm font-medium leading-6 text-gray-900">Models</label>
									<div class="mt-2">
										<select id="model-dropdown" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" size="4" multiple="">
											<option selected="" id="sdxl" instkey="" model="stability-ai/sdxl" version="39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b">&nbsp;&nbsp;Stable Diffusion SDXL</option>
										</select>
									</div>
								</div>
								<div class="col-span-full" id="same-seed-field-container">
									<div class="relative flex gap-x-3">
											<div class="flex h-6 items-center">
												<input id="same-seed" name="same-seed" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-black">
											</div>
											<div class="text-sm leading-6">
												<p class="text-gray-500">Run selected models with same random seed</p>
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
            </form>
        </div>




        <!-- Right column area -->
        <div class="flex-1 md:flex">
            <div class="bg-gray-100 px-0 py-0 md:flex-1">
                <div class="bg-gray-100">
                    <div id="collection-grid-container" class="relative mx-auto max-w-7xl px-1 py-1 overflow-y-auto">

                        <div data-te-lightbox-init id="collection-grid" role="list" class="grid grid-cols-2 gap-x-1 gap-y-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" @click.away="clickedOutsideOfGenMenu()" onclick="clickedOnEmptyPartOfGrid()"></div>

                        <div id="grid-loader" class="absolute top-0 left-0 w-full h-full px-4 py-8 sm:px-6 lg:px-8">
                            <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                                <div class="mt-5">    
                                    <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>  
                        <div id="infiniteLoader" class="hidden text-4xl text-gray-500 w-full flex bg-transparent flex flex-col items-center pt-6 pb-0">
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
        <button type="button" class="absolute text-2xl text-white top-2 right-2 flex items-center p-2 opacity-0 group-hover:opacity-100 hover:text-gray-200 transition-opacity duration-200" id="gen-menu-button" onClick="genMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
            <i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
        </button>

        <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-4 z-10 mt-11 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="generation-menu-button" tabindex="-1" style="display: none;">
        
            <a href="#" class="block px-3 py-1 text-sm leading-6 text-red-600" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); deleteButtonPressed(event)">Delete</a>
        </div>
    </div>
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
	var training_subject = model.get("training_subject", "Test Subject");
    return `
    <option id="${model_id}" instkey="${instKey}" model="${replicate_name}" version="${short_version}" modelName="${model_name}" trainingSubject="${training_subject}" genderType=${gender_type}>&nbsp;&nbsp;${model_name}</option>
    `;
}