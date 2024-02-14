
addConsoleToDOM();
copyStaticSidebar();
changeActiveMenuPage();
updatePageTitle();
configurePayButton();
handleRecentPaymentRedirect();

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


function handleRecentPaymentRedirect() {
    var url = window.location.href;
    var urlObj = new URL(url);
    var params = new URLSearchParams(urlObj.search);
    let didCompletePayment = params.get('didCompletePayment');
    let productName = params.get('productName');
    let quantity = params.get('quantity');
    let unitAmount = params.get('unitAmount');
    console.log('didCompletePayment: ', didCompletePayment, ', productName: ', productName, ', quantity: ', quantity, ', unitAmount: ', unitAmount);
    if (didCompletePayment === 'true' && productName && quantity && unitAmount) {
        console.log('Payment completed for: ', productName, ' with quantity: ', quantity, ' and unit amount: ', unitAmount);
        var showPaymentButton = document.getElementById('show-payment-button');
        showPaymentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        saveSuccessfulCreditPurchase(productName, quantity, unitAmount);
    }
}

function saveSuccessfulCreditPurchase(productName, quantity, unitAmount) {
    let userRecId = getUserRecId();
    let url = `${CONSTANTS.BACKEND_URL}purchase/credits/save`;
    let data = {
        "user_rec_id": userRecId,
        "product_name": productName,
        "quantity": quantity,
        "unit_amount": unitAmount
    };

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        success: function(response) {
            let new_credit_balance = response.new_credit_balance;
            let showPaymentButton = document.getElementById('show-payment-button');
            showPaymentButton.innerHTML = `Credit: $${new_credit_balance}`;
            console.log('Response from purchase/credits/save endpoint: ', response);
        },
        error: function(error) {
            console.error('Error from saveSuccessfulCreditPurchase endpoint call: ', error);
        }
    });
}

function stylePayButtonWith(value) {
    let payButton = document.getElementById('pay-button');
    console.log('int value: ', parseInt(value));
    const hasDecimals = parseFloat(value) % 1 != 0;

    if (parseInt(value) < 1 || isNaN(parseInt(value)) || hasDecimals) {
        payButton.setAttribute('disabled', true);
        payButton.classList.remove('bg-black');
        payButton.classList.add('bg-gray-500');
    } else {
        payButton.removeAttribute('disabled');
        payButton.classList.remove('bg-gray-500');
        payButton.classList.add('bg-black');
    }
}

function configurePayButton() {
    let creditAmountInput = document.getElementById('credit-amount');
    creditAmountInput.addEventListener('input', function() {
        console.log('Credit amount changed to: ', this.value);
        var firstCreditOption = document.getElementById('first-credit-option');
        var secondCreditOption = document.getElementById('second-credit-option');
        var thirdCreditOption = document.getElementById('third-credit-option');

        stylePayButtonWith(this.value);

        if (this.value === firstCreditOption.value) {
            handleCreditOptionClick(firstCreditOption, [secondCreditOption, thirdCreditOption]);
        } else if (this.value === secondCreditOption.value) {
            handleCreditOptionClick(secondCreditOption, [firstCreditOption, thirdCreditOption]);
        } else if (this.value === thirdCreditOption.value) {
            handleCreditOptionClick(thirdCreditOption, [firstCreditOption, secondCreditOption]);
        } else {
            handleCreditOptionClick(null, [firstCreditOption, secondCreditOption, thirdCreditOption]);
        }
    });
}

function userWantsToPay() {
    let creditAmount = document.getElementById('credit-amount').value;
    let sourcePageUrl = window.location.href.split('?')[0];
    let form = document.createElement('form');
    let endpoint = "stripe_checkout_session/credits/new";
    form.method = 'POST';
    form.action = `${CONSTANTS.BACKEND_URL}${endpoint}?source-page-url=${sourcePageUrl}&unit-amount=${creditAmount}`;
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
    if (selectedOption) {
        selectedOption.classList.remove('bg-gray-500', 'hover:bg-gray-700');
        selectedOption.classList.add('bg-black');

        var creditAmountInput = document.getElementById('credit-amount');
        creditAmountInput.value = selectedOption.value;
        stylePayButtonWith(selectedOption.value);
    }

    otherOptions.forEach(option => {
        option.classList.add('bg-gray-500', 'hover:bg-gray-700');
        if (selectedOption) {
            option.classList.remove('bg-black');
        }
    });
}

function showPaymentModal() {
    var paymentModal = document.getElementById('payment-modal');
    paymentModal.classList.remove('hidden');
    // Double requestAnimationFrame for browser to have time for a reflow
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            paymentModal.classList.remove('opacity-0');
            paymentModal.classList.add('opacity-100');
        });
    });
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