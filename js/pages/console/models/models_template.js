function dummyGridHTML() {
    return `
    <div class="bg-gray-100 h-full relative flex justify-center">
        <div id="collection-grid-container" class="absolute mx-auto max-w-4xl px-8 py-8 overflow-y-auto h-full w-full bg-gray-100 transform transition-all duration-200 ease-in-out">
            <div class="relative">
                <div id="collection-grid" role="list" class="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" @click.away="clickedOutsideOfCollectionGrid()" onclick="clickedOnEmptyPartOfGrid()">
                    <div id="new-model-button" class="relative rounded-lg overflow-hidden cursor-pointer" onclick="clickedOnNewModelButton(event)">
                        <div class="aspect-[1/1] bg-black hover:bg-gray-800">
                            <div class="flex justify-center items-center h-full text-white text-5xl">
                                <i class="fas fa-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="grid-loader" class="absolute top-0 left-0 w-full h-full px-4 py-8 sm:px-6 lg:px-8 hidden">
                    <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                        <div class="mt-5">    
                            <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div id="infiniteLoader" class="text-4xl text-gray-500 w-full flex bg-transparent flex flex-col items-center pt-6 pb-0 hidden">
                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                </div> 
            </div>
        </div>

        <!-- New div with a form -->
        <div id="new-form-container" class="hidden absolute opacity-0 mx-auto max-w-4xl px-8 py-8 overflow-y-auto h-full w-full bg-gray-100 transition duration-500 opacity-0">
            <h2 class="mb-5 text-gray-900 text-2xl">New Custom Model</h2>
            <form id="new-form" autocomplete="off">
                <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div class="col-span-2" id="name-field-container">
                        <div class="flex items-center">
                            <label for="model-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <p class="text-xs text-gray-500 italic pl-1">(no spaces)</p>
                            <div class="text-xs text-red-500 italic hidden" id="model-name-validation">
                                Model name is already taken.
                            </div>
                        </div>
                        <div class="mt-2">
                            <input type="text" name="model-name" id="model-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="model-list-container">
                        <label for="model-selection" class="block text-sm font-medium leading-6 text-gray-900">Model</label><div class="mt-2">
                            <select id="model-selection" name="model-selection" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                <option>SDXL</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-2" id="preset-list-container">
                        <label for="training-subject" class="block text-sm font-medium leading-6 text-gray-900">Training Subject</label><div class="mt-2">
                            <select id="training-subject" name="training-subject" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                <!-- <option selected="" disabled="">Select an option</option> -->
                                <option selected="">person</option>
                                <!-- <option>style</option> -->
                                <!-- <option>object</option> -->
                            </select>
                        </div>
                    </div><div class="col-span-1 hidden" id="object-name-container">
                        <label for="object-name" class="block text-sm font-medium leading-6 text-gray-900">Object Name</label><div class="mt-2">
                            
                        <input type="text" name="object-name" id="object-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"></div>
                    </div>
                    <div class="col-span-full mt-2" id="training-data-container">
                        <div class="flex items-center">
                            <label for="localUploadInput" class="block text-sm font-medium leading-6 text-gray-900">Training Data</label>
                            <p class="text-xs text-gray-500 italic pl-1">(10-20 images)</p>
                        </div>
                        <div class="mt-2">
                            <ul role="list" id="uploadEntryContainer" class="flex overflow-x-auto space-x-2 pt-0 px-0">
                                <button id="uploadAreaButton" class="relative flex flex-col items-center justify-center block w-[8em] h-[8em] rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
                                    <div class="flex flex-row items-center">		
                                        <i class="fa text-3xl fa-images" aria-hidden="true"></i>
                                        <span class="mt-0 block text-base font-medium text-gray-400" id="upload-caption"></span>
                                    </div>
                                </button>
                                <input id="localUploadInput" type="file" style="display:none;" multiple="">
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-2 flex flex-col justify-center mt-4" id="gen-button-container">
                        <button id="uploadToServerButton" type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center border border-transparent px-3.5 py-2.5 text-lg text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-200 hover:bg-gray-200" disabled="">
                            <p>Start Training</p>
                            <i class="fa fa-spinner fa-spin" style="position: absolute; display:none;" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="col-span-1 mt-4" id="cancel-button-container">
                        <button id="cancelButton" class="rounded-md w-full flex-grow-0 flex-shrink-0 text-center border border-transparent px-3.5 py-2.5 text-lg text-gray-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-200 hover:bg-gray-300" onclick="exitNewModelForm(event)">
                            <p>Cancel</p>
                        </button>
                    </div>
                </div>


                <div id="advancedSettingsAccordion" class="pt-6 hidden">
                	<div class="rounded-t-lg bg-transparent">
						<h2 class="mb-2" id="headingOne5">
								<button class="group relative flex w-full items-center justify-center rounded-t-[15px] border-0 bg-transparent pt-2 text-center text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-transparent [&:not([data-te-collapse-collapsed])]:text-gray-400" type="button" data-te-collapse-init="" data-te-target="#advancedSettings" aria-expanded="false" aria-controls="advancedSettings" data-te-collapse-collapsed="">
									<span class="h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:text-gray-900 motion-reduce:transition-none">
									</span>
									Show Advanced Settings
								</button>
						</h2>
                    	<div id="advancedSettings" class="!visible hidden" aria-labelledby="headingOne5" style="" data-te-collapse-item="">
                      		<div class="px-0 py-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
							
                                <div class="col-span-2" id="token-string-field-container">
                                    <label for="token-string" class="block text-sm font-medium leading-6 text-gray-900">Token String</label>
                                    <div class="mt-2">
                                        <input type="text" name="token-string" id="token-string" value="zxc" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="seed-field-container">
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
                                <div class="col-span-2" id="resolution-field-container">
                                    <label for="resolution" class="block text-sm font-medium leading-6 text-gray-900">Resolution</label><div class="mt-2">
                                        
                                    <select id="resolution" name="resolution" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                            <option>1024</option>
                                        <option>768</option><option>512</option></select></div>
                                </div>
                                <div class="col-span-2" id="network-rank-field-container">
                                    <label for="network-rank" class="block text-sm font-medium leading-6 text-gray-900">Network Rank</label>
                                    <div class="mt-2">
                                        <input type="number" name="network-rank" id="network-rank" min="0" max="256" step="1" value="64" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="train-batch-size-field-container">
                                    <label for="batch-size" class="block text-sm font-medium leading-6 text-gray-900">Batch Size</label>
                                    <div class="mt-2">
                                        <input type="number" name="batch-size" id="batch-size" min="1" max="50" step="1" value="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="image-repeats-field-container">
                                    <label for="image-repeats" class="block text-sm font-medium leading-6 text-gray-900">Image Repeats</label>
                                    <div class="mt-2">
                                        <input type="number" name="image-repeats" id="image-repeats" min="1" max="50" step="1" value="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="unet-lr-field-container">
                                    <label for="unet-lr" class="block text-sm font-medium leading-6 text-gray-900">Unet Learning Rate</label><div class="mt-2">
                                        <input type="number" name="unet-lr" id="unet-lr" step="0.000001" min="0.000004" max="0.001" value="0.00005" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="te-lr-field-container">
                                    <label for="te-lr" class="block text-sm font-medium leading-6 text-gray-900">Text Inversion Learning Rate</label><div class="mt-2">
                                        <input type="number" name="te-lr" id="te-lr" step="0.000001" min="0.000004" max="0.001" value="0.000005" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="lr-scheduler-container">
                                    <label for="lr-scheduler" class="block text-sm font-medium leading-6 text-gray-900">Learning Rate Scheduler</label><div class="mt-2">
                                        <select id="lr-scheduler" name="lr-scheduler" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                            <option>constant</option>
                                        <option>constant_with_warmup</option><option>linear</option><option>cosine</option><option>cosine_with_restarts</option><option>polynomial</option></select>
                                    </div>
                                </div>
                                <div class="col-span-2" id="scheduler-cycles-field-container">
                                    <label for="scheduler-cycles" class="block text-sm font-medium leading-6 text-gray-900">Scheduler Cycles</label><div class="mt-2">
                                        <input type="number" name="scheduler-cycles" id="scheduler-cycles" min="1" max="100" value="1" step="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="warmup-steps-field-container">
                                    <label for="warmup-steps" class="block text-sm font-medium leading-6 text-gray-900">Warmup Steps</label><div class="mt-2">
                                        <input type="number" name="warmup-steps" id="warmup-steps" min="0" max="100" value="0" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="validation-epoch-field-container">
                                    <label for="validation-epochs" class="block text-sm font-medium leading-6 text-gray-900">Validation Epochs</label><div class="mt-2">
                                        <input type="number" name="validation-epochs" id="validation-epochs" min="50" max="500" value="50" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="col-span-2" id="max-train-steps-field-container">
                                    <label for="max-train-steps" class="block text-sm font-medium leading-6 text-gray-900">Max Train Steps</label><div class="mt-2">
                                        
                                    <select id="max-train-steps" name="max-train-steps" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                            <option>auto</option>
                                        <option>1000</option><option>1200</option><option>1500</option><option>2000</option></select></div>
                                </div>
                                <div class="col-span-2" id="mixed-precision-container">
                                    <label for="mixed-precision" class="block text-sm font-medium leading-6 text-gray-900">Mixed Precision</label><div class="mt-2">
                                        <select id="mixed-precision" name="mixed-precision" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                            <option>fp16</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="hidden col-span-2" id="xformers-field-container"><div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="xformers" name="xformers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-black">
                                            </div>
                                            <div class="text-sm leading-6">
                                                <p class="text-gray-500">Use xformers</p>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-span-2" id="gradient-checkpoint-field-container"><div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="gradient-checkpoint" name="gradient-checkpoint" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-black" checked>
                                            </div>
                                            <div class="text-sm leading-6">
                                                <p class="text-gray-500">Gradient checkpointing</p>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-span-2" id="8bit-adam-field-container"><div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="8bit-adam" name="8bit-adam" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-black" checked>
                                            </div>
                                            <div class="text-sm leading-6">
                                                <p class="text-gray-500">Use 8bit Adam</p>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-span-2 hidden" id="use-reg-imgs-field-container"><div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="use-reg-imgs" name="useRegImgs" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-black">
                                            </div>
                                            <div class="text-sm leading-6">
                                                <p class="text-gray-500">Use regularization imgs</p>
                                            </div>
                                        </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    </div>
    `;
}

function uploadEntryDiv(file, is_first_file) {
    let filename = file.name;
    let fileSize = file.size;
    let fileType = file.type;
  
    let html =
    `
          <li class="w-[8em] h-[8em] flex flex-none divide-y divide-gray-200 rounded-lg bg-white text-center shadow" filename="${filename}" filetype="${fileType}">
              <div class="flex flex-col" style="position: relative;">
                  <img id="uploadedImage" class="w-full h-full rounded-lg object-cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="">
                  <button class="remove-upload-button">
                <span class="fa-stack" style="width:2.0em;">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-times fa-stack-1x fa-inverse"></i>
                </span>
                  </button>
              </div>
          </li>
    `;
  
    return html
  }

  function newModelEntryDiv(model_id) {
    let html = `
    <div class="relative rounded-lg overflow-hidden" model-id="${model_id}">
        <div class="group aspect-h-10 aspect-w-10 block w-full relative">

            <img src="" alt="" class="object-cover group-hover:opacity-95 transition-opacity duration-200 cursor-pointer opacity-100" onclick="showModelMenu(event)">

            <div id="model-name-container" class="aspect-[1/1] bg-gray-300">
                <div class="flex justify-center items-center h-full text-white text-5xl">
                    <p id="model-name-label" class="text-black text-2xl"></p>
                </div>
            </div>
            
            <div id="model-loader" class="bg-gray-200 flex justify-center items-center">
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500" aria-hidden="true"></i>
                <p class="absolute bottom-0 right-0 pb-2 pr-2 text-xs text-gray-500" id="model-status"></p>
                <button class="hidden absolute top-0 right-0 p-2 text-xs text-gray-400 hover:text-gray-500" id="cancel-button">Cancel</button>
            </div>

            <div id="action-container" class="hidden bg-transparent group-hover:bg-gray-900 group-hover:bg-opacity-10 pointer-events-none group transition-bg-opacity duration-200">
            </div>

            <div id="model-menu-shield" class="bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full hidden" onclick="tappedModelMenuShield(event)"></div>
        
        </div>
    </div>
    `
    return html;
  }

  function baseModelMenuHTML() {
    return `
    <div class="model-comp-menu hidden relative pointer-events-auto group" x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()">
        <button type="button" class="absolute text-2xl text-white top-2 right-2 flex items-center p-2 opacity-0 group-hover:opacity-100 hover:text-gray-200 transition-opacity duration-200" id="model-menu-button" onclick="modelMenuShowing(event)" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
            <i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
        </button>

        <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-4 z-10 mt-11 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="model-menu-button" tabindex="-1" style="display: none;">
        
            <a href="#" class="block px-3 py-1 text-sm leading-6 text-red-600" :class="{ 'bg-gray-50': activeIndex === 0 }" role="menuitem" tabindex="-1" id="user-menu-item-0" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 0)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); deleteButtonPressed(event)">Delete</a>
        </div>
    </div>
    `;
}