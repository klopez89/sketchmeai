
// Firebase functions
function getFirebaseUID() {
    console.log('current user: ', firebase.auth().currentUser);
    return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
}

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
function storeLastEditedCollection(collectionId) {
    localStorage.setItem('lastCollectionId', collectionId);
}

function getLastEditedCollection() {
    return localStorage.getItem('lastCollectionId');
}

function removeLastEditedCollection() {
    localStorage.removeItem('lastCollectionId');
}

// Base Prices functions
function storeBasePrices(basePrices) {
    localStorage.setItem('basePrices', JSON.stringify(basePrices));
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