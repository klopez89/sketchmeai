
// Firebase functions
function getFirebaseUID() {
    return firebase.auth().currentUser.uid;
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