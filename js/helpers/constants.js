const CONSTANTS = (function() {
    if (hasDevSubdomain()) {
        return {
            SITE_URL: 'dev.sketchme.ai',
            BASE_BUNDLE_PRICE_ID: 'price_1Oir9XKaOW6JyAnBQ09N5svv', // from klopez@sketchme.ai (test mode)
            BACKEND_URL: 'https://sketchmeaibackend-dev-sxgjpzid6q-uk.a.run.app/',
            FIREBASE_CONFIG: {
                apiKey: "AIzaSyCNR1RyhfAk7AS-ooDzLssHRk1N6VgGbsQ",
                authDomain: "sketchmeai-dev.firebaseapp.com",
                projectId: "sketchmeai-dev",
                storageBucket: "sketchmeai-dev.appspot.com",
                messagingSenderId: "883089591531",
                appId: "1:883089591531:web:e729a8ec05be7e0f4942ae",
                measurementId: "G-F8YZ99D1R3"
            },
        };
    } else {
        return {
            SITE_URL: 'sketchme.ai',
            BASE_BUNDLE_PRICE_ID: 'price_1NxM0bKaOW6JyAnBPWwV11Vk', // from klopez@sketchme.ai
            BACKEND_URL: 'https://sketchmeaibackend-sxgjpzid6q-uk.a.run.app/',
            FIREBASE_CONFIG: {
                apiKey: "AIzaSyDpEQogWUN3p_TZGS6fcrzB9fdgMVrhnOk",
                authDomain: "sketchmeai-8cd03.firebaseapp.com",
                projectId: "sketchmeai-8cd03",
                storageBucket: "sketchmeai-8cd03.appspot.com",
                messagingSenderId: "537976500685",
                appId: "1:537976500685:web:df3d5b4172c19db8cc9484",
                measurementId: "G-9DE6TQDCBK"
            },
        };
    }
})();

const PredictionStatus = {
    IN_PROGRESS: 'in_progress',
    BEING_HANDLED: 'being_handled',
    FAILED: 'failed',
    SUCCEEDED: 'succeeded',
    CANCELED: 'canceled'
};

const FAILED_IMG_URL = "https://storage.googleapis.com/sketchmeai-public/sketchmeai_utility_imgs/failed_img.png"
const CANCELED_IMG_URL = "https://storage.googleapis.com/sketchmeai-public/sketchmeai_utility_imgs/canceled_img.png"

function hasDevSubdomain() {
    var url = window.location.href;
    var hostname = new URL(url).hostname;
    return hostname.startsWith('dev.');
}

function PlaceholderImageStr() {
	return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
}

function getCurrentPageUrlWithoutQueryParams() {
    var url = window.location.href;
    return url.split('?')[0];
}

function generateId() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var idLength = 20;
    var id = '';
    for (var i = 0; i < idLength; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }
