
addConsoleToDOM();
copyStaticSidebar();
changeActiveMenuPage();
updatePageTitle();
configurePayButton();
startListeningForCreditUpdates();
configureUserRelatedUI();

setTimeout(handleRecentPaymentRedirect, 200);

function addConsoleToDOM() {
	let console_html = consoleHtml();
	let console_div = $($.parseHTML(console_html));
  $('body').append(console_div);
}

function configureUserRelatedUI() {
    let displayNameDiv = document.getElementById('display-name-label');
    displayNameDiv.innerHTML = getDisplayName();
    let userAvatarCircleDiv = document.getElementById('user-avatar-circle');
    userAvatarCircleDiv.innerHTML = getDisplayName().charAt(0);
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

function displayErrorBanner(errorMessage) {
    let consoleContent = document.getElementById('console-content');
    let errorBannerHtml = errorBannerHTML(errorMessage);
    let errorBannerDiv = document.createElement('div');
    errorBannerDiv.innerHTML = errorBannerHtml;
    consoleContent.insertBefore(errorBannerDiv, consoleContent.firstChild);

    console.log('button div: ', errorBannerDiv.querySelector('button'));
    errorBannerDiv.querySelector('button').onclick = function() {
        errorBannerDiv.remove();
    };
}

function displayWarningBanner(warningMessage) {
    let consoleContainer = document.getElementById('console-container');
    let warningBannerHtml = warningBannerHTML(warningMessage);
    let warningBannerDiv = document.createElement('div');
    warningBannerDiv.classList.add('absolute', 'z-10', 'w-full', 'bottom-0');
    warningBannerDiv.innerHTML = warningBannerHtml;
    consoleContainer.insertBefore(warningBannerDiv, consoleContainer.firstChild);

    console.log('button div: ', warningBannerDiv.querySelector('button'));
    warningBannerDiv.querySelector('button').onclick = function() {
        warningBannerDiv.remove();
    };
}

function removeErrorBanners() {
    const errorBanners = document.querySelectorAll('#errorBanner');
    errorBanners.forEach(function(banner) {
        banner.remove();
    });
}

function removeWarningBanners() {
    const warningBanners = document.querySelectorAll('#warningBanner');
    warningBanners.forEach(function(banner) {
        banner.remove();
    });
}


function displaySuccessBanner(successMessage) {
    let consoleContent = document.getElementById('console-content');
    let successBannerHtml = successBannerHTML(successMessage);
    let successBannerDiv = document.createElement('div');
    successBannerDiv.innerHTML = successBannerHtml;
    consoleContent.insertBefore(successBannerDiv, consoleContent.firstChild);

    console.log('button div: ', successBannerDiv.querySelector('button'));
    successBannerDiv.querySelector('button').onclick = function() {
        successBannerDiv.remove();
    };
}

function removeSuccessBanners() {
    const successBanners = document.querySelectorAll('#successBanner');
    successBanners.forEach(function(banner) {
        banner.remove();
    });
}

function removeSuccessBanners() {
    const successBanners = document.querySelectorAll('#successBanner');
    successBanners.forEach(function(banner) {
        banner.remove();
    });
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
    let showNewForm = params.get('newForm');
    console.log('didCompletePayment: ', didCompletePayment, ', productName: ', productName, ', quantity: ', quantity, ', unitAmount: ', unitAmount);
    if (didCompletePayment === 'true' && productName && quantity && unitAmount) {
        console.log('Payment completed for: ', productName, ' with quantity: ', quantity, ' and unit amount: ', unitAmount);
        // var showPaymentButton = document.getElementById('show-payment-button');
        // showPaymentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        saveSuccessfulCreditPurchase(productName, quantity, unitAmount);
    }

    if (showNewForm) {
        let reloadNewModelForm = document.getElementById('reload-new-model-form');
        if (reloadNewModelForm) {
            reloadNewModelForm.click();
        }
    }

    if (didCompletePayment) {
        removeQueryParamsFromUrl();
    }
}

function removeQueryParamsFromUrl() {
    let url = window.location.href.split('?')[0];
    window.history.replaceState({}, document.title, url);
}

function updateBalanceInPaymentModal(credit_balance) {
    let modalCreditBalanceLabel = document.getElementById('modal-credit-balance-label');
    modalCreditBalanceLabel.innerHTML = `$${credit_balance.toFixed(2)}`;
}

function updateShowPaymentButton(credit_balance) {
    let creditBalanceLabel = document.getElementById('credit-balance-label');
    let balanceSpinner = document.getElementById('balance-spinner');
    balanceSpinner.classList.add('hidden');
    creditBalanceLabel.classList.remove('text-transparent');
    creditBalanceLabel.innerHTML = `Credit: $${credit_balance.toFixed(2)}`;
}

function startListeningForCreditUpdates() {
    console.log('startListeningForCreditUpdates');
    let userRecId = getUserRecId();
    db.collection('users').doc(userRecId)
        .onSnapshot((doc) => {
            console.log('User credit balance updated: ', doc.data());
            if (doc.exists) {
                let total_credits = doc.data().total_credits;
                updateShowPaymentButton(total_credits);
                updateBalanceInPaymentModal(total_credits);
            } else {
                console.log("No such document!");
            }
    });
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

    if (parseInt(value) < 0 || isNaN(parseInt(value)) || hasDecimals) {
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
    var sourcePageUrl = window.location.href.split('?')[0];

    sourcePageUrl = sourcePageUrl + `?newForm=true`;
    let form = document.createElement('form');
    let endpoint = "stripe_checkout_session/credits/new";
    var action = `${CONSTANTS.BACKEND_URL}${endpoint}?source-page-url=${sourcePageUrl}&unit-amount=${creditAmount}`

    if (sourcePageUrl.includes('console/models')) {
        let newFormContainer = document.getElementById('new-form-container');
        if (newFormContainer && !newFormContainer.classList.contains('hidden')) {
            action += '&newForm=true';
            saveNewModelDataToIndexedDB();
        }
    }

    form.method = 'POST';
    form.action = action;
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

function showPaymentModal(shouldShowCreditError=false) {
    if (shouldShowCreditError) {
        showInsufficientCreditLabel();
    }

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

function showInsufficientCreditLabel() {
    let insufficientLabel = document.getElementById('insufficient-credit-label');
    insufficientLabel.classList.remove('hidden');
}

function hideInsufficientCreditLabel() {
    let insufficientLabel = document.getElementById('insufficient-credit-label');
    insufficientLabel.classList.add('hidden');
}

function dismissPaymentModal() {
    let paymentModal = document.getElementById('payment-modal');
    paymentModal.classList.remove('opacity-100');
    paymentModal.classList.add('opacity-0');
    // Add 'hidden' class back after transition finishes
    setTimeout(() => {
        paymentModal.classList.add('hidden');
        hideInsufficientCreditLabel();
    }, 500); // same duration as the transition
}

function signOutButtonPressed() {
    firebase.auth().signOut().then(() => {
		navigationToHomePage();
    }).catch((error) => {
        console.error('Error signing out: ', error);
    });
}

function navigationToHomePage() {
    window.location.href = `https://${CONSTANTS.SITE_URL}`;
}

function navigateToBasicPromptExamples() {
    window.open(`https://${CONSTANTS.SITE_URL}/prompt-examples/basic`, '_blank');
}


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read, update, delete: if request.auth != null && request.auth.uid == userId;
//       allow create: if request.auth != null;
//     }
//   }
// }
