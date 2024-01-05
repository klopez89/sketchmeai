
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

    <form>
        <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                    <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith">
                </div>
                </div>
            </div>

            <div class="col-span-full">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About</label>
                <div class="mt-2">
                <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 138px;"></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div class="col-span-full">
                <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div class="mt-2 flex items-center gap-x-3">
                <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                </svg>
                <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                </div>
            </div>

            <div class="col-span-full">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd"></path>
                    </svg>
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <div class="mt-2">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                <div class="mt-2">
                <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                </select>
                </div>
            </div>

            <div class="col-span-full">
                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                <div class="mt-2">
                <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
                <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                <div class="mt-2">
                <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-2">
                <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                <div class="mt-2">
                <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="sm:col-span-2">
                <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                <div class="mt-2">
                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

            <div class="mt-10 space-y-10">
            <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div class="mt-6 space-y-6">
                <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                    <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                    <div class="text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-900">Comments</label>
                    <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                </div>
                <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                    <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                    <div class="text-sm leading-6">
                    <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                    <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                </div>
                <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                    <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                    <div class="text-sm leading-6">
                    <label for="offers" class="font-medium text-gray-900">Offers</label>
                    <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                </div>
                </div>
            </fieldset>
            <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                <div class="mt-6 space-y-6">
                <div class="flex items-center gap-x-3">
                    <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">Everything</label>
                </div>
                <div class="flex items-center gap-x-3">
                    <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
                </div>
                <div class="flex items-center gap-x-3">
                    <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
                </div>
                </div>
            </fieldset>
            </div>
        </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>

    `;
}