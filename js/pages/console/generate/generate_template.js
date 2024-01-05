
function dummyGridHTML() {
    inputTitle = "Prompt";
    inputPlaceholder = "Enter text for the AI to continue";
    return `
    <!-- 3 column wrapper -->
    <div class="mx-auto w-full grow xl:flex">

        <div class="bg-red-200 shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 xl:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
        
            <form class="generate-form" id="generateForm" action="https://whollyai-5k3b37mzsa-ue.a.run.app/generate" method="get">

                <label for="prompt" class="prompt-field-label first">${inputTitle}</label>
                
                <span class="prompt-input-field" id="promptInput" name="prompt" data-name="prompt" role="textbox" contenteditable="" required="" placeholder="${inputPlaceholder}"></span>

                <input type="submit" class="prompt-submit-button shadow-style" id="promptSubmitButton" value="Generate" disabled="true">

                <input class="num-images shadow-style" type="number" id="numImagesInput" value="1">

                <div class="horizontal-divider" style="margin-top: 18px; margin-bottom: 18px;"></div>

                <label class="prompt-field-label second" for="negPrompt">Negative Prompt:</label>
                <input type="text" id="negPromptInput" class="negetive_prompt_input" placeholder="Enter words for the AI to not include">

                <label for="gscale" class="prompt-field-label">Guidance Scale:</label>
                <div style="display: flex;">
                <input type="number" id="gscale" min="1.0" max="20.0" step="0.1" value="19" oninput="updateSliderValueForGScale(this.value)" style="width: 60px; font-size: 1rem; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none; box-shadow: 0 2px 8px lightgrey; padding-left: 10px;">
                <div style="width: 10px;"></div>
                <input type="range" id="guidance_slider" min="1.0" max="20.0" step="0.1" value="19" oninput="updateGuidanceScale(this.value)" style="flex: 1; font-size: 1rem; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none;">
                </div>

                <label for="seed" class="prompt-field-label">Seed:</label>
                <input type="number" id="seed" min="0" max="4294967295" value="" style="font-size: 1rem; width: 100%; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none; box-shadow: 0 2px 8px lightgrey; padding-left: 10px;" placeholder="Random if empty. 0 to 4294967295">
                <div style="display: flex; align-items: center; margin-top: 5px;">
                <span class="fa fa-square checkmarkInput" id="checkboxForSameRandomSeed" aria-hidden="true"></span>
                <p style="margin-left: 10px; color: gray; font-size: 0.92rem;" class="checkboxTitle">Run all selected models with the same random seed</p>
                </div>

                <div style="width: 100%;">
                <label class="prompt-field-label">Model:</label>
                <select class="model-dropdown" id="modelDropdown" size="7" style="border: none; box-shadow: 0 2px 8px lightgrey; font-size: 1rem !important; width: 100%;" multiple="">
                    <option selected="" id="stb" instkey="" model="stability-ai/stable-diffusion" version="6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c">&nbsp;&nbsp;Stable Diffusion 2.1</option>
                    <option id="klo_10to5_drw" instkey="zxc" model="klopez89/klo_10to5_drw" version="ae00e4cb912db042646898586e27961b9aeb0705e8bff16b8c9773dadfa42389">&nbsp;&nbsp;Kevin, 10to5_Drawing</option>
                    <option id="jks_10to5_drw" instkey="zxc" model="klopez89/jks_10to5_drw" version="3db0c81fe691df5303011ec73360a216655d7fd081a473eda55de4048031a24d">&nbsp;&nbsp;James, 10to5_Drawing</option>
                    <option id="mags_10to5_drw" instkey="zxc" model="klopez89/mags_10to5_drw" version="f61f56370d4616ddb27c3895e55a3ced09f086e2c1a9ba7b1501ea9a869467ec">&nbsp;&nbsp;Mags, 10to5_Drawing</option>
                    <option id="alb_10to5_drw" instkey="zxc" model="klopez89/b75anpibtft2ra2ckhwbx6jrkug1_drw_model_2983197865" version="3387ce767f1ae4bfbecbf950f39cc93c81d9e15f03c8eca431b9530e3955ed85">&nbsp;&nbsp;Alb, 10to5_Drawing</option>
                    <option id="ben_10to5_drw" instkey="zxc" model="klopez89/ben_10to5_drw" version="89b7fe0c81e7c78568a7c1601a3715575d0ad09be22cf473c7b7fab04c552bd8">&nbsp;&nbsp;Ben, 10to5_Drawing</option>
                    <option id="jon_10to5_drw" instkey="zxc" model="klopez89/jon_10to5_drw" version="ada47df35bbea65b739f213dddc764096a418e07724c518189e7a873f1db2a03">&nbsp;&nbsp;Jon, 10to5_Drawing</option>
                    <option id="alb_10to5_drw_cropped" instkey="zxc" model="klopez89/alb_10to5_drw" version="663756c8e90a471837504178b4c720c767a438e32141052196cc3c9f258431bc">&nbsp;&nbsp;Alb Cropped, 10to5_Drawing</option>
                </select>
                </div>

                <div class="new-model-drop-area" id="newModelDropArea">
                <div style="pointer-events: none;">
                    <p id="dropAreaTitle">Drag or click to upload 10 images</p>
                    <i class="fa fa-images" aria-hidden="true"></i>
                </div>
                </div>
                <input id="localUploadInput" type="file" style="display:none;" multiple="">
                <div class="upload-entry-container" id="uploadEntryContainer"></div>

            </form>
        
        <!-- Right column area -->
        </div><div class="flex-1 xl:flex">
        <div class="bg-yellow-200 px-0 py-6 sm:px-6 xl:flex-1">
            <div class="bg-gray-100">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            
                <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_4985.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_4985.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">3.9 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_5214.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_5214.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">4 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1614705827065-62c3dc488f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_3851.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_3851.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">3.8 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_4278.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_4278.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">4.1 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_6842.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_6842.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">4 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_3284.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_3284.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">3.9 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_4841.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_4841.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">3.8 MB</p>
                    </li>
                    <li class="relative">
                        <div class="group aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src="https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80" alt="" class="pointer-events-none object-cover group-hover:opacity-75">
                        <button type="button" class="absolute inset-0 focus:outline-none">
                            <span class="sr-only">View details for IMG_5644.HEIC</span>
                        </button>
                        </div>
                        <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_5644.HEIC</p>
                        <p class="pointer-events-none block text-sm font-medium text-gray-500">4 MB</p>
                    </li>
                    
                </ul>
            </div>
        </div><!-- Main area -->
        </div>
        </div>
        
    </div>
    `;
}