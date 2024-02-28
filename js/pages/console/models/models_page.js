addModelsGrid();
addBaseModelMenu();
configureNewModelUploadArea();
configureTrainingSubjectField();
configureTrainingForm();
setupAccordion();
applyTrainingPreset(personTrainingPreset());
checkForNewModelRedirect();

let userRecId = getUserRecId();
let lastDocId = null;
fetchModels(userRecId, lastDocId);

const minimumUploadCount = 10;
const maximumUploadCount = 20;
const canceledColor = '#801930';
const failedColor = '#801930';

function enforceNoSpaces(event) {
    event.target.value = event.target.value.replace(/\s/g, '');
}

function checkForNewModelRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('newForm')) {
        showNewModelFormFast();
    }
}

function addModelsGrid() {
    let dummy_grid_html = dummyGridHTML();
    let dummy_grid_div = $($.parseHTML(dummy_grid_html));
    $('#console-content').append(dummy_grid_div);
}

function addBaseModelMenu() {
    let base_model_menu_html = baseModelMenuHTML();
    let base_model_menu_div = $($.parseHTML(base_model_menu_html));
    $('#console-content').append(base_model_menu_div);
}

function setupAccordion() {
    const accordionButton = document.querySelector('[data-te-target="#advancedSettings"]');
    const accordionContent = document.querySelector('#advancedSettings');

    accordionButton.addEventListener('click', function() {
        // Listen for the end of the transition on the accordionContent
        accordionContent.addEventListener('transitionend', function handler(e) {

            const buttonText = accordionButton.lastChild;

            if (accordionContent.classList.contains('hidden')) {
                buttonText.nodeValue = buttonText.nodeValue.replace('Hide Advanced Settings', 'Show Advanced Settings');
            } else {
                buttonText.nodeValue = buttonText.nodeValue.replace('Show Advanced Settings', 'Hide Advanced Settings');
            }
            // Remove this event listener once the transition is complete to avoid it being called multiple times
            accordionContent.removeEventListener('transitionend', handler);
            // }
        });
    });
}

function cancelFineTuning(predictionId, gen_element, generation) {
    let action = `${CONSTANTS.BACKEND_URL}generate/cancel`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            replicate_prediction_id: predictionId
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            gen_element.querySelector('img').classList.remove('hidden');
            gen_element.querySelector('#gen-status').innerHTML = '';
            loadGenImage(CANCELED_IMG_URL, gen_element);
            configureCopyButton(generation, gen_element);
        },
        error: function(data) {
            console.log("error cancelling generation");
            console.log(data);
        }
    });
}

function fetchModels(userRecId, lastDocId) {
    $.ajax({
        url: CONSTANTS.BACKEND_URL + 'models',
        type: 'POST',
        data: JSON.stringify({
            userRecId: userRecId,
            lastDocId: lastDocId
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            models = data.models;
            hasAnotherPage = data.has_another_page;
            lastDocId = data.last_doc_id;
            // console.log(`data from generations: ${generations}`)
            // console.log(`hasAnotherPage: ${hasAnotherPage}, lastDocId: ${lastDocId}`);


            if (models == null) {
                console.log('Didnt find any more images to load. all done paginating!');
                document.getElementById('grid-loader').classList.add('hidden');
                // hideInfiniteLoader();
                // removeLastDocId();
                setTimeout(function() {
                  isCurrentlyPaginatingPrompts = false;
                }, 50);
                return
            }

            models.forEach(function(model) {
                
                let bg_color = appropriateModelBgColor(model)
                let new_model_grid_html = newModelEntryDiv(model.rec_id, bg_color);
                let new_model_div = $($.parseHTML(new_model_grid_html));
                new_model_div.hide().insertAfter('#collection-grid > div:first-child').fadeIn(function() {

                    let model_element = document.querySelector(`div[model-id="${model.rec_id}"]`);

                    if (model.status === PredictionStatus.IN_PROGRESS) {
                        model_element.querySelector('#model-status').innerHTML = '...queued';
                        startListeningForModelUpdates(userRecId, model.rec_id);
                    } else if (model.status === PredictionStatus.BEING_HANDLED) {
                        model_element.querySelector('#model-status').innerHTML = '...fine-tuning';
                    
                        // let cancel_button = model_element.querySelector('#cancel-button');
                        // cancel_button.addEventListener('click', function() {
                        //     model_element.querySelector('#model-status').innerHTML = '...cancelling';
                        //     cancelGeneration(model.replicate_prediction_id);
                        //     cancel_button.classList.add('hidden');
                        // });
                        // cancel_button.classList.remove('hidden');
                        startListeningForModelUpdates(userRecId, model.rec_id);
                    } else if (model.status === PredictionStatus.CANCELED) {
                        model_element.querySelector('#model-loader').classList.add('hidden');
                        model_element.querySelector('#model-status').innerHTML = '';
                        model_element.setAttribute('replicate-name', model.replicate_name);
                        model_element.setAttribute('version', model.version);
                        model_element.querySelector('#model-name-label').innerHTML = 'Canceled';
                        configureModelDivPostFinalStatusUpdate(model_element);
                    } else if (model.status === PredictionStatus.FAILED) {
                        model_element.querySelector('#model-loader').classList.add('hidden');
                        model_element.querySelector('#model-status').innerHTML = '';
                        model_element.setAttribute('replicate-name', model.replicate_name);
                        model_element.setAttribute('version', model.version);
                        model_element.querySelector('#model-name-label').innerHTML = 'Failed';
                        configureModelDivPostFinalStatusUpdate(model_element);
                    } else if (model.status === PredictionStatus.SUCCEEDED) {
                        model_element.querySelector('#model-loader').classList.add('hidden');
                        model_element.querySelector('#model-status').innerHTML = '';
                        model_element.querySelector('#model-name-label').innerHTML = model.name;
                        model_element.setAttribute('replicate-name', model.replicate_name);
                        model_element.setAttribute('version', model.version);
                        console.log('model generation succeeded');
                        configureModelDivPostFinalStatusUpdate(model_element);
                    }
                });
            });

            // saveLastDocIdLocally(lastDocId);
            isCurrentlyPaginatingPrompts = false;
            $('#grid-loader').addClass('hidden');
            
            if (hasAnotherPage === false) {
                console.log('reaady to hide the infinite loader');
                // hideInfiniteLoader();
                // removeLastDocId();
            } else {
                // showInfiniteLoader();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function appropriateModelBgColor(model) {
    let bg_color = model.bg_color || '#1f2937';
    if (model.status === PredictionStatus.CANCELED || model.status === PredictionStatus.FAILED) {
        bg_color = canceledColor;
    } else if (model.status === PredictionStatus.FAILED) {
        bg_color = failedColor;
    }
    return bg_color;
}


function startListeningForModelUpdates(userRecId, modelId) {
    console.log('startListeningForModelUpdates');
    console.log(`userRecId: ${userRecId}, modelId: ${modelId}`);
    let unsubscribe = db.collection('users').doc(userRecId)
        .collection('ai_models').doc(modelId)
        .onSnapshot((doc) => {
            let aiModel_dict = doc.data();
            console.log('ai_model dicts: ', aiModel_dict);
            let generation_time = aiModel_dict?.generation_time;
            let time_created = aiModel_dict?.time_created_est;
            let replicate_name = aiModel_dict?.replicate_name;
            let version = aiModel_dict?.version;
            let status = aiModel_dict?.status;
            let error = aiModel_dict?.error;
            let name = aiModel_dict?.name;
       
            console.log(`user-facing model name is ${name}, w/ replicate_name: ${replicate_name}, and version: ${version}`);

            const model_element = document.querySelector(`div[model-id="${modelId}"]`);
            if (status === PredictionStatus.IN_PROGRESS) {
                console.log('model is in progress');
                model_element.querySelector('#model-status').innerHTML = '...queued';
            } else if (status === PredictionStatus.BEING_HANDLED) {
                console.log('model is being handled');
                model_element.querySelector('#model-status').innerHTML = '...fine-tuning';
                let cancel_button = model_element.querySelector('#cancel-button');
                cancel_button.addEventListener('click', function() {
                    cancelModelFineTuning(aiModel_dict.replicate_prediction_id, model_element);
                    cancel_button.classList.add('hidden');
                });
                cancel_button.classList.remove('hidden');
            } else if (status === PredictionStatus.SUCCEEDED) {
                model_element.querySelector('#model-loader').classList.add('hidden');
                // loadGenImage(signed_gen_url, gen_element);
                model_element.querySelector('#model-status').innerHTML = '';
                model_element.querySelector('#model-name-label').innerHTML = name;
                console.log('model generation succeeded');
                configureModelDivPostFinalStatusUpdate(model_element);
                unsubscribe(); // Stop listening for updates
            } else if (status === PredictionStatus.FAILED) {
                console.log('model generation failed');
                console.log('error: ', error);
                model_element.querySelector('#model-loader').classList.add('hidden');
                model_element.querySelector('#model-status').innerHTML = '';
                model_element.querySelector('#model-name-label').innerHTML = 'Failed';
                model_element.querySelector('model-name-container').style.backgroundColor = failedColor;
                configureModelDivPostFinalStatusUpdate(model_element);
                unsubscribe(); // Stop listening for updates
            } else if (status === PredictionStatus.CANCELED) {
                console.log('model generation canceled');
                model_element.querySelector('#model-loader').classList.add('hidden');
                model_element.querySelector('#model-status').innerHTML = '';
                model_element.querySelector('#model-name-label').innerHTML = 'Canceled';
                model_element.querySelector('#model-name-container').style.backgroundColor = canceledColor;
                configureModelDivPostFinalStatusUpdate(model_element);
                unsubscribe(); // Stop listening for updates
            }

            console.log(`for model_id: ${modelId} status is ${status}`);
    });
}

function showModelMenu(event) {
    console.log('pressed on the img element');
    event.stopPropagation();
}

function cancelModelFineTuning(predictionId, model_element) {
    let action = `${CONSTANTS.BACKEND_URL}generate/cancel`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            replicate_prediction_id: predictionId
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function(data) {
            console.log('succedded in canceling fine tuning', data);
            model_element.querySelector('#model-loader').classList.add('hidden');
            model_element.querySelector('#model-status').innerHTML = '';
            model_element.querySelector('#model-name-label').innerHTML = 'Canceled';
            model_element.querySelector('#model-name-container').style.backgroundColor = canceledColor;
            configureModelDivPostFinalStatusUpdate(model_element);
        },
        error: function(data) {
            console.log("error cancelling generation");
            console.log(data);
        }
    });
}

// Upload related functions

function configureNewModelUploadArea() {
	// Get a reference to the drag-and-drop box
	let dropArea = document.getElementById('uploadAreaButton');
	let localUploadInput = document.getElementById('localUploadInput');

	// Add event listeners to handle drag-and-drop events
	if (dropArea != null) {
		dropArea.addEventListener('dragenter', handleDragEnter);
		dropArea.addEventListener('dragleave', handleDragLeave);
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		dropArea.addEventListener('click', triggerLocalUploadMenu);
	}

	if (localUploadInput != null) {
		localUploadInput.addEventListener("change", () => {
			console.log('Trigger change event of local upload input');
		 	const files = localUploadInput.files;
			handleFileUploads(files);
            localUploadInput.value = '';
		});

		localUploadInput.addEventListener("click", () => {
			console.log('Trigger click event of local upload input');
		});
	}
}

function configureUploadButton() {
	let upload_button = document.getElementById('uploadToServerButton');
	if (upload_button != null) {
		upload_button.addEventListener("click", () => {
			upload_button.disabled = true;
			showLoadingOnUploadButton();
			beginNewModelCreation();
		});
	}
}


function modelMenuShowing(event) {
    event.preventDefault();
    closeAnyOpenModelMenus();
    let modelElement = event.target.closest('[model-id]');
    let modelMenuShield = modelElement.querySelector('#model-menu-shield');
    modelMenuShield.classList.remove('hidden');
    event.stopPropagation();
}

function closeAnyOpenModelMenus() {
    let modelCompMenus = document.querySelectorAll('.model-comp-menu');
    let openMenus = Array.from(modelCompMenus).filter(menu => {
        return menu.__x.$data.open;
    });
    openMenus.forEach((menu) => {
        menu.__x.$data.open = false;
        let modelElement = menu.closest('[model-id]');
        hideModelMenuShield(modelElement);
    });
}

function hideModelMenuShield(modelElement) {
    let modelMenuShield = modelElement.querySelector('#model-menu-shield');
    modelMenuShield.classList.add('hidden');
}

function triggerLocalUploadMenu(event) {
	event.preventDefault();
    console.log('time to show local upload flow');
    let localUploadInput = document.getElementById('localUploadInput');
    localUploadInput.click();
}

function handleDragEnter(event) {
  // Highlight the drag-and-drop box when a file is dragged over it
  // this.classList.add('highlight');
}

function handleDragLeave(event) {
  // Un-highlight the drag-and-drop box when a file is dragged away from it
  // this.classList.remove('highlight');
}

function handleDragOver(event) {
  // Prevent the default behavior of the event
  event.preventDefault();
}

function handleDrop(event) {
    // Prevent the default behavior of the event
    event.preventDefault();

    // Un-highlight the drag-and-drop box
    // this.classList.remove('highlight');

    // Get the files that were dropped and handle them
    var files = event.dataTransfer.files;
    handleFileUploads(files)
}

function handleFileUploads(files) {
    let fileList = Array.from(files);
    let number_of_uploaded_files = numberOfUploadedFiles();
    let minimum_upload_count = minimumUploadCount;
    let remaining_upload_count = minimum_upload_count - number_of_uploaded_files;

    if (fileList.length + number_of_uploaded_files > maximumUploadCount) {
        fileList = fileList.slice(0, maximumUploadCount - number_of_uploaded_files);
    }

    let files_to_upload = fileList;

    console.log("the remaining upload count is: ", remaining_upload_count);
    console.log("the files to upload are: ", files_to_upload);

    var didFindUnsupporedFileType = false;
    var unsupportedFileTypeFound = null;
    // Read the contents of each file
    for (var i = 0; i < files_to_upload.length; i++) {
        let reader = new FileReader();
        let file = files_to_upload[i];
        let filename = file.name;
        let fileType = file.type;
        let fileSize = file.size;
        console.log('The file type here is: ', fileType);

        if (fileType === 'image/heic') {
            // Convert HEIC to JPEG using heic2any
            heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 0.8 // Adjust quality as needed
            })
            .then(function (conversionResult) {
                let reader = new FileReader();
                reader.addEventListener('load', function(event) {
                    let fileData = event.target.result;
                    let fileInfo = {
                        name: filename,
                        type: 'image/jpeg', // Set the type to JPEG after conversion
                        size: summarizeFileSize(conversionResult.size),
                        data: fileData,
                    };
                    addFileUploadDivToDOM(fileInfo);
                });
                reader.readAsDataURL(conversionResult);
            })
            .catch(function (error) {
                console.error('Error converting HEIC to JPEG', error);
            });
        } else if (fileType === 'image/jpg' || fileType === 'image/jpeg' || fileType === 'image/png') {
            // Handle other image types as before
            let reader = new FileReader();
            reader.addEventListener('load', function(event) {
                let fileData = event.target.result;
                let fileInfo = {
                    name: filename,
                    type: fileType,
                    size: summarizeFileSize(fileSize),
                    data: fileData,
                };
                addFileUploadDivToDOM(fileInfo);
            });
            reader.readAsDataURL(file);
        } else {
            didFindUnsupporedFileType = true;
            unsupportedFileTypeFound = fileType.split('/')[1];
        }
    }

    if (didFindUnsupporedFileType) {
        displayWarningBanner(`File(s) you tried uploading are in an unsupported image type: ${unsupportedFileTypeFound}. Please upload JPG, JPEG, or PNG files.`);
    }
}


// Upload related constant functions

function numberOfUploadedFiles() {
	let uploadedImages = $("#uploadEntryContainer").find("li");
	return uploadedImages.length;
}

function hasEnoughTrainingData() {
    let number_of_uploaded_files = numberOfUploadedFiles();
	let minimum_upload_count = minimumUploadCount;
    return number_of_uploaded_files >= minimum_upload_count
}

function isReadyToBeginNewModelCreation() {
	let number_of_uploaded_files = numberOfUploadedFiles();
    let isDataValid = isTrainingDataValid();
	let isReady = number_of_uploaded_files >= minimumUploadCount && number_of_uploaded_files <= maximumUploadCount && isDataValid;
    console.log('isTrainingDataValid: ', isDataValid, 'isReadyToBeginNewModelCreation: ', isReady);
	return isReady;
}



function getUploadedFiles() {
	let uploaded_entries = $("#uploadEntryContainer").find("li");
	let img_list = [];

  uploaded_entries.each(function(index, entry) {
    let img_data = $(entry).find('#uploadedImage')[0].src;
		let img_name = $(entry).attr("filename");
		let img_type = $(entry).attr("filetype");
		let img = {
			name: img_name,
			data: img_data,
			type: img_type,
		};
		img_list.push(img);
  });

	return img_list;
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

function addFileUploadDivToDOM(file) {
	let upload_count = numberOfUploadedFiles();
	let is_first_file = upload_count === 0;

	let upload_entry = uploadEntryDiv(file, is_first_file);
	let upload_entry_element = $($.parseHTML(upload_entry));

	let delete_button = upload_entry_element.find(".remove-upload-button")[0];
	delete_button.addEventListener('click', function(event) {
		event.preventDefault();

		let entry_is_inside_padding_container = upload_entry_element.parent('div').length > 0
		if (entry_is_inside_padding_container) {
			upload_entry_element.parent('div').remove();
		} else {
			upload_entry_element.remove();
		}

		toggleUploadAreaVisibility();
		toggleUploadButtonInteraction();
	});

	$('#uploadEntryContainer').children().first().after(upload_entry_element);

	upload_entry_element.find('#uploadedImage')[0].src = file.data;
	toggleUploadAreaVisibility();
	toggleUploadButtonInteraction();
}

function toggleUploadAreaVisibility() {
	let shouldShow = hasEnoughTrainingData();
    let upload_count = numberOfUploadedFiles();
    console.log('shouldShow: ', shouldShow);

	let uploadAreaButton = document.getElementById('uploadAreaButton');
	let icon = uploadAreaButton.querySelector('i');
	let span = uploadAreaButton.querySelector('span');

	if (shouldShow === true && !icon.classList.contains('fa-check')) {
		icon.classList.remove('fa-images');
		icon.classList.add('fa-check');
        console.log('about to set text to upload count of : ', upload_count);
	}

	if (shouldShow === false && icon.classList.contains('fa-check')) {
		icon.classList.add('fa-images');
		icon.classList.remove('fa-check');
        console.log('about to set text to upload count of : ', upload_count);
	}

    span.textContent = `${upload_count}`;
    if (shouldShow === true) {
        span.classList.add('font-black');
        span.classList.remove('font-medium');
    } else {
        span.classList.add('font-medium');
        span.classList.remove('font-black');
    }
}

function toggleLogoutButton(visibility) {
    let logoutButton = document.getElementById('logout');
    if (logoutButton != null) {
        visibility ? logoutButton.classList.remove('hidden') : logoutButton.classList.add('hidden');
    }
}

function showLoadingOnUploadButton() {
	let uploadButtonTextElement = $('#uploadToServerButton p')[0];
	uploadButtonTextElement.style.color = "transparent";
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.style.display = '';
}

function hideLoadingOnUploadButton() {
	let uploadButtonTextElement = $('#uploadToServerButton p')[0];
	uploadButtonTextElement.style.color = "";
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.style.display = 'none';
}

function showCheckmarkOnUploadButton() {
	let uploadButtonLoadingElement = $('#uploadToServerButton i')[0];
	uploadButtonLoadingElement.classList.remove('fa-spin');
	uploadButtonLoadingElement.classList.remove('fa-spinner');
	uploadButtonLoadingElement.classList.add('fa-check');
}

function isTrainingDataValid() {
    let modelName = document.getElementById('model-name').value;
    let modelSelection = document.getElementById('model-selection').value;
    let trainingSubject = document.getElementById('training-subject').value;
    let tokenString = document.getElementById('token-string').value;
    let seed = document.getElementById('seed').value;
    let resolution = document.getElementById('resolution').value;
    let networkRank = document.getElementById('network-rank').value;
    let batchSize = document.getElementById('batch-size').value;
    let imageRepeats = document.getElementById('image-repeats').value;
    let unetLr = document.getElementById('unet-lr').value;
    let teLr = document.getElementById('te-lr').value;
    let lrScheduler = document.getElementById('lr-scheduler').value;
    let schedulerCycles = document.getElementById('scheduler-cycles').value;
    let warmupSteps = document.getElementById('warmup-steps').value;
    let validationEpochs = document.getElementById('validation-epochs').value;
    let maxTrainSteps = document.getElementById('max-train-steps').value;
    let mixedPrecision = document.getElementById('mixed-precision').value;
    // let xformers = document.getElementById('xformers').checked;
    let gradientCheckpoint = document.getElementById('gradient-checkpoint').checked;
    let bitAdam = document.getElementById('8bit-adam').checked;

    console.log('modelName: ', modelName);
    var isDataValid = modelName != '' && modelSelection && trainingSubject && trainingSubject !== 'Select an option' && tokenString && seed && resolution && networkRank && batchSize && imageRepeats && unetLr && teLr && lrScheduler && schedulerCycles && warmupSteps && validationEpochs && maxTrainSteps && mixedPrecision && gradientCheckpoint != null && bitAdam != null;
    
    // shouldUseRegImgs = false;
    // if (trainingSubject == 'person') {
    //     shouldUseRegImgs = document.getElementById('use-reg-imgs').checked;
    // }

    // isDataValid = isDataValid && shouldUseRegImgs != null;

    return isDataValid;
}

function saveNewModelDataToLocalStorage() {
    let uploadedFiles = getUploadedFiles();
    let modelName = document.getElementById('model-name').value;
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    localStorage.setItem('modelName', modelName);
}

function retrieveNewModelDataFromStorage() {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles'));
    let modelName = localStorage.getItem('modelName');
    return { uploadedFiles, modelName };
}

function clearNewModelDataFromLocalStorage() {
    localStorage.removeItem('uploadedFiles');
    localStorage.removeItem('modelName');
}

function attemptToReloadSaveNewModelFormData() {
    let { uploadedFiles, modelName } = retrieveNewModelDataFromStorage();
    if (uploadedFiles.length === 0) {
        return;
    }
    uploadedFiles.forEach(file => {
        addFileUploadDivToDOM(file);
    });
    document.getElementById('model-name').value = modelName;
    toggleUploadButtonInteraction();
}

function grabTrainingData() {
    let modelName = document.getElementById('model-name').value;
    let modelSelection = document.getElementById('model-selection').value;
    let trainingSubject = document.getElementById('training-subject').value;
    let objectName = document.getElementById('object-name').value;
    let tokenString = document.getElementById('token-string').value;
    let seed = document.getElementById('seed').value;
    let resolution = document.getElementById('resolution').value;
    let networkRank = document.getElementById('network-rank').value;
    let batchSize = document.getElementById('batch-size').value;
    let imageRepeats = document.getElementById('image-repeats').value;
    let unetLr = document.getElementById('unet-lr').value;
    let teLr = document.getElementById('te-lr').value;
    let lrScheduler = document.getElementById('lr-scheduler').value;
    let schedulerCycles = document.getElementById('scheduler-cycles').value;
    let warmupSteps = document.getElementById('warmup-steps').value;
    let validationEpochs = document.getElementById('validation-epochs').value;
    var maxTrainSteps = document.getElementById('max-train-steps').value;
    var mixedPrecision = document.getElementById('mixed-precision').value;
    // let xformers = document.getElementById('xformers').checked;
    let gradientCheckpoint = document.getElementById('gradient-checkpoint').checked;
    let bitAdam = document.getElementById('8bit-adam').checked;
	let files = getUploadedFiles();
    let userRecId = getUserRecId();
    let modelId = generateId()

    if (maxTrainSteps === 'auto') {
        maxTrainSteps = 0;
    }

    let trainingData = {
        "model-id": modelId,
        "user-rec-id": userRecId,
        "model-name": modelName,
        "model-selection": modelSelection,
        "training-subject": trainingSubject,
        "object-name": objectName,
        "token-string": tokenString,
        "seed": seed,
        "resolution": resolution,
        "network-rank": networkRank,
        "batch-size": batchSize,
        "image-repeats": imageRepeats,
        "unet-lr": unetLr,
        "te-lr": teLr,
        "lr-scheduler": lrScheduler,
        "scheduler-cycles": schedulerCycles,
        "warmup-steps": warmupSteps,
        "validation-epochs": validationEpochs,
        "max-train-steps": maxTrainSteps,
        "mixed-precision": mixedPrecision,
        "gradient-checkpoint": gradientCheckpoint,
        "8bit-adam": bitAdam,
        "files": files,
    };

    // if (trainingSubject == 'person') {
    //     let shouldUseRegImgs = document.getElementById('use-reg-imgs').checked;
    //     trainingData['use-reg-imgs'] = shouldUseRegImgs;
    // }

    return trainingData;
}

function personTrainingPreset() {
    return {
    "model-selection": "SDXL",
    "token-string": "zxc",
    "seed": "0",
    "resolution": "1024",
    "network-rank": "64",
    "batch-size": "1",
    "image-repeats": "1",
    "unet-lr": "0.00005",
    "te-lr": "0.000005",
    "lr-scheduler": "constant",
    "scheduler-cycles": "1",
    "warmup-steps": "0",
    "validation-epochs": "50",
    "max-train-steps": "auto",
    "mixed-precision": "fp16",
    "xformers": false,
    "gradient-checkpoint": true,
    "8bit-adam": true
    }
}

function applyTrainingPreset(preset) {
    for (let key in preset) {
        let element = document.getElementById(key);
        if (element) {
            if (element.type === "checkbox") {
                element.checked = preset[key];
            } else {
                element.value = preset[key];
            }
        }
    }
}

function addNewModelToGrid(modelId, bgColor) {
    let new_model_grid_html = newModelEntryDiv(modelId, bgColor);
    let new_model_div = $($.parseHTML(new_model_grid_html));
    new_model_div.hide().insertAfter('#collection-grid > div:first-child').fadeIn();
}

function configureModelDivPostFinalStatusUpdate(model_element) {
    let modelCompMenu = document.querySelector('#console-content .model-comp-menu');
    let actionContainer = model_element.querySelector('#action-container');

    let modelCompMenuCopy = modelCompMenu.cloneNode(true);
    modelCompMenuCopy.classList.remove('hidden');
    actionContainer.appendChild(modelCompMenuCopy);
    actionContainer.classList.remove('hidden');
}

function kickoffModelCreation(trainingData) {
    console.log("about to kickoff model gen, w/ training data: ", trainingData);
    showStartTrainingSpinner();

    let modelNameValidationDiv = document.getElementById('model-name-validation');
    modelNameValidationDiv.classList.add('hidden');

    disableNewFineTuneButtons();

    let action = `${CONSTANTS.BACKEND_URL}model/new`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify(trainingData),
        contentType: "application/json",
        dataType: 'json',
        success: function(data) {
            console.log("successfully returned from new model endpoint");
            console.log(data);
            let bgColor = data.bg_color;
            console.log('The color to show for model bg is: ', bgColor);
            addNewModelToGrid(trainingData['model-id'], bgColor)
            animateAwayFromNewModelForm();
            startListeningForModelUpdates(trainingData['user-rec-id'], trainingData['model-id']);
            hideStartTrainingSpinner();
            enableNewFineTuneButtons();
        },
        error: function(data) {
            console.log("error");
            console.log("Status code: ", data.status);
            console.log("Response text: ", data.responseText);
            if (data.status === 413) { // model name already taken
                modelNameValidationDiv.classList.remove('hidden');
            } else if (data.status === 414) { // insufficient credits
                showPaymentModal(true);
            }
            hideStartTrainingSpinner();
            enableNewFineTuneButtons();
        }
    });
}

function disableNewFineTuneButtons() {
    document.getElementById('uploadToServerButton').disabled = true;
    document.getElementById('cancelButton').disabled = true;
}

function enableNewFineTuneButtons() {
    document.getElementById('uploadToServerButton').disabled = false;
    document.getElementById('cancelButton').disabled = false;
}

function configureTrainingForm() {
    document.getElementById('new-form').addEventListener('input', function() {
        console.log('Form has been changed');
        toggleUploadButtonInteraction();
    });

    document.getElementById('new-form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Ready to gather form values and training data and hit our new model endpoint');
        kickoffModelCreation(grabTrainingData());
    });

    document.getElementById('model-name').addEventListener('input', enforceNoSpaces);
}

function configureTrainingSubjectField() {
    document.getElementById('training-subject').addEventListener('change', function() {
        let selectedSubject = this.value;
        let preset;

        switch(selectedSubject) {
            case 'person':
                preset = personTrainingPreset();
                hideFieldsWithIds(['object-name-container'])
                // showFieldsWithIds(['use-reg-imgs-field-container'])
                console.log('Ready to apply person preset');
                break;
            case 'style':
                // preset = styleTrainingPreset();
                hideFieldsWithIds(['object-name-container'])
                console.log('Ready to apply style preset');
                break;
            case 'object':
                // preset = objectTrainingPreset();
                showFieldsWithIds(['object-name-container'])
                // hideFieldsWithIds(['use-reg-imgs-field-container'])
                console.log('Ready to apply object preset');
                break;
            // Add more cases if there are other training subjects
            default:
                console.log('No preset found for selected subject');
                return;
        }

        if (preset) {
            applyTrainingPreset(preset);
        }
    });
}

function showObjectNameField() {
    document.getElementById('object-name-container').classList.remove('hidden');
}

function hideObjectNameField() {
    document.getElementById('object-name-container').classList.add('hidden');
}

function showFieldsWithIds(ids) {
    ids.forEach(id => {
        document.getElementById(id).classList.remove('hidden');
    });
}

function hideFieldsWithIds(ids) {
    ids.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
}

function toggleUploadButtonInteraction() {
	let shouldEnable = isReadyToBeginNewModelCreation();
	if (shouldEnable === true && $('#uploadToServerButton').is("[disabled]") === true) {
		$('#uploadToServerButton').removeAttr('disabled');
		$('#uploadToServerButton').removeClass('bg-gray-200');
		$('#uploadToServerButton').removeClass('hover:bg-gray-200');
		$('#uploadToServerButton').addClass('bg-black');
		$('#uploadToServerButton').addClass('hover:bg-gray-800');
	} 

	if (shouldEnable === false && $('#uploadToServerButton').is("[disabled]") === false) {
		$('#uploadToServerButton').attr('disabled','');
		$('#uploadToServerButton').addClass('bg-gray-200');
		$('#uploadToServerButton').addClass('hover:bg-gray-200');
		$('#uploadToServerButton').removeClass('bg-black');
		$('#uploadToServerButton').removeClass('hover:bg-gray-800');
	}
}

function clickedOnEmptyPartOfGrid() {
    console.log('clicked on empty part of grid');
    closeAnyOpenModelMenus();
}

function clickedOutsideOfCollectionGrid() {
    console.log('clicked outside of collection grid');
    closeAnyOpenModelMenus();
}

function clickedOnNewModelButton(event) {
    event.stopPropagation();
    showNewModelForm();
}

function showNewModelForm() {
    let newFormContainer = document.getElementById('new-form-container');
    newFormContainer.classList.remove('hidden');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            newFormContainer.classList.remove('opacity-0');
            newFormContainer.classList.add('opacity-100');
        });
    });
}

function showNewModelFormFast() {
    let newFormContainer = document.getElementById('new-form-container');
    // Remove any duration class to prevent animation
    newFormContainer.classList.remove('duration-500');
    // Make the form visible
    newFormContainer.classList.remove('hidden');
    // Trigger reflow to apply the changes immediately
    // newFormContainer.offsetWidth;
    // Change the opacity to make the form fully visible
    newFormContainer.classList.remove('opacity-0');
    newFormContainer.classList.add('opacity-100');
    // Add the duration class back for future transitions
    newFormContainer.classList.add('duration-500');
}


function exitNewModelForm(event) {
    event.preventDefault();
    event.stopPropagation();
    animateAwayFromNewModelForm();
}

function animateAwayFromNewModelForm() {
    let newFormContainer = document.getElementById('new-form-container');
    let duration = getDurationFromDiv(newFormContainer);
    console.log('duration to dismiss new model form: ', duration);
    newFormContainer.classList.remove('opacity-100');
    newFormContainer.classList.add('opacity-0');
    setTimeout(() => {
        newFormContainer.classList.add('hidden');
        resetNewModalForm();
    }, duration);
}

function resetNewModalForm() {
    document.getElementById('model-name').value = '';
    document.querySelectorAll("#uploadEntryContainer li").forEach(li => li.remove());
    applyTrainingPreset(personTrainingPreset());
    toggleUploadAreaVisibility();
    clearNewModelDataFromLocalStorage();
}

function tappedModelMenuShield(event) {
    let modelCompMenu = event.target.parentElement.querySelector('.model-comp-menu');
    modelCompMenu.__x.$data.open = false;
    event.target.classList.add('hidden');
    event.stopPropagation();
}

function deleteButtonPressed(event) {
    event.preventDefault();
    let modelElement = event.target.closest('[model-id]');
    hideModelMenuShield(modelElement);
    let modelId = modelElement.getAttribute('model-id');
    let replicateName = modelElement.getAttribute('replicate-name');
    var modelVersion = modelElement.getAttribute('version');

    console.log(`delete button pressed for modelId: ${modelId}, and model version: ${modelVersion}`);

    if (modelVersion && modelVersion.includes(':')) {
        modelVersion = modelVersion.split(':')[1];
    }
    
    setModelLoaderToDeleteMode(modelElement);
    fireModelDeletion(modelId, replicateName, modelVersion, modelElement);
    event.stopPropagation();
}

function fireModelDeletion(modelId, replicateName, modelVersion, modelElement) {
    let action = `${CONSTANTS.BACKEND_URL}model/delete`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            modelId: modelId,
            replicateName: replicateName,
            modelVersion: modelVersion,
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from delete model endpoint for id: ', modelId);
            removeModelItem(modelElement);
        },
        error: function (data) {
            console.log("error deleting generation with id: ", modelId);
            console.log('error from endpoint is: ', data);
            resetModelLoaderFromDelete(modelElement);
        }
    });
}

function removeModelItem(modelElement) {
    $(modelElement).fadeOut(function() {
        $(this).remove();
    });
}

function setModelLoaderToDeleteMode(modelElement) {
    let genLoader = modelElement.querySelector('#model-loader');
    let actionContainer = modelElement.querySelector('#action-container');
    genLoader.classList.remove('hidden');
    genLoader.classList.add('bg-opacity-75');
    actionContainer.classList.add('hidden');
}

function resetModelLoaderFromDelete(modelElement) {
    let genLoader = modelElement.querySelector('#model-loader');
    let actionContainer = modelElement.querySelector('#action-container');
    genLoader.classList.add('hidden');
    genLoader.classList.remove('bg-opacity-75');
    actionContainer.classList.remove('hidden');
}

function showStartTrainingSpinner() {
    let startTrainingButtonLabel = document.querySelector('#uploadToServerButton p');
    let startTrainingSpinner = document.querySelector('#uploadToServerButton i');
    startTrainingButtonLabel.classList.add('hidden');
    startTrainingSpinner.classList.remove('hidden');
}

function hideStartTrainingSpinner() {
    let startTrainingButtonLabel = document.querySelector('#uploadToServerButton p');
    let startTrainingSpinner = document.querySelector('#uploadToServerButton i');
    startTrainingButtonLabel.classList.remove('hidden');
    startTrainingSpinner.classList.add('hidden');
}