
function animateAway(element, duration) {
    element.classList.remove('opacity-100');
    element.classList.add('opacity-0');
    setTimeout(() => {
        element.classList.add('hidden');
    }, duration);
}

function animateIn(element) {
    element.classList.remove('hidden');
    // Double requestAnimationFrame for browser to have time for a reflow
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.classList.remove('opacity-0');
            element.classList.add('opacity-100');
        });
    });
}

function showLoaderOnButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonText = button.querySelector('p');
    buttonLoaderIcon.classList.remove('hidden');
    buttonText.classList.add('text-transparent');
}

function hideLoaderOnButton(button) {
    let buttonLoaderIcon = button.querySelector('i');
    let buttonText = button.querySelector('p');
    buttonLoaderIcon.classList.add('hidden');
    buttonText.classList.remove('text-transparent');
}

function showLoaderOnFavoriteButton(button) {
    let buttonLoaderIcon = button.querySelector('i.fa-spinner');
    let buttonFavIcon = button.querySelector('span div i');
    buttonLoaderIcon.classList.remove('hidden');
    buttonFavIcon.classList.remove('text-white')
    buttonFavIcon.classList.add('text-transparent');
}

function hideLoaderOnFavoriteButton(button) {
    let buttonLoaderIcon = button.querySelector('i.fa-spinner');
    let buttonFavIcon = button.querySelector('span div i');
    console.log('buttonLoaderIcon: ', buttonLoaderIcon, ' and buttonFavIcon: ', buttonFavIcon);
    buttonLoaderIcon.classList.add('hidden');
    buttonFavIcon.classList.add('text-white')
    buttonFavIcon.classList.remove('text-transparent');
}

function setFavoriteButtonState(button, isFavorite) {
    let buttonFavIcon = button.querySelector('span div i');
    if (isFavorite) {
        buttonFavIcon.classList.add('fa-solid');
        buttonFavIcon.classList.remove('fa-regular');
    } else {
        buttonFavIcon.classList.remove('fa-solid');
        buttonFavIcon.classList.add('fa-regular');
    }
}


function resizeImage(file) {

    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const targetSize = 1024;

            // Calculate the new dimensions while maintaining the aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > height) {
                width = Math.round((width / height) * targetSize);
                height = targetSize;
            } else {
                height = Math.round((height / width) * targetSize);
                width = targetSize;
            }

            // Resize the image
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = width;
            tempCanvas.height = height;
            tempCtx.drawImage(img, 0, 0, width, height);

            // Set the canvas dimensions to 1024x1024 for cropping
            canvas.width = targetSize;
            canvas.height = targetSize;

            // Calculate the cropping coordinates (centered in the x direction, top in the y direction)
            const cropX = (width - targetSize) / 2;
            const cropY = 0;

            // Draw the cropped portion onto the canvas
            ctx.drawImage(tempCanvas, cropX, cropY, targetSize, targetSize, 0, 0, targetSize, targetSize);

            // Convert the canvas to a Blob
            canvas.toBlob(resolve, 'image/jpeg', 0.8);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });


    // return new Promise((resolve, reject) => {
    //     const img = document.createElement('img');
    //     img.onload = function () {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
    //         // Calculate the ratio of the image's width and height
    //         const ratio = img.width / img.height;
    //         console.log('the ratio is: ', ratio);
    //         // Set the canvas dimensions to the desired size while maintaining the aspect ratio
    //         if (img.width > img.height) {
    //             console.log('the width is greater than the height');
    //             canvas.width = 1024 * ratio;
    //             canvas.height = 1024;
    //         } else {
    //             console.log('the height is greater than the width, or equal');
    //             canvas.height = 1024 * (1 / ratio);
    //             canvas.width = 1024;
    //         }
    //         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //         canvas.toBlob(resolve, 'image/jpeg', 0.8);
    //     };
    //     img.onerror = reject;
    //     img.src = URL.createObjectURL(file);
    // });
}