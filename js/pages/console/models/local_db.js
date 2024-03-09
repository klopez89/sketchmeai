
const DB_NAME = 'sketchMeAiDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'modelFormStore';

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onerror = function(event) {
      reject('IndexedDB error: ' + event.target.errorCode);
    };

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
  });
}

function getModelFormImages(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get('modelFormImages');

    request.onerror = function(event) {
      reject('Error fetching data: ', event.target.errorCode);
    };

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
  });
}

function saveModelFormImages(db, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.put(data);

    request.onerror = function(event) {
      reject('Error saving data: ', event.target.errorCode);
    };

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
  });
}

function removeModelFormImages(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete('modelFormImages');

    request.onerror = function(event) {
      reject('Error removing data: ', event.target.errorCode);
    };

    request.onsuccess = function(event) {
      resolve('Model form images removed from IndexedDB');
    };
  });
}


// export { openDB, getModelFormImages, saveModelFormImages, removeModelFormImages };