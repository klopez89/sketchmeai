function dummyGridHTML() {
    return `
    <div class="bg-gray-100 h-full relative">
        <div id="collection-grid-container" class="absolute mx-auto max-w-7xl px-2 py-6 overflow-y-auto h-full w-full z-10 bg-gray-100 transform transition-all duration-200 ease-in-out">
            <div class="relative">
                <div id="collection-grid" role="list" class="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" @click.away="clickedOutsideOfCollectionGrid()" onclick="clickedOnEmptyPartOfGrid()">
                    <div id="new-model-button" class="relative rounded-lg overflow-hidden cursor-pointer" onclick="clickedOnNewModelButton(event)">
                        <div class="aspect-[1/1] bg-gray-300 hover:bg-gray-200">
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
        <div id="new-form-container" class="absolute opacity-0 mx-auto max-w-7xl px-2 py-6 overflow-y-auto h-full w-full bg-gray-100 transform transition-all translate-x-full duration-700 ease-in-out">
            <form id="new-form" autocomplete="off">
                <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div class="col-span-2" id="name-field-container">
                        <label for="model-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                            <input type="text" name="model-name" id="model-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="model-list-container">
                        <label for="model-selection" class="block text-sm font-medium leading-6 text-gray-900">Model</label><div class="mt-2">
                            <select id="model-selection" name="model-selection" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>SDXL</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-1" id="preset-list-container">
                        <label for="training-subject" class="block text-sm font-medium leading-6 text-gray-900">Training Subject</label><div class="mt-2">
                            <select id="training-subject" name="training-subject" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option selected="" disabled="">Select an option</option>
                                <option>person</option>
                                <option>style</option>
                                <option>object</option>
                            </select>
                        </div>
                    </div><div class="col-span-1 hidden" id="object-name-container">
                        <label for="object-name" class="block text-sm font-medium leading-6 text-gray-900">Object Name</label><div class="mt-2">
                            
                        <input type="text" name="object-name" id="object-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></div>
                    </div><div class="col-span-full" id="training-data-container">
                        <label for="localUploadInput" class="block text-sm font-medium leading-6 text-gray-900">Training Data</label>
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
                    <div class="col-span-5 flex flex-col justify-center" id="gen-button-container">
                        <button id="uploadToServerButton" type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center border border-transparent px-3.5 py-2.5 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-200 hover:bg-gray-200" disabled="">
                            <p>Start Training</p>
                            <i class="fa fa-spinner fa-spin" style="position: absolute; display:none;" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="col-span-1" id="cancel-button-container">
                        <button id="cancelButton" class="rounded-md w-full flex-grow-0 flex-shrink-0 text-center border border-transparent px-3.5 py-2.5 text-base font-semibold text-gray-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-200 hover:bg-gray-300" onclick="exitNewModelForm(event)">
                            <p>Cancel</p>
                            <i class="fa fa-spinner fa-spin" style="position: absolute; display:none;" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="col-span-2" id="token-string-field-container">
                        <label for="token-string" class="block text-sm font-medium leading-6 text-gray-900">Token String</label>
                        <div class="mt-2">
                            <input type="text" name="token-string" id="token-string" value="zxc" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                            <input type="number" name="seed" id="seed" min="-1" max="4294967295" value="-1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="resolution-field-container">
                        <label for="resolution" class="block text-sm font-medium leading-6 text-gray-900">Resolution</label><div class="mt-2">
                            
                        <select id="resolution" name="resolution" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>1024</option>
                            <option>768</option><option>512</option></select></div>
                    </div>
                    <div class="col-span-2" id="network-rank-field-container">
                        <label for="network-rank" class="block text-sm font-medium leading-6 text-gray-900">Network Rank</label>
                        <div class="mt-2">
                            <input type="number" name="network-rank" id="network-rank" min="0" max="256" step="1" value="64" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="train-batch-size-field-container">
                        <label for="batch-size" class="block text-sm font-medium leading-6 text-gray-900">Batch Size</label>
                        <div class="mt-2">
                            <input type="number" name="batch-size" id="batch-size" min="1" max="50" step="1" value="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="image-repeats-field-container">
                        <label for="image-repeats" class="block text-sm font-medium leading-6 text-gray-900">Image Repeats</label>
                        <div class="mt-2">
                            <input type="number" name="image-repeats" id="image-repeats" min="1" max="50" step="1" value="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="unet-lr-field-container">
                        <label for="unet-lr" class="block text-sm font-medium leading-6 text-gray-900">Unet Learning Rate</label><div class="mt-2">
                            <input type="number" name="unet-lr" id="unet-lr" step="0.000001" min="0.000004" max="0.001" value="0.00005" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="te-lr-field-container">
                        <label for="te-lr" class="block text-sm font-medium leading-6 text-gray-900">Text Inversion Learning Rate</label><div class="mt-2">
                            <input type="number" name="te-lr" id="te-lr" step="0.000001" min="0.000004" max="0.001" value="0.000005" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="lr-scheduler-container">
                        <label for="lr-scheduler" class="block text-sm font-medium leading-6 text-gray-900">Learning Rate Scheduler</label><div class="mt-2">
                            <select id="lr-scheduler" name="lr-scheduler" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>constant</option>
                            <option>constant_with_warmup</option><option>linear</option><option>cosine</option><option>cosine_with_restarts</option><option>polynomial</option></select>
                        </div>
                    </div>
                    <div class="col-span-2" id="scheduler-cycles-field-container">
                        <label for="scheduler-cycles" class="block text-sm font-medium leading-6 text-gray-900">Scheduler Cycles</label><div class="mt-2">
                            <input type="number" name="scheduler-cycles" id="scheduler-cycles" min="1" max="100" value="1" step="1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="warmup-steps-field-container">
                        <label for="warmup-steps" class="block text-sm font-medium leading-6 text-gray-900">Warmup Steps</label><div class="mt-2">
                            <input type="number" name="warmup-steps" id="warmup-steps" min="0" max="100" value="0" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="validation-epoch-field-container">
                        <label for="validation-epochs" class="block text-sm font-medium leading-6 text-gray-900">Validation Epochs</label><div class="mt-2">
                            <input type="number" name="validation-epochs" id="validation-epochs" min="50" max="500" value="50" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="max-train-steps-field-container">
                        <label for="max-train-steps" class="block text-sm font-medium leading-6 text-gray-900">Max Train Steps</label><div class="mt-2">
                            
                        <select id="max-train-steps" name="max-train-steps" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>auto</option>
                            <option>1000</option><option>1200</option><option>1500</option><option>2000</option></select></div>
                    </div>
                    <div class="col-span-2" id="mixed-precision-container">
                        <label for="mixed-precision" class="block text-sm font-medium leading-6 text-gray-900">Mixed Precision</label><div class="mt-2">
                            <select id="mixed-precision" name="mixed-precision" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>fp16</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-2" id="xformers-field-container"><div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="xformers" name="xformers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Use xformers</p>
                                </div>
                            </div>
                    </div>
                    <div class="col-span-2" id="gradient-checkpoint-field-container"><div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="gradient-checkpoint" name="gradient-checkpoint" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked>
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Gradient checkpointing</p>
                                </div>
                            </div>
                    </div>
                    <div class="col-span-2" id="8bit-adam-field-container"><div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="8bit-adam" name="8bit-adam" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked>
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Use 8bit Adam</p>
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