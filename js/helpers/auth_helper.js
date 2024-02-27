function storeUserRecId(userRecId) {
    localStorage.setItem('userRecId', userRecId);
}

function getUserRecId() {
    return localStorage.getItem('userRecId');
}

function removeUserRecId() {
    localStorage.removeItem('userRecId');
}

function storeLastEditedCollection(collectionId) {
    localStorage.setItem('lastCollectionId', collectionId);
}

function getLastEditedCollection() {
    return localStorage.getItem('lastCollectionId');
}

function removeLastEditedCollection() {
    localStorage.removeItem('lastCollectionId');
}