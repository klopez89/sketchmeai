function consoleHtml() {

	return `
    <div x-data="{ open: false }" @keydown.window.escape="open = false">
        <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
        <div x-show="open" class="relative z-50 lg:hidden" x-description="Off-canvas menu for mobile, show/hide based on off-canvas menu state." x-ref="dialog" aria-modal="true">
        <!-- Off-canvas menu backdrop, show/hide based on off-canvas menu state. -->
        <div x-show="open" x-transition:enter="transition-opacity ease-linear duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-linear duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-900/80" x-description="Off-canvas menu backdrop, show/hide based on off-canvas menu state."></div>
    
            <div class="fixed inset-0 flex">
                <!-- Off-canvas menu, show/hide based on off-canvas menu state. -->
                <div x-show="open" x-transition:enter="transition ease-in-out duration-300 transform" x-transition:enter-start="-translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in-out duration-300 transform" x-transition:leave-start="translate-x-0" x-transition:leave-end="-translate-x-full" x-description="Off-canvas menu, show/hide based on off-canvas menu state." class="relative mr-16 flex w-full max-w-52 flex-1" @click.away="open = false">
                
                <!-- Close button, show/hide based on off-canvas menu state. -->
                <div x-show="open" x-transition:enter="ease-in-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in-out duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" x-description="Close button, show/hide based on off-canvas menu state." class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="open = false">
                    <span class="sr-only">Close sidebar</span>
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    </button>
                </div>
        
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div id="swap-for-static-sidebar" class="fixed inset-y-0 flex w-48 flex-col"></div>

            </div>
        </div>
        </div>
    
        <!-- Static sidebar for desktop -->
        <div id="static-sidebar" class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-48 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center cursor-pointer" onclick="navigationToHomePage()">
                <img class="h-8 w-auto" src="https://storage.googleapis.com/sketchmeai-public/branding/white_sketchmeai_logo.png" alt="Your Company">
                </div>
                <nav class="flex flex-1 flex-col">
                <ul id="page-list" role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                    <ul role="list" class="-mx-2 space-y-1">
                        <li>
                            <a href="/console/generate" class="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-solid fa-bolt-lightning self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Generate&nbsp;
                            </a>
                        </li>
                        <li>
                            <a href="/console/models" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-solid fa-layer-group self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Models&nbsp;
                            </a>
                        </li>
                        <li class="hidden">
                            <a href="/console/collections" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-regular fa-images self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Collections&nbsp;
                            </a>
                        </li>
                        
                        
                        
                    </ul>
                    </li>
                    
                    <li class="mt-auto hidden">
                        <a href="/console/settings" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                            <svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Settings
                        </a>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    
        <div class="lg:pl-48 h-screen flex flex-col">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="open = true">
            <span class="sr-only">Open sidebar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
            </button>
    
            <!-- Separator -->
            <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>
    
            <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                <div id="page-title" class="relative flex flex-0 self-center text-xl font-bold">Generate</div>
                <button id="basic-examples-button" onclick="navigateToBasicPromptExamples()" class="hidden cursor-pointer border-2 border-black rounded-md flex-grow-0 flex-shrink-0 text-center px-8 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">See Prompt Examples</button>                
                
                <div class="ml-auto flex items-center gap-x-4 lg:gap-x-6">
                    <button id="show-payment-button" onclick="showPaymentModal()" class="rounded-md text-xs text-gray-400 hover:bg-gray-100 px-4 py-4 my-2 relative flex items-center justify-center">
                        <span id="credit-balance-label" class="inset-0 flex items-center justify-center text-transparent">Credit: $0.00</span>
                        <i id="balance-spinner" class="fas fa-spinner fa-spin absolute m-auto" aria-hidden="true"></i>
                    </button>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">
                        <!-- Separator -->
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>
            
                        <!-- Profile dropdown -->
                        <div x-data="Components.menu({ open: false })" x-init="init()" @keydown.escape.stop="open = false; focusButton()" @click.away="onClickAway($event)" class="relative">
                            <button type="button" class="-m-1.5 flex items-center p-1.5" id="user-menu-button" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="true" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
                                <span class="sr-only">Open user menu</span>
                                <div id="user-avatar-circle" class="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black rounded-full text-sm font-medium text-white">A</div>
                                <span class="hidden lg:flex lg:items-center">
                                <span id="display-name-label" class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Tom Cook</span>
                                <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </button>
                
                            <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()" @keydown.tab="open = false" @keydown.enter.prevent="open = false; focusButton()" @keyup.space.prevent="open = false; focusButton()">
                                <a class="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); signOutButtonPressed()">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div id="console-group" x-data="{ open: false }" :class="{ 'overflow-hidden': open }" class="relative h-screen overflow-auto">


            <main id="console-container" class="py-0 flex-grow overflow-auto relative">

                <div id="console-content" class="h-full relative">

                <!-- Your content -->
        
                    <button class="fixed right-0 bottom-0 m-4 bg-blue-500 text-white rounded-full z-30 w-12 h-12 flex items-center justify-center" @click="open = !open">
                        <i class="fa-solid fa-wrench"></i>
                    </button>

                    <div id="payment-modal" class="hidden absolute bg-black bg-opacity-90 h-full w-full z-10 flex flex-col justify-center transition duration-500 opacity-0">
                
                        <div class="max-w-2xl mx-auto bg-white p-7 rounded-lg shadow-lg w-full relative">
                            <button class="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700" onclick="dismissPaymentModal()">
                                <i class="fas fa-times" aria-hidden="true"></i>
                            </button>
                            <div class="mb-4">
                                <h2 class="text-3xl text-gray-900 mb-2">Balance: 
                                    <span id="modal-credit-balance-label" class="">$0.00</span>
                                    <span id="insufficient-credit-label" class="hidden italic text-red-500 text-xs">Insufficient credit.</span>
                                </h2>
                                <p class="mb-0 text-gray-400">~ $3.00 to $6.00 / trained model (for 10 vs 20 images)</p>
                                <p class="mb-1 text-gray-400">~ $0.04 / image ($0.11 from a cold boot)</p>
                                <p class="mb-8 text-gray-400 text-xs italic">cost will vary based on model and parameters</p>
                            </div>

                            <hr class="border-t border-gray-200 my-6">

                            <div class="mb-1">
                                <h3 class="text-lg font-semibold mb-2">Add Credit</h3>
                                <div class="flex space-x-2">
                                    <button class="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded shadow" id="first-credit-option" value="5" onclick="firstCreditOptionClicked()">$5</button>
                                    <button class="bg-black text-white px-6 py-2 rounded shadow" id="second-credit-option" value="10" onclick="secondCreditOptionClicked()">$10</button>
                                    <button class="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded shadow" id="third-credit-option" value="20" onclick="thirdCreditOptionClicked()">$20</button>
                                </div>
                                <div class="mb-4 mt-1 text-xs text-gray-800">Minimum</div>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <span class="text-gray-400">$</span>
                                    </span>
                                    <input id="credit-amount" type="number" min="1" step="1" placeholder="" class="w-[14.7em] border-1 border-gray-400 focus:border-black focus:ring-0 rounded-lg px-5 py-2" value="10">
                                    <button id="pay-button" class="bg-black text-white font-semibold px-8 py-[0.6em] rounded shadow ml-2" onclick="userWantsToPay()">Pay</button>
                                </div>
                            </div>

                            <div class="flex space-x-2">
                                <p class="flex-1 text-left py-0 rounded text-xs text-gray-400">Powered by Stripe</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    
        </div>
    </div>
    `;
}

function errorBannerHTML(message) {
    return `
    <div class="rounded-md bg-red-50 p-4" id="errorBanner">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-red-800">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function warningBannerHTML(message) {
    return `
    <div class="rounded-md bg-orange-50 p-4" id="warningBanner">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-orange-800">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button type="button" class="inline-flex rounded-md bg-orange-50 p-1.5 text-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-orange-50">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function successBannerHTML(message) {
    return `
    <div class="rounded-md bg-green-50 p-4" id="successBanners">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-green-800">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button type="button" class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-orange-50">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}
    
function mobileSideBar() {
    return `
            <div id="mobile-sidebar" x-ref="genSettings" x-show="open" x-transition:enter="transition ease-in-out duration-300 transform" x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in-out duration-300 transform" x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full" class="absolute top-0 right-0 h-full overflow-auto z-50 flex lg:hidden">
                
                <div class="relative w-full max-w-full flex-grow flex-1">
                    
                    <!-- Sidebar content -->
                    <div class="h-full overflow-y-auto scrolling-touch bg-gray-100">
                        
                        <form class="generate-form h-full overflow-y-auto flex flex-col px-6 py-4 bg-white" id="generateForm">

                            <p class="text-xl font-bold mb-4">Generation Settings</p><div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                <div class="col-span-full" id="prompt-field-container">
                                    <div class="flex justify-between items-center">
                                        <label for="prompt" class="block text-sm font-medium leading-6 text-gray-900">Prompt</label>
                                        <button onclick="basicPromptExampleButtonPressed(event)" class="underline text-sm text-gray-700 hover:text-gray-900">Examples</button>
                                    </div>
                                    <div class="mt-2">
                                        <div id="prompt" name="prompt" rows="3" class="max-w-full overflow-y-auto bg-white whitespace-normal editable break-words outline-none px-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 text-gray-400" style="margin-top: 0px; margin-bottom: 0px; height: 110px;" contenteditable="true">Drawing of cute dalmation puppy in the backyard, highly detailed</div>
                                    </div>
                                </div>

                                
                            </div>

                            <p class="text-xs text-gray-400 italic mt-1 ml-1" id="generation-estimate-label">Estimated cost: $0.01<br>@ 20 denoising steps</p>

                            <div class="px-0 pt-4 pb-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6" id="model-selection-section">

                                <div class="col-span-full" id="models-field-container">
                                    <label for="models" class="block text-sm font-medium leading-6 text-gray-900">Models</label>
                                    <div class="mt-2">
                                        <select id="model-dropdown" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" size="6" multiple="">
                                            <option selected="" id="sdxl" instkey="zxc" modelname="sdxl" model="stability-ai/sdxl" version="39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b">&nbsp;&nbsp;Stable Diffusion SDXL</option>
                                        
                                            <option id="ig74e3qCnsO7jdm1S4RR" instkey="zxc" model="klopez-sketchmeai/custom_sdxl" version="49665c30531a4f943bd8cbe41e887a1cb040486174de0ce110ef8c154c4e1f07" modelname="Kevo" trainingsubject="person" gendertype="man" style="">&nbsp;&nbsp;Kevo</option>

                                            <option id="38THE5fx8PW4IU3BNwnt" instkey="zxc" model="klopez-sketchmeai/custom_sdxl" version="b0076df8b530cf51c91aa68f286a0e598a9f3fb3ffa2d86c4318ce686029cbcf" modelname="Kevin" trainingsubject="person" gendertype="man" style="">&nbsp;&nbsp;Kevin</option>
                                        
                                            <option id="ig74e3qCnsO7jdm1S4RR" instkey="zxc" model="klopez-sketchmeai/custom_sdxl" version="49665c30531a4f943bd8cbe41e887a1cb040486174de0ce110ef8c154c4e1f07" modelname="Kevo" trainingsubject="person" gendertype="man" style="">&nbsp;&nbsp;Kevo</option>
            
                                            <option id="38THE5fx8PW4IU3BNwnt" instkey="zxc" model="klopez-sketchmeai/custom_sdxl" version="b0076df8b530cf51c91aa68f286a0e598a9f3fb3ffa2d86c4318ce686029cbcf" modelname="Kevin" trainingsubject="person" gendertype="man" style="">&nbsp;&nbsp;Kevin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div id="accordionExample5">
                                <div class="rounded-t-lg bg-transparent">
                                    <h2 class="mb-4 mr-1" id="headingOne5">
                                            <button class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-transparent text-right text-sm underline text-gray-700 hover:text-gray-900 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-400" type="button" data-te-collapse-init="" data-te-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5">
                                                <span class="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:text-gray-900 motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                                </span>
                                                Show Prompt Settings
                                            </button>
                                    </h2>
                                    <div id="collapseOne5" class="!visible" aria-labelledby="headingOne5" style="" data-te-collapse-item="" data-te-collapse-show="">
                                        <div class="px-0 py-4 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-6">
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
                                                <label for="denoising-steps" class="text-sm font-medium leading-6 text-gray-900">Denoising Steps</label>
                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Denoising Steps" data-te-content="Each step reduces the noise a bit more, adding detail and coherence to the image. The more denoising steps, the more detailed and polished the image can become, but it also takes more time to generate; directly affecting generation cost. There is a drop off where more steps do not result in more details." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                </button>
                                                <div class="mt-2">
                                                    <input type="number" name="denoising-steps" id="denoising-steps" placeholder="20" min="1" max="500" value="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                                    <p class="text-right text-xs text-gray-400 mt-1 ml-1">1 - 100</p>
                                                </div>
                                            </div>

                                            <div class="col-span-full" id="neg-prompt-field-container">
                                                <label for="neg-prompt" class="text-sm font-medium leading-6 text-gray-900">Negative Prompt</label>
                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Negative Prompt" data-te-content="The negative prompt in image generation acts as a guide for what the model should avoid including in the output image. It helps in steering the generation away from undesired elements or themes by explicitly stating what you do not want to appear in the final result." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                </button>
                                                <div class="mt-2">
                                                <textarea id="neg-prompt" name="neg-prompt" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" style="margin-top: 0px; margin-bottom: 0px; height: 80px;">ugly, morbid, photorealistic</textarea>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-3" id="gs-field-container">
                                                <label for="guidance-scale" class="text-sm font-medium leading-6 text-gray-900">Guidance Scale</label>
                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Guidance Scale" data-te-content="Also know as 'classifier free guidance' or cfg. Guidance scale controls how closely the generation should adhere to the input prompt. A higher value enforces greater fidelity to the prompt, potentially leading to more accurate but less varied results, while a lower value allows for more creative interpretations." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                </button>
                                                <div class="mt-2">
                                                <input type="number" name="guidance-scale" id="guidance-scale" placeholder="13" min="1.0" max="20.0" step="0.1" value="13" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                                <p class="text-right text-xs text-gray-400 mt-1 ml-1">1.0 - 20.0</p>
                                                </div>
                                            </div>
                                            <div class="sm:col-span-3" id="seed-field-container">
                                                <div class="flex items-center">
                                                    <label for="seed" class="flex-grow block text-sm font-medium leading-6 text-gray-900">Seed</label>
                                                    <button onclick="randomizeSeed(event)" title="Random seed">
                                                        <i class="fa-solid fa-dice-three text-gray-500" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                                <div class="mt-2">
                                                    <input type="number" name="seed" id="seed" min="-1" max="4294967295" value="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" placeholder="Random">
                                                    <p class="text-right text-xs text-gray-400 mt-1 ml-1">0 - 4294967295</p>
                                                </div>
                                            </div>


                                            <div class="sm:col-span-3" id="lora-field-container">
                                                <label for="lora-scale" class="text-sm font-medium leading-6 text-gray-900">Lora Scale</label>
                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Lora Scale" data-te-content="Adjusts the extent to which a fine-tuned model's specialized training influences the generated image, blending the base model's knowledge with the fine-tuned nuances." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                </button>
                                                <div class="mt-2">
                                                    <input type="number" name="lora-scale" id="lora-scale" placeholder="0.8" min="0.0" max="1.0" step="0.01" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" value="0.8">
                                                    <p class="text-right text-xs text-gray-400 mt-1 ml-1">0.00 - 1.00</p>
                                                </div>
                                            </div>


                                            <div class="col-span-full">
                                                <!-- Start of the new nested accordion for img-2img-url and prompt-strength fields -->
                                                <div id="nestedAccordion">
                                                    <h2 id="nestedHeading">
                                                        <button class="group relative underline flex items-center rounded-t-[15px] border-0 bg-transparent pt-2 text-right text-sm text-gray-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&amp;:not([data-te-collapse-collapsed])]:bg-transparent [&amp;:not([data-te-collapse-collapsed])]:text-gray-400" type="button" data-te-collapse-init="" data-te-collapse-toggle="" data-te-target="#nestedImg2ImgCollapse" aria-expanded="true" aria-controls="nestedCollapse">Show Image To Image fields

                                                            <span class="ml-2 mt-0 h-4 w-4 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                                                </svg>
                                                            </span>

                                                        </button>
                                                    </h2>
                                                    <div id="nestedImg2ImgCollapse" class="accordion-collapse collapse !visible" aria-labelledby="nestedHeading" data-te-collapse-item="" data-te-collapse-show="" style="">
                                                        <div class="accordion-body px-0 pb-4 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-6">
                                                            <!-- img-2img-url field -->
                                                            <div class="col-span-full" id="igm2img-field-container">
                                                                <label for="img2imgurl" class="text-sm font-medium leading-6 text-gray-900">Image to Image URL</label>
                                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Image to Image URL" data-te-content="Provides a starting image that the model will use as a base to apply the transformations specified by your prompt. A way to direct the AI to modify or build upon an existing image rather than creating one from scratch." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                                </button>
                                                                <div class="mt-2">
                                                                    <input type="text" name="img-2-img-url" id="img-2-img" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <!-- prompt-strength field -->
                                                            <div class="sm:col-span-3" id="ps-field-container">
                                                                <label for="prompt-strength" class="text-sm font-medium leading-6 text-gray-900">Prompt Strength</label>
                                                                <button onclick="event.preventDefault()" data-te-trigger="focus" data-te-toggle="popover" data-te-title="Prompt Strength" data-te-content="Only applicable for image to image generation. A higher value makes the final image adhere more closely to the details of the prompt, while a lower value retains more of the reference image's features." class="ml-2 text-gray-300" data-te-original-title="" title="">
                                                                    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                                                                </button>
                                                                <div class="mt-2">
                                                                    <input type="number" name="prompt-strength" id="prompt-strength" placeholder="0.8" min="0.0" max="1.0" step="0.1" value="0.8" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                                                                    <p class="text-right text-xs text-gray-400 mt-1 ml-1">0.0 - 1.0</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End of the new nested accordion -->
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-grow"></div>
                        </form>
                        <div class="w-full flex justify-start sticky bottom-0 bg-white p-2 gap-4 border-t border-gray-200" id="gen-button-container">
                            <button id="back-to-models-button" class="pl-3 text-gray-400 hover:text-gray-600 flex-shrink-0" @click="open = !open">
                                <i class="fa-solid fa-arrow-left mr-2" aria-hidden="true"></i>
                                Back
                            </button>               
                            <input type="submit" value="Generate" class="cursor-pointer rounded-md flex-grow text-center bg-black px-3.5 py-2.5 text-lg text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ml-2">
                        </div>
                    </div>
                </div>
            </div>
    `;
}