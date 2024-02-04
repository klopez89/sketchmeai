function dummyGridHTML() {
    return `
    <div class="bg-gray-100 h-full">
        <div id="collection-grid-container" class="relative mx-auto max-w-7xl px-2 py-6 overflow-y-auto h-full hidden">
            <div id="collection-grid" role="list" class="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" @click.away="clickedOutsideOfGenMenu()" onclick="clickedOnEmptyPartOfGrid()">
                <div class="relative rounded-lg overflow-hidden" generation-id="p5csGOlasuX7syWZNPaP" gen-info="{" blob_path":"i5uwekabqs0uojvecdck="" p5csgolasux7sywznpap_pz2s7wdb37zwg36evyvligr4ti.png","collection_id":null,"gen_recipe":{"guidance_scale":13,"high_noise_frac":0.9,"img2img_url":"","inference_steps":20,"lora_scale":0.6,"neg_prompt":"","prompt":"cartoon="" of="" goofy="" blue="" velociraptor,="" closeup="" near="" the="" right="" half="" face,="" retro,="" shiny="" scales,="" rainforest="" in="" background","prompt_strength":0.8,"refine":"no_refiner","res_height":1024,"res_width":1024,"scheduler":"k_euler","seed":"34941870"},"generation_time":5.540187,"model_name":"stability-ai="" sdxl","model_rec_id":"","model_version":"39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b","prediction_error":null,"prediction_status":"succeeded","rec_id":"p5csgolasux7sywznpap","replicate_prediction_id":"pz2s7wdb37zwg36evyvligr4ti","signed_gen_url":"https:="" storage.googleapis.com="" dev-sketchmeai-prediction-images="" i5uwekabqs0uojvecdck="" 30="" jan="" 2024="" 18:22:06="" gmt","user_rec_id":"i5uwekabqs0uojvecdck"}"="" style="">

                    <div class="aspect-[1/1] bg-gray-300 hover:bg-gray-200 cursor-pointer">
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

        <!-- New div with a form -->
        <div id="new-form-container" class="relative mx-auto max-w-7xl px-2 py-6 overflow-y-auto h-full">
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
                    </div><div class="col-span-1" id="object-name-container">
                        <label for="object-name" class="block text-sm font-medium leading-6 text-gray-900">Object Name</label><div class="mt-2">
                            
                        <input type="text" name="object-name" id="object-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></div>
                    </div><div class="col-span-full" id="training-data-container">
                        <label for="localUploadInput" class="block text-sm font-medium leading-6 text-gray-900">Training Data</label>
                        <div class="mt-2">
                            <div class="px-0">
        
                                <button id="uploadAreaButton" class="relative flex flex-col items-center block w-full rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
                                    <div class="flex flex-row items-center">		
                                        <i class="fa fa-images text-base pr-2" aria-hidden="true"></i>
                                        <span class="mt-0 block text-base font-medium text-gray-400" id="upload-caption">Drag or click to upload 10 images</span>
                                    </div>
                                </button>
                                <input id="localUploadInput" type="file" style="display:none;" multiple="">
                            </div>

                            <ul role="list" id="uploadEntryContainer" class="flex overflow-x-auto space-x-2 pt-6 px-8">
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-2" id="token-string-field-container">
                        <label for="token-string" class="block text-sm font-medium leading-6 text-gray-900">Token String</label>
                        <div class="mt-2">
                            <input type="text" name="token-string" id="token-string" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                            <input type="number" name="resolution" id="resolution" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="network-rank-field-container">
                        <label for="network-rank" class="block text-sm font-medium leading-6 text-gray-900">Network Rank</label>
                        <div class="mt-2">
                            <input type="number" name="network-rank" id="network-rank" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="train-batch-size-field-container">
                        <label for="batch-size" class="block text-sm font-medium leading-6 text-gray-900">Batch Size</label>
                        <div class="mt-2">
                            <input type="number" name="batch-size" id="batch-size" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="image-repeats-field-container">
                        <label for="image-repeats" class="block text-sm font-medium leading-6 text-gray-900">Image Repeats</label>
                        <div class="mt-2">
                            <input type="number" name="image-repeats" id="image-repeats" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="unet-lr-field-container">
                        <label for="unet-lr" class="block text-sm font-medium leading-6 text-gray-900">Unet Learning Rate</label><div class="mt-2">
                            <input type="number" name="unet-lr" id="unet-lr" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="ti-lr-field-container">
                        <label for="ti-lr" class="block text-sm font-medium leading-6 text-gray-900">Text Inversion Learning Rate</label><div class="mt-2">
                            <input type="number" name="ti-lr" id="ti-lr" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="lora-lr-field-container">
                        <label for="lora-lr" class="block text-sm font-medium leading-6 text-gray-900">Lora Learning Rate</label><div class="mt-2">
                            <input type="number" name="lora-lr" id="lora-lr" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="lr-scheduler-container">
                        <label for="lr-scheduler" class="block text-sm font-medium leading-6 text-gray-900">Learning Rate Scheduler</label><div class="mt-2">
                            <select id="lr-scheduler" name="lr-scheduler" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>constant</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-2" id="scheduler-cycles-field-container">
                        <label for="scheduler-cycles" class="block text-sm font-medium leading-6 text-gray-900">Scheduler Cycles</label><div class="mt-2">
                            <input type="number" name="scheduler-cycles" id="scheduler-cycles" min="1" max="500" value="10" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="warmup-steps-field-container">
                        <label for="warmup-steps" class="block text-sm font-medium leading-6 text-gray-900">Warmup Steps</label><div class="mt-2">
                            <input type="number" name="warmup-steps" id="warmup-steps" min="1" max="500" value="10" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="validation-epoch-field-container">
                        <label for="validation-epochs" class="block text-sm font-medium leading-6 text-gray-900">Validation Epochs</label><div class="mt-2">
                            <input type="number" name="validation-epochs" id="validation-epochs" min="1" max="500" value="50" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-2" id="max-train-steps-field-container">
                        <label for="max-train-steps" class="block text-sm font-medium leading-6 text-gray-900">Max Train Steps</label><div class="mt-2">
                            <input type="number" name="max-train-steps" id="max-train-steps" min="1" max="500" value="10" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
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
                                <input id="gradient-checkpoint" name="gradient-checkpoint" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Gradient checkpointing</p>
                                </div>
                            </div>
                    </div>
                    <div class="col-span-2" id="8bit-adam-field-container"><div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="8bit-adam" name="8bit-adam" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Use 8bit Adam</p>
                                </div>
                            </div>
                    </div>
                    <div class="col-span-full flex flex-col justify-center" id="gen-button-container">

                        <button id="uploadToServerButton" type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" disabled="">
                            <p>Begin Fine Tuning Model</p>
                            <i class="fa fa-spinner fa-spin" style="position: absolute; display:none;" aria-hidden="true"></i>
                        </button>
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