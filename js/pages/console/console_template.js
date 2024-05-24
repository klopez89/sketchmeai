function consoleHtml() {

	return `
    <div x-data="{ open: false }" @keydown.window.escape="open = false" class="h-full">
        <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
        <div x-show="open" class="relative z-50 lg:hidden" x-description="Off-canvas menu for mobile, show/hide based on off-canvas menu state." x-ref="dialog" aria-modal="true">
        <!-- Off-canvas menu backdrop, show/hide based on off-canvas menu state. -->
        <div x-show="open" x-transition:enter="transition-opacity ease-linear duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-linear duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-900/80" x-description="Off-canvas menu backdrop, show/hide based on off-canvas menu state." style="display: none;"></div>
    
            <div class="fixed inset-0 flex">
                <!-- Off-canvas menu, show/hide based on off-canvas menu state. -->
                <div x-show="open" x-transition:enter="transition ease-in-out duration-300 transform" x-transition:enter-start="-translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in-out duration-300 transform" x-transition:leave-start="translate-x-0" x-transition:leave-end="-translate-x-full" x-description="Off-canvas menu, show/hide based on off-canvas menu state." class="relative mr-16 flex w-full max-w-52 flex-1" @click.away="open = false" style="display: none;">
                
                <!-- Close button, show/hide based on off-canvas menu state. -->
                <div x-show="open" x-transition:enter="ease-in-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in-out duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" x-description="Close button, show/hide based on off-canvas menu state." class="absolute left-full top-0 flex w-16 justify-center pt-5" style="display: none;">
                    <button type="button" class="-m-2.5 p-2.5" @click="open = false">
                    <span class="sr-only">Close sidebar</span>
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    </button>
                </div>
        
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div id="swap-for-static-sidebar" class="fixed inset-y-0 flex w-48 md:w-60 lg:w-48 flex-col"></div>

            </div>
        </div>
        </div>
    
        <!-- Static sidebar for desktop -->
        <div id="static-sidebar" class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-48 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4 pt-16 md:pt-24 lg:pt-16">
                <div class="flex h-16 shrink-0 items-center cursor-pointer" onclick="navigationToHomePage()">
                <img class="h-8 md:h-14 lg:h-8 w-auto" src="https://storage.googleapis.com/sketchmeai-public/branding/white_sketchmeai_logo.png" alt="Your Company">
                </div>
                <nav class="flex flex-1 flex-col">
                <ul id="page-list" role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                    <ul role="list" class="-mx-2 space-y-1">
                        <li>
                            <a href="/console/generate" class="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm md:text-2xl lg:text-sm leading-6 font-semibold">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-solid fa-bolt-lightning self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Generate&nbsp;
                            </a>
                        </li>
                        <li>
                            <a href="/console/models" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm md:text-2xl lg:text-sm leading-6 font-semibold">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-solid fa-layer-group self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Models&nbsp;
                            </a>
                        </li>
                        <li>
                            <a href="/blog" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm md:text-2xl lg:text-sm leading-6 font-semibold" target="_blank">
                                <div class="h-6 w-6 flex items-stretch justify-center" viewbox="0 0 24 24" aria-hidden="true">
                                    <i class="fa-solid fa-file-lines self-center text-lg" aria-hidden="true"></i>
                                </div>
                                Blog&nbsp;
                            </a>
                        </li>
                        <li class="hidden">
                            <a href="/console/collections" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm md:text-2xl lg:text-sm leading-6 font-semibold">
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
    
        <div class="lg:pl-48 h-full flex flex-col relative">
        <div class="fixed top-0 z-[80] flex w-full h-16 md:h-24 lg:h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white shadow-sm sm:gap-x-6 pl-6 pr-4 lg:pr-52">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="open = true">
            <span class="sr-only">Open sidebar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
            </button>
    
            <!-- Separator -->
            <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>
    
            <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                <div id="page-title" class="relative flex flex-0 self-center text-xl md:text-3xl lg:text-xl font-bold">Generate</div>
                <button id="basic-examples-button" onclick="navigateToBasicPromptExamples()" class="hidden cursor-pointer border-2 border-black rounded-md flex-grow-0 flex-shrink-0 text-center px-8 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">See Prompt Examples</button>                
                
                <div class="ml-auto flex items-center gap-x-4 lg:gap-x-6">
                    <button id="show-payment-button" onclick="showPaymentModal()" class="rounded-md text-xs md:text-xl lg:text-xs text-gray-400 hover:bg-gray-100 px-4 md:px-5 lg:px-4 py-4 md:py-5 lg:py-4 my-2 relative flex items-center justify-center">
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
                                <div id="user-avatar-circle" class="flex h-8 w-8 md:h-14 md:w-14 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center bg-black rounded-full text-sm md:text-xl lg:text-sm font-medium text-white">A</div>
                                <span class="hidden lg:flex lg:items-center">
                                <span id="display-name-label" class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Tom Cook</span>
                                <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </button>
                
                            <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" x-ref="menu-items" x-description="Dropdown menu, show/hide based on menu state." x-bind:aria-activedescendant="activeDescendant" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()" @keydown.tab="open = false" @keydown.enter.prevent="open = false; focusButton()" @keyup.space.prevent="open = false; focusButton()" style="display: none;">
                                <a class="block px-3 py-1 text-sm md:text-xl lg:text-sm leading-6 text-gray-900 cursor-pointer" :class="{ 'bg-gray-50': activeIndex === 1 }" role="menuitem" tabindex="-1" id="user-menu-item-1" @mouseenter="onMouseEnter($event)" @mousemove="onMouseMove($event, 1)" @mouseleave="onMouseLeave($event)" @click="open = false; focusButton(); signOutButtonPressed()">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div id="console-group" x-data="{ open: false }" :class="{ 'overflow-hidden': open }" class="relative h-full overflow-auto mt-16 md:mt-24 lg:mt-16">


            <main id="console-container" class="py-0 flex-grow overflow-auto h-full relative">

                <div id="console-content" class="h-full relative">

                <!-- Your content -->

                    <div id="mobile-gen-menu-bg" class="absolute bg-black bg-opacity-80 h-full w-full z-[29] px-4 flex flex-col justify-center transition duration-300 opacity-0 hidden" onclick="tappedMobileBottomMenuBg(event)"></div>

                    <div id="payment-modal" class="hidden absolute bg-black bg-opacity-90 h-full w-full z-[100] px-4 flex flex-col justify-center transition duration-500 opacity-0">
                
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
                                    <input id="credit-amount" type="number" min="1" step="1" placeholder="" class="border-1 border-gray-400 focus:border-black focus:ring-0 rounded-lg px-5 py-2" value="10">
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





function warningNotification(messageTitle, messageBody) {
    return `
    <div aria-live="assertive" class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 shadow-lg">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                <div class="p-4">
                    <div class="flex items-start">

                        <div class="flex-shrink-0">
                            <svg class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">${messageTitle}</p>
                            <p class="mt-1 text-sm text-gray-500">${messageBody}</p>
                        </div>
                        <div class="ml-4 flex flex-shrink-0">
                            <button id="notif-close-button" type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span class="sr-only">Close</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}


function mobileSideBarHTML() {
    return `
            <div id="mobile-sidebar" x-show="open" x-transition:enter="transition-opacity ease-linear duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-linear duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed bg-gray-800 bg-opacity-50 top-0 right-0 w-full h-full overflow-auto z-50 flex lg:hidden" style="display: none;">
                
                <div class="relative md:pl-24 w-full ml-auto flex-grow flex-1" x-show="open" x-transition:enter=" transition ease-in-out duration-300 transform" x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in-out duration-300 transform" x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full" style="display: none;">
                    
                    <!-- Sidebar content -->
                    <div id="sidebar-gen-form-container" class="h-full pt-16 md:pt-20 overflow-y-auto scrolling-touch bg-gray-100 flex flex-col justify-between">
                        
                        <div class="w-full flex justify-start sticky bottom-0 bg-white p-2 gap-4 border-t border-gray-200" id="gen-button-container">
                            <button id="back-to-models-button" class="pl-3 text-gray-400 hover:text-gray-600 flex-shrink-0 md:text-2xl" @click="open = !open">
                                <i class="fa-solid fa-arrow-left mr-2" aria-hidden="true"></i>
                                Back
                            </button>               

                            <button class="cursor-pointer rounded-md flex flex-grow justify-center items-center text-center bg-black px-3.5 md:px-7 lg:px-3.5 py-2.5 md:py-5 lg:py-2.5 text-lg md:text-3xl lg:text-lg text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onclick="generateButtonPressed(event)">

                                <p id="mobile-sidebar-gen-button-label" class="flex items-center">Generate</p>
                                <i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
    `;
}

