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
                        <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                            <input type="text" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="model-list-container">
                        <label for="gen-count" class="block text-sm font-medium leading-6 text-gray-900">Model</label><div class="mt-2">
                            <select id="gen-count" name="gen-count" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>SDXL</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-full" id="training-data-container">
                        <label for="prompt" class="block text-sm font-medium leading-6 text-gray-900">Training Data</label>
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
                        <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Token String</label>
                        <div class="mt-2">
                            <input type="text" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="seed-field-container">
                        <div class="flex items-center">
                            <label for="seed" class="flex-grow block text-sm font-medium leading-6 text-gray-900">Seed</label>
                            <button onclick="randomizeSeed(event)">
                                <i class="fa-solid fa-dice" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="mt-2">
                            <input type="number" name="seed" id="seed" min="-1" max="4294967295" value="-1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="resolution-field-container">
                        <label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Resolution</label><div class="mt-2">
                            <input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="network-rank-field-container">
                        <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Network Rank</label>
                        <div class="mt-2">
                            <input type="number" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="train-batch-size-field-container">
                        <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Batch Size</label>
                        <div class="mt-2">
                            <input type="number" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="image-repeats-field-container">
                        <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Image Repeats</label>
                        <div class="mt-2">
                            <input type="number" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="unet-lr-field-container">
                        <label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Unet Learning Rate</label><div class="mt-2">
                            <input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="ti-lr-field-container">
                        <label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Text Inversion Learning Rate</label><div class="mt-2">
                            <input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-2" id="lora-lr-field-container">
                        <label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Lora Learning Rate</label><div class="mt-2">
                            <input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div><div class="col-span-full flex flex-col justify-center" id="gen-button-container">
                        <input type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    </div>

                    

                    <div class="col-span-full" id="neg-prompt-field-container">
                        <label for="neg-prompt" class="block text-sm font-medium leading-6 text-gray-900">Negative Prompt</label><div class="mt-2">
                        <textarea id="neg-prompt" name="neg-prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 80px;"></textarea>
                        </div>
                    </div>

                    <div class="sm:col-span-3" id="gs-field-container">
                        <label for="guidance-scale" class="block text-sm font-medium leading-6 text-gray-900">Guidance Scale</label>
                        <div class="mt-2">
                        <input type="number" name="guidance-scale" id="guidance-scale" min="1.0" max="20.0" step="0.1" value="7.5" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    

                    
                    <div class="sm:col-span-3" id="ps-field-container">
                        <label for="prompt-strength" class="block text-sm font-medium leading-6 text-gray-900">Prompt Strength</label>
                        <div class="mt-2">
                        <input type="number" name="prompt-strength" id="prompt-strength" min="0.0" max="1.0" step="0.1" value="0.8" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="sm:col-span-3" id="lora-field-container">
                        <label for="lora-scale" class="block text-sm font-medium leading-6 text-gray-900">Lora Scale</label>
                        <div class="mt-2">
                            <input type="number" name="lora-scale" id="lora-scale" min="0.0" max="1.0" step="0.1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value="0.6">
                        </div>
                    </div>
                    <div class="col-span-full" id="models-field-container">
                        <label for="models" class="block text-sm font-medium leading-6 text-gray-900">Models</label>
                        <div class="mt-2">
                            <select id="model-dropdown" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" size="4" multiple="">
                                <option selected="" id="sdxl" instkey="" model="stability-ai/sdxl" version="39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b">&nbsp;&nbsp;Stable Diffusion SDXL</option>
                                <option id="klo_10to5_drw" instkey="zxc" model="klopez89/klo_10to5_drw" version="ae00e4cb912db042646898586e27961b9aeb0705e8bff16b8c9773dadfa42389">&nbsp;&nbsp;Kevin, 10to5_Drawing</option>
                                <option id="jks_10to5_drw" instkey="zxc" model="klopez89/jks_10to5_drw" version="3db0c81fe691df5303011ec73360a216655d7fd081a473eda55de4048031a24d">&nbsp;&nbsp;James, 10to5_Drawing</option>
                                <option id="mags_10to5_drw" instkey="zxc" model="klopez89/mags_10to5_drw" version="f61f56370d4616ddb27c3895e55a3ced09f086e2c1a9ba7b1501ea9a869467ec">&nbsp;&nbsp;Mags, 10to5_Drawing</option>
                                <option id="alb_10to5_drw" instkey="zxc" model="klopez89/b75anpibtft2ra2ckhwbx6jrkug1_drw_model_2983197865" version="3387ce767f1ae4bfbecbf950f39cc93c81d9e15f03c8eca431b9530e3955ed85">&nbsp;&nbsp;Alb, 10to5_Drawing</option>
                                <option id="ben_10to5_drw" instkey="zxc" model="klopez89/ben_10to5_drw" version="89b7fe0c81e7c78568a7c1601a3715575d0ad09be22cf473c7b7fab04c552bd8">&nbsp;&nbsp;Ben, 10to5_Drawing</option>
                                <option id="jon_10to5_drw" instkey="zxc" model="klopez89/jon_10to5_drw" version="ada47df35bbea65b739f213dddc764096a418e07724c518189e7a873f1db2a03">&nbsp;&nbsp;Jon, 10to5_Drawing</option>
                                <option id="alb_10to5_drw_cropped" instkey="zxc" model="klopez89/alb_10to5_drw" version="663756c8e90a471837504178b4c720c767a438e32141052196cc3c9f258431bc">&nbsp;&nbsp;Alb Cropped, 10to5_Drawing</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-full" id="same-seed-field-container"><div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="same-seed" name="same-seed" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                </div>
                                <div class="text-sm leading-6">
                                    <p class="text-gray-500">Run all selected models with the same random seed</p>
                                </div>
                            </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
}