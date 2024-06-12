
// Single Gen Menu Functions

function genMenuShowing(event) {
    event.preventDefault();
    closeAnyOpenGenMenus();
    let genElement = event.target.closest('[generation-id]');
    let genMenuShield = genElement.querySelector('#gen-menu-shield');
    genMenuShield.classList.remove('hidden');
    event.stopPropagation();
}

// Bottom Mobile Generation Menu Functions 

function mobileGenMoreMenuShowing() {
    console.log('mobileGenMoreMenuShowing was called');
    let mobileGenMenuBg = document.getElementById('mobile-gen-menu-bg');
    if (mobileGenMenuBg.classList.contains('hidden')) {
        showMobileBottomMenuBg();
    } else {
        hideMobileBottomMenuBg();
    }
}

function showMobileBottomMenuBg() {
    let mobileGenMenuBg = document.getElementById('mobile-gen-menu-bg');
    animateIn(mobileGenMenuBg);

    let generateBottomButton = document.getElementById('generate-bottom-button');
    let genBottonSettingsButton = document.getElementById('gen-settings-bottom-button');
    generateBottomButton.classList.add('opacity-25');
    genBottonSettingsButton.classList.add('opacity-25');
    generateBottomButton.disabled = true;
    genBottonSettingsButton.disabled = true;
}

function hideMobileBottomMenuBg() {
    let mobileGenMenuBg = document.getElementById('mobile-gen-menu-bg');
    animateAway(mobileGenMenuBg, 300);

    let generateBottomButton = document.getElementById('generate-bottom-button');
    let genBottonSettingsButton = document.getElementById('gen-settings-bottom-button');
    generateBottomButton.classList.remove('opacity-25');
    genBottonSettingsButton.classList.remove('opacity-25');
    generateBottomButton.disabled = false;
    genBottonSettingsButton.disabled = false;
}

function tappedMobileBottomMenuBg(event) {
    event.preventDefault();
    event.stopPropagation();
    hideMobileGenMoreMenu();
}

function hideMobileGenMoreMenu() {
    let mobileGenMoreMenu = document.getElementById('mobile-bottom-action-menu');
    mobileGenMoreMenu.__x.$data.open = false;
    hideMobileBottomMenuBg();
}

function multiSelectPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleImageSelectability();
    hideMobileGenMoreMenu();
}

function newCollectionPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    hideMobileGenMoreMenu();
    let newCollectionModal_HTML = newCollectionModalHTML();
    let newCollectionModalDiv = $($.parseHTML(newCollectionModal_HTML));
    $('#console-content').prepend(newCollectionModalDiv);
    let newCollectionModal = document.getElementById('new-collection-modal');
    animateIn(newCollectionModal);
}

function dismissNewCollectionModal() {
    let paymentModal = document.getElementById('new-collection-modal');
    animateAway(paymentModal, 500);
}

function changeCollectionPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    hideMobileGenMoreMenu();
    let changeCollectionModal_HTML = changeCollectionModalHTML();
    let changeCollectionModalDiv = $($.parseHTML(changeCollectionModal_HTML));
    $('#console-content').prepend(changeCollectionModalDiv);
    let changeCollectionModel = document.getElementById('change-collection-modal');
    animateIn(changeCollectionModel);
    getCollectionList();
    let changeCollectionLabel = document.getElementById('change-collection-label');
    changeCollectionLabel.innerText = `from ${getLastEditedCollectionInfo().collectionName}, to:`;
}

function dismissChangeCollectionModal() {
    let changeCollectionModal = document.getElementById('change-collection-modal');
    animateAway(changeCollectionModal, 500);
}

function renameCollectionPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    hideMobileGenMoreMenu();
    let renameCollectionModal_HTML = renameCollectionModalHTML();
    let renameCollectionModalDiv = $($.parseHTML(renameCollectionModal_HTML));
    $('#console-content').prepend(renameCollectionModalDiv);

    let renameFieldLabel = document.getElementById('rename-collection-name-label');
    renameFieldLabel.innerText = `from ${getLastEditedCollectionInfo().collectionName}, to:`;

    let renameCollectionModal = document.getElementById('rename-collection-modal');
    animateIn(renameCollectionModal);
}

function dismissRenameCollectionModal() {
    let renameCollectionModal = document.getElementById('rename-collection-modal');
    animateAway(renameCollectionModal, 500);
}

function dismissChangeCollectionModal() {
    let changeCollectionModal = document.getElementById('change-collection-modal');
    animateAway(changeCollectionModal, 500);
}

function showImageRefModelSelectionModal(imgSrc) {
    let imgRefModelSelectionModal_HTML = imageReferenceModeSelectionModalHTML(imgSrc);
    let imgRefModelSelectionModalDiv = $($.parseHTML(imgRefModelSelectionModal_HTML));
    $('#console-content').prepend(imgRefModelSelectionModalDiv);
    let imgRefModelSelectionModal = document.getElementById('img-ref-mode-selection-modal');
    animateIn(imgRefModelSelectionModal);
}

function userSelectedImgRefMode(refImgMode, imgSrc) {
    console.log('The selected imgRefMode: ', refImgMode, ', and imgSrc: ', imgSrc);
}


function dismissImageRefModeSelectionModal() {
    let imgRefModelSelectionModal = document.getElementById('img-ref-mode-selection-modal');
    animateAway(imgRefModelSelectionModal, 500);
}


function showRefImageUrlModal(event) {
    event.preventDefault();
    event.stopPropagation();
    let refImgUrlModalHTML = enterRefImageUrlModalHTML();
    let refImgUrlModalDiv = $($.parseHTML(refImgUrlModalHTML));
    $('#console-content').prepend(refImgUrlModalDiv);

    let refImgUrlModal = document.getElementById('enter-ref-img-url-modal');
    animateIn(refImgUrlModal);
}

function dismissEnterRefImgUrlModal() {
    let changeCollectionModal = document.getElementById('enter-ref-img-url-modal');
    animateAway(changeCollectionModal, 500);
}

