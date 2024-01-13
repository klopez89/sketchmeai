
const imageUrls = [
    "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1614705827065-62c3dc488f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
    "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80",
];

function newGridItemHTML(promptInfo) {
    return `
    <li class="relative rounded-lg overflow-hidden" generation-id="${promptInfo.generationId}">
        <div class="group aspect-h-10 aspect-w-10 block w-full">
            <img src="" alt="" class="pointer-events-none object-cover hidden">
            <div id="gen-loader" class="bg-gray-200 flex justify-center items-center">
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500" aria-hidden="true"></i>
                <p class="absolute bottom-0 right-0 pb-2 pr-2 text-xs text-gray-500" id="gen-status">...queued</p>
            </div>
            <button type="button" class="absolute inset-0 focus:outline-none"></button>
        </div>
    </li>
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

function dummyGridHTML() {
    inputTitle = "Prompt";
    inputPlaceholder = "Enter text for the AI to continue";
    return `
    <!-- 3 column wrapper -->
    <div class="mx-auto w-full h-full grow xl:flex">

        <div class="bg-gray-200 shrink-0 border-t border-gray-200 px-4 pb-4 pt-4 sm:px-6 xl:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
                
            <form class="generate-form h-full" id="generateForm">

                <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div class="col-span-full" id="prompt-field-container">
                    <label for="prompt" class="block text-sm font-medium leading-6 text-gray-900">Prompt</label><div class="mt-2">
                    <textarea id="prompt" name="prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 110px;"></textarea>
                    </div>
                </div>
                <div class="col-span-full flex flex-col justify-center" id="gen-button-container">
                    <input type="submit" value="Generate" class="rounded-md flex-grow-0 flex-shrink-0 text-center bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                </div>

                <div class="sm:col-span-3" id="gen-count-field-container">
                    <label for="gen-count" class="block text-sm font-medium leading-6 text-gray-900"># of Images</label><div class="mt-2">
                        <select id="gen-count" name="gen-count" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                </div><div class="sm:col-span-3" id="denoising-steps-field-container">
                    <label for="denoising-steps" class="block text-sm font-medium leading-6 text-gray-900">Denoising Steps</label><div class="mt-2">
                        <input type="number" name="denoising-steps" id="denoising-steps" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
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
                <div class="sm:col-span-3" id="seed-field-container">
                    <div class="flex items-center">
                        <label for="seed" class="flex-grow block text-sm font-medium leading-6 text-gray-900">Seed</label>
                        <button><i class="fa-solid fa-dice" aria-hidden="true"></i></button>
                    </div>
                    <div class="mt-2">
                        <input type="number" name="seed" id="seed" min="-1" max="4294967295" value="-1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="col-span-full" id="igm2img-field-container">
                    <label for="img2imgurl" class="block text-sm font-medium leading-6 text-gray-900">Image2Image Url</label>
                    <div class="mt-2">
                        <input type="text" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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




        <!-- Right column area -->
        <div class="flex-1 xl:flex">
            <div class="bg-yellow-200 px-0 py-0 xl:flex-1">
                <div class="bg-gray-100">
                    <div id="collection-grid-container" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto">
                        <ul id="collection-grid" role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}