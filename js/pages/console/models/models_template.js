function dummyGridHTML() {
    return `
    <div class="bg-gray-100">
        <div id="collection-grid-container" class="relative mx-auto max-w-7xl px-2 py-6 overflow-y-auto" style="height: 1073px;">
            <div id="collection-grid" role="list" class="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" @click.away="clickedOutsideOfGenMenu()" onclick="clickedOnEmptyPartOfGrid()">
                <div class="relative rounded-lg overflow-hidden" generation-id="p5csGOlasuX7syWZNPaP" gen-info="{" blob_path":"i5uwekabqs0uojvecdck="" p5csgolasux7sywznpap_pz2s7wdb37zwg36evyvligr4ti.png","collection_id":null,"gen_recipe":{"guidance_scale":13,"high_noise_frac":0.9,"img2img_url":"","inference_steps":20,"lora_scale":0.6,"neg_prompt":"","prompt":"cartoon="" of="" goofy="" blue="" velociraptor,="" closeup="" near="" the="" right="" half="" face,="" retro,="" shiny="" scales,="" rainforest="" in="" background","prompt_strength":0.8,"refine":"no_refiner","res_height":1024,"res_width":1024,"scheduler":"k_euler","seed":"34941870"},"generation_time":5.540187,"model_name":"stability-ai="" sdxl","model_rec_id":"","model_version":"39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b","prediction_error":null,"prediction_status":"succeeded","rec_id":"p5csgolasux7sywznpap","replicate_prediction_id":"pz2s7wdb37zwg36evyvligr4ti","signed_gen_url":"https:="" storage.googleapis.com="" dev-sketchmeai-prediction-images="" i5uwekabqs0uojvecdck="" 30="" jan="" 2024="" 18:22:06="" gmt","user_rec_id":"i5uwekabqs0uojvecdck"}"="" style="">

                    <div class="aspect-[1/1] bg-black">
                    <!-- Rest of your code -->
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
    `;
}