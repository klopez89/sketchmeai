
const BASE_URL = "https://sketchmeaibackend-sxgjpzid6q-uk.a.run.app/";

let isSelectable = false;
let isCurrentlyPaginatingPrompts = false;

// Configurations
$('body').attr('id','bodyDiv');
beginInitialDOMConstruction();
configureInfiniteScroll();

let loader_html = centeredLoader_HTML('Loading your image set');
let loader_element = $($.parseHTML(loader_html));
$('body').append(loader_element);
// document.body.classList.add('overflow-hidden');

// Initial API requests
// Slightly delays (even with 0) initial project data in order to mostly have memberstack id readily available but still not 100% realiable. Needs revisiting before launch.
setTimeout(function(){fetchInitialImages()}, 50);


function toggleImageSelectability() {
  isSelectable = !isSelectable;
  const divs = document.querySelectorAll(".selectable");
  const selectionBar = document.querySelector(".selection-bar");
  const selectToShareButton = document.querySelector(".select-to-share-button");
  
  if (isSelectable) {
      selectionBar.classList.remove("hidden");
      selectToShareButton.classList.remove("bg-blue-600", "text-white", "hover:bg-blue-500");
      selectToShareButton.classList.add("bg-transparent", "text-gray-500", "hover:bg-gray-200");
      selectToShareButton.textContent = 'Cancel';
  } else {
      selectionBar.classList.add("hidden");
      selectToShareButton.classList.remove("bg-transparent", "text-gray-500", "hover:bg-gray-200");
      selectToShareButton.classList.add("bg-blue-600", "text-white", "hover:bg-blue-500");
      selectToShareButton.textContent = 'Select to Share';
  }
  
  divs.forEach(div => {
    configureSelectableDiv(div);
  });

  updateShareButton();
}

function configureSelectableDiv(div) {
  console.log('The div in configureSelectableDiv is: ', div);
  const checkbox = div.querySelector(".checkbox");
  const selectionOverlay = div.querySelector(".selection-overlay");

  if (isSelectable) {
      checkbox.classList.remove("hidden"); 
      selectionOverlay.classList.remove("pointer-events-none");         
  } else {
      div.classList.remove("selected");
      checkbox.classList.add("hidden");
      checkbox.classList.remove("fa-check-circle");
      checkbox.classList.add("fa-circle");
      selectionOverlay.classList.add("pointer-events-none"); 
      const overlay_bg = div.querySelector(".overlay-bg");
      overlay_bg.classList.remove("bg-white", "opacity-50");
  }
}

function hideLoader() {
	let loader = document.getElementById('loader');
	if (loader != null) {
		loader.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
	}
}

function showLoader() {
	let loader = document.getElementById('loader');
	if (loader != null) {
		loader.style.display = 'block';
	}
}

function fetchInitialImages() {
  ready_response = checkIfReadyToFetchGeneratedImages()
  should_fetch_generated_images = ready_response['should_fetch_generated_images']

  console.log(`Should fetch generated images: ${should_fetch_generated_images}`);
  if (should_fetch_generated_images === false) {
    console.log("Encourage the user to try it out themselves, linking back to home page probably");
    return
  }

  var jsonPayload = {
    user_rec_id : ready_response['user_rec_id'],
    image_set_name : ready_response['image_set_name'],
    last_doc_id : null,
  }

  console.log("img_package/predictions json payload is: ", jsonPayload);
  var action = `${BASE_URL}img_package/predictions`;

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // Grab useful info from response
      let prediction_list = response['predictions'];
      let last_doc_id = response['last_doc_id'];
      console.log('First last doc id: ', last_doc_id)
      console.log("Fell into success block for prediction set fetching w/ list count: ", prediction_list.length);
      appendPrompts_onDOM(prediction_list);

      setTimeout(function() {
        show_initial_images(last_doc_id);
      }, 300);
    },
    error: function (msg) {
      console.log("Fell into failure block for prediction set fetching, msg: ", msg);
    },
  });
}

function show_initial_images(last_doc_id) {
  hideLoader()
  saveLastDocIdLocally(last_doc_id);
  // configureInfiniteScroll();
}

function saveLastDocIdLocally(last_doc_id) {
  localStorage.setItem('last_doc_id', last_doc_id);
}

function getLastDocIdFromLocalStorage() {
  return localStorage.getItem('last_doc_id');
}

function fetchNextSetOfImages(last_doc_id) {
  console.log('The last doc id from fetchNextSetOfImages is: ', last_doc_id);
  var action = `${BASE_URL}img_package/predictions`;
  var jsonPayload = {
    user_rec_id : ready_response['user_rec_id'],
    image_set_name : ready_response['image_set_name'],
    last_doc_id : last_doc_id,
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // Grab useful info from response
      console.log('The response from fetchNextSetOfImages is: ', response);
      let prediction_list = response['predictions'];
      let last_doc_id = response['last_doc_id'];

      if (prediction_list == null) {
        console.log('Didnt find any more images to load. all done paginating!');
        hideInfiniteLoader();
        saveLastDocIdLocally(null);
        setTimeout(function() {
          isCurrentlyPaginatingPrompts = false;
        }, 50);
        return
      }

      console.log("Got some new images to add to the list, length of new image list is", prediction_list.length);
      console.log('Last doc id: ', last_doc_id);
      appendPrompts_onDOM(prediction_list);
      saveLastDocIdLocally(last_doc_id);
      isCurrentlyPaginatingPrompts = false;
    },
    error: function (msg) {
      console.log("Fell into failure block for fetchNextSetOfImages, msg: ", msg);
    },
  });
}

function hideInfiniteLoader() {
  let infiniteLoader = document.getElementById('infiniteLoader');
  if (infiniteLoader != null) {
    infiniteLoader.classList.add('hidden');
  }
}

function checkIfReadyToFetchGeneratedImages() {
  const url_params = new URLSearchParams(window.location.search);
  const user_rec_id = url_params.get('user_rec_id');
  const image_set_name = url_params.get('image_set_name');
  const short_model_name = url_params.get('short_model_name');

  const should_fetch_generated_images = (user_rec_id != null) && (image_set_name != null)

  return {
    should_fetch_generated_images : should_fetch_generated_images,
    user_rec_id : user_rec_id,
    image_set_name : image_set_name,
    short_model_name : short_model_name
  }
}

function downloadAll() {
  ready_response = checkIfReadyToFetchGeneratedImages()
  should_fetch_generated_images = ready_response['should_fetch_generated_images']

  if (should_fetch_generated_images === false) {
    console.log("Encourage the user to try it out themselves, linking back to home page probably");
    return
  }

  var jsonPayload = {
    user_rec_id : ready_response['user_rec_id'],
    image_set_name : ready_response['image_set_name'],
    short_model_name : ready_response['short_model_name']
  }

  let download_all_button = document.getElementById("downloadAllButton");
  download_all_button.innerHTML = "Loading...";

  var action = `${BASE_URL}img_package/predictions/zipfile`;
  console.log("about to hit the endpoint: ", action);
  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // Grab useful info from response
      let zip_url = response['zip_url'];

      if (zip_url == null) {
        console.log('Found that the zip file url is null!');
        return
      }

      download_all_button = document.getElementById("downloadAllButton");
      download_all_button.setAttribute("download-link", zip_url);
      download_all_button.innerHTML = "Download All";

      console.log("Fell into success block for getting the set zip file url: ", zip_url);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = zip_url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    error: function (msg) {
      console.log("Fell into failure block for getting zip file url, msg: ", msg);
      download_all_button = document.getElementById("downloadAllButton");
      download_all_button.innerHTML = "Download All";
    },
  });
}


// DOM Construction

function beginInitialDOMConstruction() {
  addStartingElements();
}

function addStartingElements() {
  let row = startingElements();
  let row_element = $($.parseHTML(row));
  $('body').append(row_element);
}


// DOM-Changing Functions

function appendPrompts_onDOM(prediction_list) {
  for (let i = 0; i < prediction_list.length; i++) {
    let prediction = prediction_list[i];
    var predictionJson = {
      imageUrl : prediction['signed_img_url'],
      thumbnailImageUrl : prediction['thumbnail_signed_img_url'],
      promptId : prediction['rec_id'], 
      recipeTheme : prediction['recipe_theme']
    };
    let shouldLazyLoad = true;
    let prompt_div = promptDiv(predictionJson,shouldLazyLoad);

    // Get the nodes from the prompt div in order to stylize for selection state
    let nodes = $.parseHTML(prompt_div);

    // Style the prompt div 'dom element' for selection state
    if (isSelectable) {
      let domElement = nodes.find(node => node.nodeType === Node.ELEMENT_NODE);
      configureSelectableDiv(domElement);
    }

    let prompt_div_element = $(nodes);

    let selection_overlay = prompt_div_element.find(".selection-overlay");
    selection_overlay.on("click", function(event) {
        console.log("Clicked on a prompt div for selection!");
        if (isSelectable) {
            $(this).parent().toggleClass("selected");
            updateShareButton();
            let overlay_bg = $(this).find(".overlay-bg");
            
            const checkbox = $(this).parent().find(".checkbox");
            if ($(this).parent().hasClass("selected")) {
                console.log('has selected class!');
                checkbox.removeClass("fa-circle");
                checkbox.addClass("fa-check-circle");
                selection_overlay.addClass("bg-opacity-50");
                overlay_bg.addClass("bg-white opacity-50");
            } else {
                console.log('does not have selected class!');
                checkbox.removeClass("fa-check-circle");
                checkbox.addClass("fa-circle");
                overlay_bg.removeClass("bg-white opacity-50");
            }
        }
    });

    prompt_div_element.hide().appendTo("#promptListContainer").fadeIn();
  }
}

function updateShareButton() {
  let selectedCount = $('div.selectable.selected').length;
  let shareButton = $('.share-button');
  if (selectedCount > 0) {
    shareButton.removeClass('bg-gray-300');
    shareButton.addClass('bg-blue-600 hover:bg-blue-500');
    shareButton.prop('disabled', false);
  } else {
    shareButton.addClass('bg-gray-300');
    shareButton.removeClass('bg-blue-600 hover:bg-blue-500');
    shareButton.prop('disabled', true);
  }
}

function shareButtonPressed() {
  console.log('Share button pressed!');
  prepareImagesForSharing();
}

function prepareImagesForSharing() {
  let selectedImages = $('div.selectable.selected img');
  let imageUrls = selectedImages.map(function() {
    return $(this).attr('data-te-img');
  }).get();

  if (navigator.share) {
    generateFileArray(imageUrls).then(fileArray => {
      console.log(fileArray); // Array of File objects
      navigator.share({
        files: fileArray,
        title: 'Shared Images',
        text: 'Here are some images I thought you might like.'
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    });
  } else {
    console.log('Web Share API not supported in this browser');
  }
}

async function urlToFile(url, filename, mimeType) {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], filename, { type: mimeType });
}

async function generateFileArray(imageUrls) {
  const fileArray = [];
  for (let url of imageUrls) {
    const file = await urlToFile(url, 'filename.png', 'image/png');
    fileArray.push(file);
  }
  return fileArray;
}


function configureInfiniteScroll() {
  // Get a scrollable container using an id attribute
  const scrollableContainer = document.getElementById("promptListContainer");
  // Add an event listener to the scrollable container. The event below is triggered when a user scrolls to the end of the container
  console.log('the scrollableContainer in configureInfiniteScroll is: ', scrollableContainer)
  
  window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (isCurrentlyPaginatingPrompts) {
        // console.log("Already paginating prompts, so don't do it again!");
        return
      } else {
        isCurrentlyPaginatingPrompts = true;
        const last_doc_id = getLastDocIdFromLocalStorage();
        if (last_doc_id != "null") {
          fetchNextSetOfImages(last_doc_id);
        }
      }
    }
  });
}

