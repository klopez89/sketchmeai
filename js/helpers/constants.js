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
            GANALYTICS_ID: 'G-7CB2YHT1T9',
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
            GANALYTICS_ID: 'G-9DE6TQDCBK',
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

const PromptStyle = {
    NONE: 'none',
    CELL_SHADING: 'cell_shading',
    PIXEL_ART: 'pixel_art',
}

const RefImageMode = {
    IMG2IMG: 'i2i-mode',
    OPENPOSE: 'openpose-mode',
    CANNY: 'canny-mode',
    DEPTH: 'depth-mode',
    ALL: 'all'
}

const InfluenceSetting = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    FULL: 'full'
}

const PersonLoraSettingValue = {
    LOW: 80,
    MEDIUM: 90,
    HIGH: 100
}

const Img2ImgSettingValue = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 50,
    FULL: 90
}

const OpenPoseSettingValue = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 50,
    FULL: 90
}

const CannySettingValue = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 50,
    FULL: 90
}

const DepthSettingValue = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 50,
    FULL: 90
}

const InfluenceValueInputId = {
    IMG2IMG: 'prompt-str',
    OPENPOSE: 'openpose-cnet-scale',
    CANNY: 'canny-cnet-scale',
    DEPTH: 'depth-cnet-scale',
}

const InfluenceRangeInputId = {
    IMG2IMG: 'ref-influence-range',
    OPENPOSE: 'openpose-scale-range',
    CANNY: 'canny-scale-range',
    DEPTH: 'depth-scale-range',
}

const RefImgUrlInputId = {
    IMG2IMG: 'i2i-url',
    OPENPOSE: 'openpose-url',
    CANNY: 'canny-url',
    DEPTH: 'depth-url',
}

const RefImgSectionButtonId = {
    IMG2IMG: 'i2i-section-button',
    OPENPOSE: 'openpose-section-button',
    CANNY: 'canny-section-button',
    DEPTH: 'depth-section-button',
}


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

  function getDurationFromDiv(div) {
    let duration = 500; // default duration
    let classList = Array.from(div.classList);
    let durationClass = classList.find(className => className.startsWith('duration-'));
    if (durationClass) {
        let durationValue = parseInt(durationClass.split('-')[1]);
        if (!isNaN(durationValue)) {
            duration = durationValue;
        }
    }
    return duration;
}

function isImageUrlExpired(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const googDate = urlParams.get('X-Goog-Date');
    const googExpires = urlParams.get('X-Goog-Expires');

    if (!googDate || !googExpires) {
        console.log('URL does not contain any expiration parameters.');
        return false;
    }

    // Parse the date and expires values
    const startDate = Date.parse(googDate.substring(0, 4) + '-' + googDate.substring(4, 6) + '-' + googDate.substring(6, 8) + 'T' + googDate.substring(9, 11) + ':' + googDate.substring(11, 13) + ':' + googDate.substring(13, 15) + 'Z');
    const expiresInMilliseconds = parseInt(googExpires, 10) * 1000;

    // Calculate the expiration date
    const expirationDate = new Date(startDate + expiresInMilliseconds);

    // Get the current UTC date
    const currentDate = new Date();

    // Check if the current date is past the expiration date
    return currentDate > expirationDate;
}

function summarizeFileSize(sizeInBytes) {
    if (sizeInBytes >= 1073741824) {
      return (sizeInBytes / 1073741824).toFixed(2) + " GB";
    } else if (sizeInBytes >= 1048576) {
      return (sizeInBytes / 1048576).toFixed(2) + " MB";
    } else if (sizeInBytes >= 1024) {
      return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else {
      return sizeInBytes + " bytes";
    }
  }