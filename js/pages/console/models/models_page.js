addModelsGrid();
configureNewModelUploadArea();
configureTrainingSubjectField();

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

	let number_of_uploaded_files = numberOfUploadedFiles();
	let maximum_upload_count = getMaxUploadCount();

	if (isReadyToBeginNewModelCreation()) {
		console.log("ready to hit the new endpoint to kick off new model");
		// beginNewModelCreation();
	} else {
		console.log('time to show local upload flow');
		let localUploadInput = document.getElementById('localUploadInput');
		localUploadInput.click();
	}
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
	 let number_of_new_files = fileList.length;
	 let number_of_uploaded_files = numberOfUploadedFiles();
	 let maximum_upload_count = getMaxUploadCount();

	 console.log(typeof fileList);


	if (isReadyToBeginNewModelCreation()) {
	  console.log("Maximum number of files reached. No more files can be uploaded.");

	} else {
	  let remaining_upload_count = maximum_upload_count - number_of_uploaded_files;
	  let files_to_upload = fileList.slice(0, remaining_upload_count);

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
}


// Upload related constant functions

function updateUploadAreaTitle() {
	let numberOfFilesLeftToUpload = (numberOfUploadedFiles() <= 10) ? (10 - numberOfUploadedFiles()) : 0;
	document.getElementById("upload-caption").innerHTML = "Drag or click to upload " + numberOfFilesLeftToUpload + " images";
	if (numberOfFilesLeftToUpload === getMaxUploadCount()) {
		document.getElementById('localUploadInput').value = "";
	}
}

function numberOfUploadedFiles() {
	let uploadedImages = $("#uploadEntryContainer").find("li");
	return uploadedImages.length;
}

function isReadyToBeginNewModelCreation() {
	let number_of_uploaded_files = numberOfUploadedFiles();
	let maximum_upload_count = getMaxUploadCount();
	return number_of_uploaded_files >= maximum_upload_count;
}

function getMaxUploadCount() {
	return 10;
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

		updateUploadAreaTitle();
		toggleUploadAreaVisibility();
		toggleUploadButtonInteraction();
	});

	$('#uploadEntryContainer').prepend(upload_entry_element);

	upload_entry_element.find('#uploadedImage')[0].src = file.data;
	updateUploadAreaTitle();
	toggleUploadAreaVisibility();
	toggleUploadButtonInteraction();
}

function toggleUploadAreaVisibility() {
	let shouldShow = !isReadyToBeginNewModelCreation();
	let $upload_area_button = $($('#uploadAreaButton')[0]);
	if (isReadyToBeginNewModelCreation() === true && $upload_area_button.find('i').is('.fa-check') === false) {
		$upload_area_button.find('i').removeClass('fa-images');
		$upload_area_button.find('i').addClass('fa-check');
		$upload_area_button.find('span').text('Ready to upload');
	}

	if (isReadyToBeginNewModelCreation() === false && $upload_area_button.find('i').is('.fa-check') === true) {
		$upload_area_button.find('i').addClass('fa-images');
		$upload_area_button.find('i').removeClass('fa-check');
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

function checkTrainingData() {
    let modelName = document.getElementById('model-name').value;
    let modelSelection = document.getElementById('model-selection').value;
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
    "max-train-steps": "1000",
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
