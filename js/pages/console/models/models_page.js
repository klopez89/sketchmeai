addModelsGrid();
configureNewModelUploadArea();
configureTrainingSubjectField();
configureTrainingForm();

function addModelsGrid() {
    let dummy_grid_html = dummyGridHTML();
    let dummy_grid_div = $($.parseHTML(dummy_grid_html));
    $('#console-content').append(dummy_grid_div);
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
    let minimum_upload_count = getMinimumUploadCount();
    let remaining_upload_count = minimum_upload_count - number_of_uploaded_files;
    let files_to_upload = fileList

    console.log("the remaining upload count is: ", remaining_upload_count);
    console.log("the files to upload are: ", files_to_upload);

    // Read the contents of each file
    for (var i = 0; i < files_to_upload.length; i++) {
        let reader = new FileReader();
        let file = files_to_upload[i];
        let filename = file.name;
        let fileType = file.type;
        let fileSize = file.size;

        if (fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/png') {
            // Return early if the file type is not supported
            return;
        }

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

        reader.readAsDataURL(files[i]);
    }
}


// Upload related constant functions

function updateUploadAreaTitle() {
	let minimumUploadCount = getMinimumUploadCount();
	let numberOfFilesLeftToUpload = (numberOfUploadedFiles() <= minimumUploadCount) ? (minimumUploadCount - numberOfUploadedFiles()) : 0;
	// document.getElementById("upload-caption").innerHTML = "Drag or click to upload " + numberOfFilesLeftToUpload + "+ images";

	// if (numberOfFilesLeftToUpload >= minimumUploadCount) {
	// 	document.getElementById('localUploadInput').value = "";
	// }
}

function numberOfUploadedFiles() {
	let uploadedImages = $("#uploadEntryContainer").find("li");
	return uploadedImages.length;
}

function hasEnoughTrainingData() {
    let number_of_uploaded_files = numberOfUploadedFiles();
	let minimum_upload_count = getMinimumUploadCount();
    return number_of_uploaded_files >= minimum_upload_count
}

function isReadyToBeginNewModelCreation() {
	let number_of_uploaded_files = numberOfUploadedFiles();
	let minimum_upload_count = getMinimumUploadCount();
    let isDataValid = isTrainingDataValid();
	let isReady = number_of_uploaded_files >= minimum_upload_count && isDataValid;
    console.log('isTrainingDataValid: ', isDataValid, 'isReadyToBeginNewModelCreation: ', isReady);
	return isReady;
}

function getMinimumUploadCount() {
	return 3;
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

		// updateUploadAreaTitle();
		toggleUploadAreaVisibility();
		toggleUploadButtonInteraction();
	});

	$('#uploadEntryContainer').children().first().after(upload_entry_element);

	upload_entry_element.find('#uploadedImage')[0].src = file.data;
	// updateUploadAreaTitle();
	toggleUploadAreaVisibility();
	toggleUploadButtonInteraction();
}

function toggleUploadAreaVisibility() {
	let shouldShow = hasEnoughTrainingData();
    console.log('shouldShow: ', shouldShow);

	let $upload_area_button = $($('#uploadAreaButton')[0]);
	if (shouldShow === true && $upload_area_button.find('i').is('.fa-check') === false) {
		$upload_area_button.find('i').removeClass('fa-images');
		$upload_area_button.find('i').addClass('fa-check');
		$upload_area_button.find('span').text('');
	}

	if (shouldShow === false && $upload_area_button.find('i').is('.fa-check') === true) {
		$upload_area_button.find('i').addClass('fa-images');
		$upload_area_button.find('i').removeClass('fa-check');
	}
    
    if (shouldShow === false){
        updateUploadAreaTitle();
    }
}

function toggleUploadButtonInteraction() {
	let sohuldEnable = isReadyToBeginNewModelCreation();
	if (sohuldEnable === true && $('#uploadToServerButton').is("[disabled]") === true) {
		$('#uploadToServerButton').removeAttr('disabled');
		$('#uploadToServerButton').removeClass('bg-gray-200');
		$('#uploadToServerButton').removeClass('hover:bg-gray-200');
		$('#uploadToServerButton').addClass('bg-blue-600');
		$('#uploadToServerButton').addClass('hover:bg-blue-500');
	} 

	if (sohuldEnable === false && $('#uploadToServerButton').is("[disabled]") === false) {
		$('#uploadToServerButton').attr('disabled','');
		$('#uploadToServerButton').addClass('bg-gray-200');
		$('#uploadToServerButton').addClass('hover:bg-gray-200');
		$('#uploadToServerButton').removeClass('bg-blue-600');
		$('#uploadToServerButton').removeClass('hover:bg-blue-500');
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
    let tiLr = document.getElementById('ti-lr').value;
    let loraLr = document.getElementById('lora-lr').value;
    let lrScheduler = document.getElementById('lr-scheduler').value;
    let schedulerCycles = document.getElementById('scheduler-cycles').value;
    let warmupSteps = document.getElementById('warmup-steps').value;
    let validationEpochs = document.getElementById('validation-epochs').value;
    let maxTrainSteps = document.getElementById('max-train-steps').value;
    let mixedPrecision = document.getElementById('mixed-precision').value;
    let xformers = document.getElementById('xformers').checked;
    let gradientCheckpoint = document.getElementById('gradient-checkpoint').checked;
    let bitAdam = document.getElementById('8bit-adam').checked;

    let isDataValid = modelName && modelSelection && trainingSubject && tokenString && seed && resolution && networkRank && batchSize && imageRepeats && unetLr && tiLr && loraLr && lrScheduler && schedulerCycles && warmupSteps && validationEpochs && maxTrainSteps && mixedPrecision && xformers != null && gradientCheckpoint != null && bitAdam != null;
    return isDataValid;
}

function grabTrainingData() {
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
    let tiLr = document.getElementById('ti-lr').value;
    let loraLr = document.getElementById('lora-lr').value;
    let lrScheduler = document.getElementById('lr-scheduler').value;
    let schedulerCycles = document.getElementById('scheduler-cycles').value;
    let warmupSteps = document.getElementById('warmup-steps').value;
    let validationEpochs = document.getElementById('validation-epochs').value;
    let maxTrainSteps = document.getElementById('max-train-steps').value;
    let mixedPrecision = document.getElementById('mixed-precision').value;
    let xformers = document.getElementById('xformers').checked;
    let gradientCheckpoint = document.getElementById('gradient-checkpoint').checked;
    let bitAdam = document.getElementById('8bit-adam').checked;
	let files = getUploadedFiles();
    let userRecId = getUserRecId();
    let modelId = generateId()

    let trainingData = {
        "model-id": modelId,
        "user-rec-id": userRecId,
        "model-name": modelName,
        "model-selection": modelSelection,
        "training-subject": trainingSubject,
        "token-string": tokenString,
        "seed": seed,
        "resolution": resolution,
        "network-rank": networkRank,
        "batch-size": batchSize,
        "image-repeats": imageRepeats,
        "unet-lr": unetLr,
        "ti-lr": tiLr,
        "lora-lr": loraLr,
        "lr-scheduler": lrScheduler,
        "scheduler-cycles": schedulerCycles,
        "warmup-steps": warmupSteps,
        "validation-epochs": validationEpochs,
        "max-train-steps": maxTrainSteps,
        "mixed-precision": mixedPrecision,
        "xformers": xformers,
        "gradient-checkpoint": gradientCheckpoint,
        "8bit-adam": bitAdam,
        "files": files
    };
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
    "ti-lr": "0.00005",
    "lora-lr": "0.00005",
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

function kickoffModelCreation(trainingData) {
    console.log("about to kickoff model gen, w/ training data: ", trainingData);
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
            // startListeningForGenerationUpdates(jsonObject.userRecId, collection_id, generation_id);
        },
        error: function(data) {
            console.log("error");
            console.log(data);
        }
    });
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
}

function configureTrainingSubjectField() {
    document.getElementById('training-subject').addEventListener('change', function() {
        let selectedSubject = this.value;
        let preset;

        switch(selectedSubject) {
            case 'person':
                preset = personTrainingPreset();
                hideObjectNameField();
                console.log('Ready to apply person preset');
                break;
            case 'style':
                // preset = styleTrainingPreset();
                hideObjectNameField();
                console.log('Ready to apply style preset');
                break;
            case 'object':
                // preset = objectTrainingPreset();
                showObjectNameField();
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

function toggleUploadButtonInteraction() {
	let sohuldEnable = isReadyToBeginNewModelCreation();
	if (sohuldEnable === true && $('#uploadToServerButton').is("[disabled]") === true) {
		$('#uploadToServerButton').removeAttr('disabled');
		$('#uploadToServerButton').removeClass('bg-gray-200');
		$('#uploadToServerButton').removeClass('hover:bg-gray-200');
		$('#uploadToServerButton').addClass('bg-blue-600');
		$('#uploadToServerButton').addClass('hover:bg-blue-500');
	} 

	if (sohuldEnable === false && $('#uploadToServerButton').is("[disabled]") === false) {
		$('#uploadToServerButton').attr('disabled','');
		$('#uploadToServerButton').addClass('bg-gray-200');
		$('#uploadToServerButton').addClass('hover:bg-gray-200');
		$('#uploadToServerButton').removeClass('bg-blue-600');
		$('#uploadToServerButton').removeClass('hover:bg-blue-500');
	}
}

function clickedOnEmptyPartOfGrid() {
    console.log('clicked on empty part of grid');
}

function clickedOutsideOfCollectionGrid() {
    console.log('clicked outside of collection grid');
}

function clickedOnNewModelButton(event) {
    event.stopPropagation();
    console.log('clicked on new model button');

    let collectionGridContainer = document.getElementById('collection-grid-container');
    collectionGridContainer.classList.add('opacity-0');
    setTimeout(() => {
        collectionGridContainer.classList.add('hidden');
    }, 100);

    let newFormContainer = document.getElementById('new-form-container');
    newFormContainer.classList.remove('translate-x-full', 'opacity-0');
}

function exitNewModelForm(event) {
    event.preventDefault();
    event.stopPropagation();
    let collectionGridContainer = document.getElementById('collection-grid-container');
    setTimeout(() => {
        collectionGridContainer.classList.remove('opacity-0', 'hidden');
    }, 1000);

    let newFormContainer = document.getElementById('new-form-container');
    newFormContainer.classList.add('translate-x-full', 'opacity-0');
}