function storeUserRecId(userRecId) {
    localStorage.setItem('userRecId', userRecId);
}

function getUserRecId() {
    return localStorage.getItem('userRecId');
}

function removeUserRecId() {
    localStorage.removeItem('userRecId');
}