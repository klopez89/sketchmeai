

// User Rec Id functions
function storeUserRecId(userRecId) {
    localStorage.setItem('userRecId', userRecId);
}

function getUserRecId() {
    return localStorage.getItem('userRecId');
}

function removeUserRecId() {
    localStorage.removeItem('userRecId');
}

// Display Name functions
function storeDisplayName(displayName) {
    localStorage.setItem('displayName', displayName);
}

function getDisplayName() {
    return localStorage.getItem('displayName');
}

function removeDisplayName() {
    return localStorage.removeItem('displayName');
}

// Last Edited Collection functions
function storeLastEditedCollection(collectionId, collectionName) {
    localStorage.setItem('lastCollectionId', collectionId);
    localStorage.setItem('lastCollectionName', collectionName);
}

function getLastEditedCollectionInfo() {
    return {
        'collectionId' : localStorage.getItem('lastCollectionId'),
        'collectionName' : localStorage.getItem('lastCollectionName')
    };
}

function removeLastEditedCollection() {
    localStorage.removeItem('lastCollectionId');
    localStorage.removeItem('lastCollectionName');
}


function storePriceInfo(priceInfo, priceInfoType) {
    localStorage.setItem(priceInfoType, JSON.stringify(priceInfo));
}

function getPriceInfo(priceInfoType) {
    return JSON.parse(localStorage.getItem(priceInfoType));
}


function getBasePrices() {
    return JSON.parse(localStorage.getItem('basePrices'));
}

function removeBasePrices() {
    return localStorage.removeItem('basePrices');
}

// Remve all local storage data
function removeAllLocalStorageData() {
    localStorage.clear();
}