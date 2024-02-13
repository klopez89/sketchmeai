
addConsoleToDOM();
copyStaticSidebar();
changeActiveMenuPage();
updatePageTitle();

function addConsoleToDOM() {
	let console_html = consoleHtml();
	let console_div = $($.parseHTML(console_html));
  $('body').append(console_div);
}

function copyStaticSidebar() {
    var staticSidebar = document.getElementById('static-sidebar');
    var swapDiv = document.getElementById('swap-for-static-sidebar');
    var clonedSidebar = staticSidebar.cloneNode(true);
    swapDiv.innerHTML = clonedSidebar.innerHTML;
}

function changeActiveMenuPage() {
    var page = window.location.pathname.split('/')[2];
    console.log("page from url: ", page);
    var links = document.querySelectorAll('#static-sidebar #page-list a');
    var copiedLinks = document.querySelectorAll('#swap-for-static-sidebar #page-list a');
    var combinedLinks = [...links, ...copiedLinks];
    combinedLinks.forEach(function(link) {
        console.log("link: ", link.href);
        if (link.href.toLowerCase().includes(page.toLowerCase())) {
            link.classList.add('bg-gray-800', 'text-white');
        } else {
            link.classList.remove('bg-gray-800', 'text-white');
            link.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-800');
        }
    });
}

function updatePageTitle() {
    var urlParts = window.location.pathname.split('/');
    if (urlParts[1] === 'console') {
        var pageTitleDiv = document.getElementById('page-title');
        pageTitleDiv.innerHTML = urlParts[2].charAt(0).toUpperCase() + urlParts[2].slice(1);
    }
}

// Payment related functions

function userWantsToPay() {
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = `${CONSTANTS.BACKEND_URL}create-checkout-session?price-id=${CONSTANTS.BASE_BUNDLE_PRICE_ID}&unit-amount=20`;
    document.body.appendChild(form);
    form.submit();
 }

 function firstCreditOptionClicked() {
    var firstCreditOption = document.getElementById('first-credit-option');
    var secondCreditOption = document.getElementById('second-credit-option');
    var thirdCreditOption = document.getElementById('third-credit-option');
    handleCreditOptionClick(firstCreditOption, [secondCreditOption, thirdCreditOption]);
}

function secondCreditOptionClicked() {
    var firstCreditOption = document.getElementById('first-credit-option');
    var secondCreditOption = document.getElementById('second-credit-option');
    var thirdCreditOption = document.getElementById('third-credit-option');
    handleCreditOptionClick(secondCreditOption, [firstCreditOption, thirdCreditOption]);
}

function thirdCreditOptionClicked() {
    var firstCreditOption = document.getElementById('first-credit-option');
    var secondCreditOption = document.getElementById('second-credit-option');
    var thirdCreditOption = document.getElementById('third-credit-option');
    handleCreditOptionClick(thirdCreditOption, [firstCreditOption, secondCreditOption]);
}

 function handleCreditOptionClick(selectedOption, otherOptions) {
    var creditAmountInput = document.getElementById('credit-amount');

    selectedOption.classList.remove('bg-gray-500', 'hover:bg-gray-700');
    selectedOption.classList.add('bg-black');

    otherOptions.forEach(option => {
        option.classList.add('bg-gray-500', 'hover:bg-gray-700');
        option.classList.remove('bg-black');
    });

    creditAmountInput.value = selectedOption.value;
}

function showPaymentModal() {
    var paymentModal = document.getElementById('payment-modal');
    paymentModal.classList.remove('hidden', 'opacity-0');
    // Delay the addition of the 'opacity-100' class
    setTimeout(() => {
        paymentModal.classList.add('opacity-100');
    }, 50); // delay can be adjusted as needed
}

function dismissPaymentModal() {
    var paymentModal = document.getElementById('payment-modal');
    paymentModal.classList.remove('opacity-100');
    paymentModal.classList.add('opacity-0');
    // Add 'hidden' class back after transition finishes
    setTimeout(() => {
        paymentModal.classList.add('hidden');
    }, 500); // same duration as the transition
}

// window.onload = function() {
//     console.log("window.onload from console page")
//     addConsoleToDOM();
//     copyStaticSidebar();
//     changeActiveMenuPage();
//     updatePageTitle();
// }