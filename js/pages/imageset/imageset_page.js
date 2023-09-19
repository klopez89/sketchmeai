
const BASE_URL = "https://sketchmeaibackend-sxgjpzid6q-uk.a.run.app/";

// Configurations
$('body').attr('id','bodyDiv');
beginInitialDOMConstruction();

// Initial API requests
// Slightly delays (even with 0) initial project data in order to mostly have memberstack id readily available but still not 100% realiable. Needs revisiting before launch.
setTimeout(function(){fireTestForPredictionSetFetching()}, 50);


function fireTestForPredictionSetFetching() {
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
      console.log("Fell into success block for prediction set fetching w/ list count: ", prediction_list.length);
      clearListOfPrompts_onDOM();
      appendPrompts_onDOM(prediction_list);
    },
    error: function (msg) {
      console.log("Fell into failure block for prediction set fetching, msg: ", msg);
    },
  });
}

function checkIfReadyToFetchGeneratedImages() {
  const url_params = new URLSearchParams(window.location.search);
  const user_rec_id = url_params.get('user_rec_id');
  const image_set_name = url_params.get('image_set_name');

  const should_fetch_generated_images = (user_rec_id != null) && (image_set_name != null)

  return {
    should_fetch_generated_images : should_fetch_generated_images,
    user_rec_id : user_rec_id,
    image_set_name : image_set_name,
  }
}

function downloadSingleImage(image_url, lb_download_btn_element) {
  // var ms_member_id = $('div[data-ms-member]').text()
  // if (typeof ms_member_id == 'undefined') {
  //   console.log("We don't have a member id loaded in just yet! Take user to the login page >>> TODO");
  //   //setTimeout(fireProjectFetch, 1000);
  //   return
  // } else {
  //   console.log("We have a signed in member :)");
  // }

  // var jsonPayload = {
  //   member_id : member_id,
  //   prompt_id: prompt_id
  // }

  // TODO: make lb_download_btn_element show fa-spinner and fa-spin



  // download_all_button = document.getElementById("downloadAllButton");
  // download_all_button.setAttribute("download-link", image_url);
  // download_all_button.innerHTML = "Download All";

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = image_url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function downloadAll() {
  // Confirm that the user wants to download all images
  const url_params = new URLSearchParams(window.location.search);
  const member_id = url_params.get('member_rec_id');
  const recipe_set = url_params.get('recipe_set');
  const model_rec_id = url_params.get('model_rec_id');
  const queue_event_rec_id = url_params.get('queue_event_rec_id');

// TODO: enable later for production
  // if (ms_member_id == member_id) {
  //   console.log("Allow the downloading process to continue!")
  // } else {
  //   console.log("Don't allow the downloading process to continue since not the owner :)")
  //   return
  // }

  var jsonPayload = {
    member_id : member_id,
    recipe_set: recipe_set,
    model_rec_id: model_rec_id
  }

  let download_all_button = document.getElementById("downloadAllButton");
  download_all_button.innerHTML = "Loading...";

  var action = "https://whollyai-5k3b37mzsa-ue.a.run.app/predictions/zipfile";
  console.log("about to hit the endpoint: ", action);
  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // Grab useful info from response
      let zip_file_url = response['zip_file_url'];

      download_all_button = document.getElementById("downloadAllButton");
      download_all_button.setAttribute("download-link", zip_file_url);
      download_all_button.innerHTML = "Download All";

      console.log("Fell into success block for getting the set zip file url: ", zip_file_url);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = zip_file_url;
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

function downloadFavorites() {
  // Confirm that the user wants to download all images
  const url_params = new URLSearchParams(window.location.search);
  const member_id = url_params.get('member_rec_id');
  const recipe_set = url_params.get('recipe_set');
  const model_rec_id = url_params.get('model_rec_id');
  const queue_event_rec_id = url_params.get('queue_event_rec_id');


// TODO: enable later for production
  // if (ms_member_id == member_id) {
  //   console.log("Allow the downloading process to continue!")
  // } else {
  //   console.log("Don't allow the downloading process to continue since not the owner :)")
  //   return
  // }

  var jsonPayload = {
    member_id : member_id,
    recipe_set: recipe_set,
    model_rec_id: model_rec_id
  }

  download_faves_button = document.getElementById("downloadFavesButton");
  download_faves_button.innerHTML = "Loading...";

  var action = "https://whollyai-5k3b37mzsa-ue.a.run.app/predictions/favorites/zipfile";
  console.log("about to hit the endpoint: ", action);
  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // Grab useful info from response
      let zip_file_url = response['zip_file_url'];

      download_faves_button = document.getElementById("downloadFavesButton");
      download_faves_button.setAttribute("download-link", zip_file_url);
      download_faves_button.innerHTML = "Download Favorites";

      console.log("Fell into success block for getting the set zip file url: ", zip_file_url);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = zip_file_url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    error: function (msg) {
      console.log("Fell into failure block for getting zip file url, msg: ", msg);
      download_faves_button = document.getElementById("downloadFavesButton");
      download_faves_button.innerHTML = "Download Favorites";
    },
  });
}







// Lazy loading past prompt images
function makeDOMAwareOfNewLazyLoadableImages() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  // var lightBoxLinkDivs = document.querySelectorAll("#historic-prompts-container > a");

  console.log("Add lady image observer was called and we have these lazy images: ", lazyImages);

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          let linkBoxLink = lazyImage.parentElement;
          linkBoxLink.href = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
}

// DOM Construction

function beginInitialDOMConstruction() {
  addBaseRow();
  addBothColumns();
  addPromptEntryContainerToLeftColumn();
  // addPromptEntryFormToContainer();

  addDownloadAllButton();
  addDownloadFavesbutton();

  addPromptListContainerToRightColumn();
  addPromptListToContainer();
}

function addBaseRow() {
  let row = mainPromptRow();
  let row_element = $($.parseHTML(row));
  $('body').append(row_element);
}

function addBothColumns() {
  let prompt_entry_column = promptEntryColumn();
  let prompt_list_column = promptListColumn();
  
  let prompt_entry_column_element = 
  $($.parseHTML(prompt_entry_column));
  let prompt_list_column_element = 
  $($.parseHTML(prompt_list_column));
  
  $('#mainPromptingRow').append(prompt_entry_column_element);
  $('#mainPromptingRow').append(prompt_list_column_element);
}

function addPromptEntryContainerToLeftColumn() {
  let prompt_entry_container = promptEntryContainer();
  let prompt_entry_container_element = 
  $($.parseHTML(prompt_entry_container));
  $('#promptEntryColumn').append(prompt_entry_container_element);
}

function addPromptEntryFormToContainer() {
  let form_title = "Prompt:";
  let form_placeholder = 
  "i.e. portrait of a sea monster, photorealisitc";
  let prompt_form = 
  promptGenerationForm(form_title,form_placeholder);
  let prompt_form_element = $($.parseHTML(prompt_form));
  prompt_form_element.children("#promptInput").attr('placeholder',form_placeholder);
  $('#promptEntryContainer').append(prompt_form_element);

  addListenerForRandomSeedCheckmarkOption();
  configureNewModelUploadArea();
  const modelDropdown = document.getElementById("modelDropdown");
  const options = modelDropdown.options;

  for (const option of options) {
    option.style.paddingTop = "10px";
    option.style.paddingBottom = "10px";
  }
}

function addListenerForRandomSeedCheckmarkOption() {
  document.getElementById('checkboxForSameRandomSeed').addEventListener('click', function() {
    const span = document.getElementById('checkboxForSameRandomSeed');
    if (span.classList.contains('fa-square')) {
      span.classList.remove('fa-square');
      span.classList.add('fa-check-square');
    } else {
      span.classList.remove('fa-check-square');
      span.classList.add('fa-square');
    }
  });
}

function addPromptListContainerToRightColumn() {
  let prompt_list_container = promptListContainer();
  let prompt_list_container_element = 
  $($.parseHTML(prompt_list_container));
  $('#promptListColumn').append(prompt_list_container_element);
}

function addDownloadAllButton() {
  let button_html = downloadAllButton();
  let button_element = $($.parseHTML(button_html));
  $('#promptListColumn').append(button_element);
}

function addDownloadFavesbutton() {
    let button_html = downloadFavoritesButton();
  let button_element = $($.parseHTML(button_html));
  $('#promptListColumn').append(button_element);
}

function addPromptListToContainer() {
  for (let i = 0; i < 8; i++) {
    let imageSrc = PlaceholderImageStr();
 
    let shouldLazyLoad = false

    var emptyPromptJson = {
      imageUrl: imageSrc,
      selectedIdea: "",
      promptId: "",
      prompt: "",
      negativePrompt: "",
      guidanceScale: 0.0,
      seed: 0,
      modelName: "",
      modelVersion: "",
      creationDate : "",
      genTime : 0,
      shorterSummary : "",
      summary : "",
    }

    let prompt_list = promptDiv(emptyPromptJson,shouldLazyLoad);
    let prompt_list_element = $($.parseHTML(prompt_list));
    
    // Modifiy the elements to be real dumb
    prompt_list_element.children(".content").children("a").children("img").removeClass("lazy"); // we don't need the lazy loadifier to pick process these! or else you get ?s
    prompt_list_element.children(".content").children("a").removeAttr("data-lightbox");
    prompt_list_element.children(".content").children("a").removeAttr("href");
    prompt_list_element.children(".content").children("#metadata-div").remove();
    prompt_list_element.hide().prependTo("#promptListContainer").fadeIn();
  }
}

function addMemberIdDiv() {
  let member_id_div = memberIdDiv();
  let member_id_div_element = $($.parseHTML(member_id_div));
  $('body').append(member_id_div_element);
}

function beginConstructionOfProjNavigationBar() {
  addBaseForProjNavigationMenu();
  addProjSelectorContainerInProjDropdownWrapper();
  addIdeaSelectorContainerInIdeaDropdownWrapper();
  addEditButtonWrapper();
  
  addProjDropdownContentDiv();
  addIdeaDropdownContentDiv();
}

function addBaseForProjNavigationMenu() {
  let projNavigationMenuHTML = baseForProjectNavigationMenu();
  let projNavigationMenuElement = $($.parseHTML(projNavigationMenuHTML));
  $('#promptEntryColumn').prepend(projNavigationMenuElement);
}

function addProjSelectorContainerInProjDropdownWrapper() {
  let selectedProjectName = 'Loading...';
  let containerHTML = projectSelectorContainer(selectedProjectName);
  let projSelectorContainerElement = $($.parseHTML(containerHTML));
  $('#projDropdownWrapper').append(projSelectorContainerElement);
}

function addIdeaSelectorContainerInIdeaDropdownWrapper() {
  let selectedIdeaName = 'Loading...';
  let containerHTML = ideaSelectorContainer(selectedIdeaName);
  let ideaSelectorContainerElement = $($.parseHTML(containerHTML));
  $('#ideaDropdownWrapper').append(ideaSelectorContainerElement);
}

function addProjDropdownContentDiv() {
  let dropdownContentHTML = projectDropdownContent();
  let dropdownContentElement = $($.parseHTML(dropdownContentHTML));
  $('#projDropdownWrapper').append(dropdownContentElement);
}

function addNewProjInProjectDropdown() {
  let newProjectDropdownHTML = newProjectContentContainer();
  let newProjectDropdownElement = $($.parseHTML(newProjectDropdownHTML));
  $('#projectDropdownContent').append(newProjectDropdownElement);
  document.getElementById("newProjectLink").addEventListener("click", userTappedNewProject);
}

function addIdeaDropdownContentDiv() {
  let dropdownContentHTML = ideaDropdownContent();
  let dropdownContentElement = $($.parseHTML(dropdownContentHTML));
  $('#ideaDropdownWrapper').append(dropdownContentElement);
}

function addNewIdeaInIdeaDropdown() {
  let newIdeaDropdownHTML = newIdeaContentContainer();
  let newIdeaDropdownElement = $($.parseHTML(newIdeaDropdownHTML));
  $('#ideaDropdownContent').append(newIdeaDropdownElement);
  document.getElementById("newIdeaLink").addEventListener("click", userTappedNewIdea);
}

function addHorizontalDividerInProjDropdown(afterDivId) {
  let horizontalDividerHTML = horizontalDividerDiv();
  let horizontalDividerElement = $($.parseHTML(horizontalDividerHTML));
  if (afterDivId == undefined) {
    $('#projectDropdownContent').append(horizontalDividerElement);
  } else {
    horizontalDividerElement.insertAfter(afterDivId);
  }
}

function addHorizontalDividerInIdeaDropdown(afterDivId) {
  let horizontalDividerHTML = horizontalDividerDiv();
  let horizontalDividerElement = $($.parseHTML(horizontalDividerHTML));
  if (afterDivId == undefined) {
    $('#ideaDropdownContent').append(horizontalDividerElement);
  } else {
    horizontalDividerElement.insertAfter(afterDivId);
  }
}

function addEditButtonWrapper() {
  let editButtonWrapperHTML = editButtonWrapper();
  let editButtonWrapperElement = $($.parseHTML(editButtonWrapperHTML));
  $('#organizerMenuContainer').append(editButtonWrapperElement);
  document.getElementById("editButtonContainer").addEventListener("click", userTappedEditProject);
}


// DOM-Changing Functions

function promptSummaryTexts(promptJson) {
  const prompt = promptJson.prompt;
  const negPrompt = promptJson.negativePrompt;
  const guidanceScale = promptJson.guidanceScale;
  const seed = promptJson.seed;
  const modelName = promptJson.modelName;
  const index = modelName.indexOf('/');
  const shortModelName = modelName.substring(index + 1);
  const creationDate = promptJson.creationDate;
  const genTime = Math.round(promptJson.genTime);

  let shorterPromptSummary = `<a class="prompt-detail-copy-link" href="#" prompt-detail="negPrompt" val="${negPrompt}" onClick="copyPromptDetail(this)">negPrompt: </a>${negPrompt}` + 
    `<br><a class="prompt-detail-copy-link" href="#" prompt-detail="gScale" val=${guidanceScale} onClick="copyPromptDetail(this)">gScale: </a>${guidanceScale}` + 
    `<br><a class="prompt-detail-copy-link" href="#" prompt-detail="seed" val=${seed} onClick="copyPromptDetail(this)">seed: </a>${seed}` + 
    `<br><a class="prompt-detail-copy-link" href="#" prompt-detail="modelName" val=${modelName} onClick="copyPromptDetail(this)">model: </a>${shortModelName}`

  let promptSummary = `<a class="prompt-detail-copy-link" href="#" prompt-detail="prompt" val="${prompt}" onClick="copyPromptDetail(this)">${prompt}</a>`;

  return {
    shorterSummary : shorterPromptSummary,
    summary : promptSummary
  }
}

function appendPrompts_onDOM(prediction_list) {

  for (let x in prediction_list) {
    let prediction = prediction_list[x];

    var predictionJson = {
      imageUrl : prediction['signed_img_url'],
      promptId : prediction['rec_id'], 
    };

    // TODO: update naming to predictions vs prompts for final site

    let shouldLazyLoad = true
    let prompt_div = promptDiv(predictionJson,shouldLazyLoad);
    let prompt_div_element = $($.parseHTML(prompt_div));
    prompt_div_element.hide().appendTo("#promptListContainer").fadeIn();
  }
  setTimeout(makeDOMAwareOfNewLazyLoadableImages, 50);
}

function clearListOfPrompts_onDOM() {
  $('#promptListContainer').empty();
}

function appendProgressBar_onDOM(lastPromptDiv, parentClass) {
  unhideNewestPromptContainer(lastPromptDiv)
  addProgressBarToNewestPromptContainer(parentClass);
}

function unhideNewestPromptContainer(lastPromptDiv) {
  let placeholderDiv = $(".promptList-container").children().first();
  setTimeout(unhideProgressContainer_onDOM, 50, placeholderDiv);
}

function addProgressBarToNewestPromptContainer(parentClass) {
  let pb = new Progress(5, 0, 99, {parent : ".prog-container"});

  //arg1 -> step length, arg2 -> time(ms)
  pb.startTo(10, 670);

  //end to progress after 6s 
  setTimeout( () => {
  pb.end()
  }, 7000)
}

function appendSinglePromptForLoading_onDOM() {
  let imageSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; //clear placeholder image
  let promptText = "";
  let creationDate = "";  
  let shouldLazyLoad = true;

  let promptJson = {
    imageUrl : imageSrc,
    promptId : "", 
    prompt : "",
    negativePrompt : "",
    guidanceScale : 0.0,
    seed : 0,
    modelName : "",
    modelVersion : "",
    shorterSummary : "",
    summary : "",
  };

  let prompt_div = promptDiv(promptJson,shouldLazyLoad);
  let prompt_div_element = $($.parseHTML(prompt_div));


  prompt_div_element.children(".content").children("a").children("img").removeClass("lazy"); //new prompts don't need to be lazy
  prompt_div_element.hide().prependTo("#promptListContainer").fadeIn();
  return prompt_div_element
}



function setupLikeButton(promptElement) {
  let config = {
    action                      : 'prediction/toggle/like',
    font_awesome_class          : 'fa-thumbs-up',
    lightbox_attr               : 'data-is-liked',
    $prompt_div                 : promptElement,
    social_btn_container_id     : 'likeButton',
    lb_social_btn_container_id  : 'lbLikeButton'
  }
  setupPromptListSocialButton(config);
}

function setupFavoritingButton(promptElement) {
  let config = {
    action                      : 'prediction/toggle/favorite',
    font_awesome_class          : 'fa-heart',
    lightbox_attr               : 'data-is-favorited',
    $prompt_div                 : promptElement,
    social_btn_container_id     : 'heartButton',
    lb_social_btn_container_id  : 'lbFavButton'
  }
  setupPromptListSocialButton(config);
}

function setupFlaggingButton(promptElement) {
  let config = {
    action                      : 'prediction/toggle/flag',
    font_awesome_class          : 'fa-flag',
    lightbox_attr               : 'data-is-flagged',
    $prompt_div                 : promptElement,
    social_btn_container_id     : 'flagButton',
    lb_social_btn_container_id  : 'lbFlagButton'
  }
  setupPromptListSocialButton(config);
}

function setupPromptListSocialButton(config) {
  let $social_button_container = $(config.$prompt_div.children(".content").children('.prompt-social-container').children(`#${config.social_btn_container_id}`)[0]);
  console.log(`prompt div: ${config.$prompt_div}, and social button container: ${$social_button_container}`);

  $social_button_container.click(function() {
    let prediction_id = $social_button_container.attr('prediction-id');
    let social_button = $social_button_container.children("i")[0];
    let class_list = social_button.classList;
    let is_selected = class_list.contains('selected');
    let new_value = !is_selected;

    let $lightbox_social_btn_container = $($(`#${config.lb_social_btn_container_id}`)[0]);

    let toggle_config = {
      action                  : config.action,
      font_awesome_class      : config.font_awesome_class,
      lightbox_attr           : config.lightbox_attr,
      is_selected             : new_value,
      prediction_id           : prediction_id,
      $first_btn_container    : $social_button_container,
      $second_btn_container   : $lightbox_social_btn_container
    }

    toggleSocialButton(toggle_config);
  });
}

function toggleLike(is_selected, prediction_id, $first_btn_container, $second_btn_container) {
  let config = {
    action                : 'prediction/toggle/like',
    font_awesome_class    : 'fa-thumbs-up',
    lightbox_attr         : 'data-is-liked',
    is_selected           : is_selected,
    prediction_id         : prediction_id,
    $first_btn_container   : $first_btn_container,
    $second_btn_container  : $second_btn_container
  }
  toggleSocialButton(config);
}
function toggleFavorite(is_selected, prediction_id, $first_btn_container, $second_btn_container) {
  let config = {
    action                : 'prediction/toggle/favorite',
    font_awesome_class    : 'fa-heart',
    lightbox_attr         : 'data-is-favorited',
    is_selected           : is_selected,
    prediction_id         : prediction_id,
    $first_btn_container   : $first_btn_container,
    $second_btn_container  : $second_btn_container
  }
  toggleSocialButton(config);
} 

function toggleFlag(is_selected, prediction_id, $first_btn_container, $second_btn_container) {
  let config = {
    action                : 'prediction/toggle/flag',
    font_awesome_class    : 'fa-flag',
    lightbox_attr         : 'data-is-flagged',
    is_selected           : is_selected,
    prediction_id         : prediction_id,
    $first_btn_container   : $first_btn_container,
    $second_btn_container  : $second_btn_container
  }
  toggleSocialButton(config);
}

function toggleSocialButton(config) {
  let $first_button = $(config.$first_btn_container.children("i")[0]);
  $first_button.removeClass(config.font_awesome_class);
  $first_button.addClass('fa-spinner');
  $first_button.addClass('fa-spin');

  let $secondary_button = $(config.$second_btn_container.children("i")[0]);
  $secondary_button.removeClass(config.font_awesome_class);
  $secondary_button.addClass('fa-spinner');
  $secondary_button.addClass('fa-spin');

  let action = `https://whollyai-5k3b37mzsa-ue.a.run.app/${config.action}`;
  let json_payload = {
    new_value     : config.is_selected,
    prediction_id : config.prediction_id
  };

  console.log("about to hit the social button toggle endpoint: ", action);
  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(json_payload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // update the buttons from loading to new value
      setSocialInteractionButtonToProperState(config.is_selected, $first_button, config.font_awesome_class);
      setSocialInteractionButtonToProperState(config.is_selected, $secondary_button, config.font_awesome_class);
      // update the state for lightbox via the lightbox link (or  else the old state will override the newly set one)
      $(`a[data-prompt-id=${config.prediction_id}]`).attr(config.lightbox_attr, config.is_selected);
    },
    error: function (msg) {
      console.log("Fell into failure block for toggling favorite (so fallback to previously known value, msg: ", msg);
      $first_button.removeClass('fa-spinner');
      $first_button.removeClass('fa-spin');
      $first_button.addClass(config.font_awesome_class);
      $secondary_button.removeClass('fa-spinner');
      $secondary_button.removeClass('fa-spin');
      $secondary_button.addClass(config.font_awesome_class);
    },
  });
}

// the button is actually an <i> HTML element that houses the font awesome text for the parent button or div (todo, should be all buttons)
function setSocialInteractionButtonToProperState(is_selected, button, fa_name) {
  if (button == null) { return }
  button.removeClass('fa-spinner');
  button.removeClass('fa-spin');
  button.addClass(fa_name);
  if (is_selected == true) {
    button.addClass('selected');
  } else {
    button.removeClass('selected');
  }
}






function findPromptById(promptId) {
  // Find the prompt div with the given id
  var promptDiv = document.getElementById(promptId);
  if (!promptDiv) {
    return null; // Return null if the prompt div was not found
  }

  // Return a JSON object containing the values of the prompt, negPrompt, gScale, seed, modelName, and modelVersion attributes of the prompt div
  return {
    prompt: promptDiv.getAttribute('prompt'),
    negPrompt: promptDiv.getAttribute('negPrompt'),
    gScale: promptDiv.getAttribute('gscale'),
    seed: promptDiv.getAttribute('seed'),
    modelName: promptDiv.getAttribute('modelname'),
    modelVersion: promptDiv.getAttribute('modelversion')
  };
}

function setPromptValuesFromCopy(promptJson) {
  //prompt, negPrompt, gscale, seed, model

  // Set the value of the input element with id 'negPromptInput' to the given negPrompt
  document.getElementById('negPromptInput').value = promptJson.negPrompt;

  // Set the value of the input element with id 'gscale' to the given gscale
  // and the value of the slider element with id 'guidance_slider' to the given gscale
  document.getElementById('gscale').value = promptJson.gScale;
  document.getElementById('guidance_slider').value = promptJson.gScale;

  // Set the value of the input element with id 'seed' to the given seed
  document.getElementById('seed').value = promptJson.seed;

  // Select the option from the multi-select element with id 'modelDropdown' that has the given model name
  var options = document.getElementById('modelDropdown').options;
  var selected = false; // Flag to keep track if a matching option was found
  var potentiallyTweakedPrompt = promptJson.prompt;
  console.log('about to try to incorrectly set the copied model haha: ', promptJson.modelName);
  for (var i = 0; i < options.length; i++) {
    if (options[i].getAttribute('model') === promptJson.modelName) {
      let instanceKey = options[i].getAttribute('instkey');

      let prompt = promptJson.prompt;
      if (prompt.includes(instanceKey)) {
        potentiallyTweakedPrompt = prompt.replace(instanceKey,'zxc');
      }

      options[i].selected = true;
      selected = true;
    } else {
      options[i].selected = false;
    }
  }

  // If no matching option was found, only select the first option and deselect all others
  if (!selected) {
    for (var i = 0; i < options.length; i++) {
      if (i === 0) {
        options[i].selected = true;
      } else {
        options[i].selected = false;
      }
    }
  }

  // Set the text of the span element with id 'promptInput' to the given prompt
  document.getElementById('promptInput').textContent = potentiallyTweakedPrompt;
}


function unhideProgressContainer_onDOM(div) {
  div.children(".content").children(".prog-container").removeClass("hidden");
}

// Functions

function fetchNextPageOfPrompts(event) {
  event.preventDefault();
  let offsetString = getPromptOffset();
  let selectedIdeaRecId = getSelectedIdeaId();

  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/nextBatchOfPrompts";
  let jsonPayload = {
      offset : offsetString,
      selectedIdea : selectedIdeaRecId
  }

  let stringedPayload = JSON.stringify(jsonPayload);
  console.log("The stringed payload is: ", stringedPayload);

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {

      console.log("Fell into success block for paginated prompts");

      let promptsList = response['prompts'];
      let offset = response['offset'];

      appendPrompts_onDOM(promptsList);
      updatePromptOffset(offset);
      setTimeout(releasePromptPaginationLock, 50);
    },
    error: function (msg) {
      console.log("Fell into failure block for paginating prompts, with msg: ",msg);
      setTimeout(releasePromptPaginationLock, 50);
    },
  });
} 

function initialProjectsAction(event) {
  event.preventDefault();

  let form = document.getElementById("load-projects-form");
  var data = convertFormToJSON(form);

  var memberFlowId = $('div[data-ms-member]').text()

  if (typeof memberFlowId == 'undefined') {
    console.log("We don't have a member id loaded in just yet!");
    //setTimeout(fireProjectFetch, 1000);
    return
  } else {
    console.log("We have a member id so projects should be a happy endpoint :)");
  }

  var jsonPayload = {
    memberId : memberFlowId
  }

  console.log("proj json payload is: " + jsonPayload);
  var action = form.action;
  console.log("The form action for project fetching: ", action);
  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {

      console.log("Fell into success block for projects w/ response: ", response);


      // Grab useful info from response
      let projectsResponse = response['projects'];
      let selectedProjectId = response['selectedProjectId'];
      let selectedIdeaId = response['selectedIdeaId'];
      let firstProject = projectsResponse[0]; //sorted server-side via last modified, and == selectedProjectId
      let firstProjIdeas = firstProject['ideas'];
      let lastModifiedIdea = firstProjIdeas[0]; //sorted server-side
      let promptsList = lastModifiedIdea['prompts'];
      let promptOffsetForIdea = lastModifiedIdea['prompt_offset'];
      console.log("Project response is: " + projectsResponse);


      // Update projects nav
      updateProjectDropdown_with(projectsResponse, selectedProjectId);
      // Update ideas nav
      updateIdeaDropdown_with(firstProjIdeas, selectedIdeaId);


      response['promptOffset'] = promptOffsetForIdea;
      $('#data-projects').text(JSON.stringify(response));

      // Construct the list of previous prompts
      clearListOfPrompts_onDOM();
      appendPrompts_onDOM(promptsList);
    },
    error: function (msg) {
      console.log("Fell into failure block for projects! With memberId: " + memberFlowId);
    },
  });
}

function updateProjectDropdown_with(listOfProjects, selectedProjId) {
  $("#projectDropdownContent").empty();
  addNewProjInProjectDropdown();
  addHorizontalDividerInProjDropdown();

  for (let x in listOfProjects) {
    let projectJson = listOfProjects[x];
    let projectName = projectJson['name'];
    let dropdownType = 'project';
    let dpContentId = projectJson['record_id'];
    let dropdownLinkHTML = dpContentContainer(projectName, dropdownType, dpContentId);
    let dropdownLinkElement = $($.parseHTML(dropdownLinkHTML));


    let isCurrentlySelected = dpContentId == selectedProjId;
    if (isCurrentlySelected) {
      dropdownLinkElement.addClass("selected");
      dropdownLinkElement.children(".dropdown-link").addClass("selected");
      $("#currentProjectSelectionDiv").text(projectName);
    } else {
      dropdownLinkElement.bind('click', function(e) {
        
        clickedTarget = e.currentTarget;
        dropdownDivOfTarget = clickedTarget.querySelector("a div");
        console.log('User clicked on this dropdown div, where crrent target is: ', dropdownDivOfTarget);
        targetDropdownId = dropdownDivOfTarget.getAttribute("dpcontentid");
        targetDropdownType =  dropdownDivOfTarget.getAttribute("dptype");
        console.log('The dropdown id from clicked target is: ', targetDropdownId);
        console.log('The dropdown type from clicked target is: ', targetDropdownType);
        handleTapOnDropdownContent(targetDropdownType,targetDropdownId);
      });
    }

    $("#projectDropdownContent").append(dropdownLinkElement);

    let isLast = x == listOfProjects.length - 1;
    if (isLast) {
      dropdownLinkElement.addClass("last");
    } else {
      addHorizontalDividerInProjDropdown();
    }
  }
}

function updateIdeaDropdown_with(listOfIdeas, selectedIdeaId) {
  $("#ideaDropdownContent").empty();
  addNewIdeaInIdeaDropdown();

  for (let x in listOfIdeas) {
    let ideaJson = listOfIdeas[x];
    let ideaName = ideaJson['name'];
    let dropdownType = 'idea';
    let dpContentId = ideaJson['record_id'];
    let dropdownLinkHTML = dpContentContainer(ideaName, dropdownType, dpContentId);
    let dropdownLinkElement = $($.parseHTML(dropdownLinkHTML));

    console.log('within idea dropdown creation, the dpContentId is: ', dpContentId);
    console.log('within idea dropdown creation, the selectedIdeaId is: ', selectedIdeaId);

    let isCurrentlySelected = dpContentId == selectedIdeaId;

    if (isCurrentlySelected) {
      dropdownLinkElement.addClass("selected");
      dropdownLinkElement.children(".dropdown-link").addClass("selected");
      $("#currentIdeaSelectionDiv").text(ideaName);
    } else {
      dropdownLinkElement.bind('click', function(e) {
        clickedTarget = e.currentTarget;
        dropdownDivOfTarget = clickedTarget.querySelector("a div");
        targetDropdownId = dropdownDivOfTarget.getAttribute("dpcontentid");
        targetDropdownType =  dropdownDivOfTarget.getAttribute("dptype");
        console.log('The dropdown id from clicked target is: ', targetDropdownId);
        console.log('The dropdown type from clicked target is: ', targetDropdownType);
        handleTapOnDropdownContent(targetDropdownType,targetDropdownId);
      });
    }

    $("#ideaDropdownContent").append(dropdownLinkElement);

    let isLast = x == listOfIdeas.length - 1;
    if (isLast) {
      dropdownLinkElement.addClass("last");
    } else {
      addHorizontalDividerInIdeaDropdown();
    }
  }
}

function handleTapOnDropdownContent(dropdownType,dropdownId) {
  console.log('The dropdown type in handleTapOnDropdownContent function is: ', dropdownType);
  if (dropdownType == "project") {
    fetchProjectInfo(dropdownId)
  } else if (dropdownType == "idea") {
    fetchIdeaInfo(dropdownId)
  }
}

function fetchIdeaInfo(ideaRecId) {
  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/idea";
  let jsonPayload = {
      ideaId : ideaRecId,
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {

      // grab useful idea info from response
      let selectedIdeaId = response['selectedIdeaId'];
      let promptList = response['prompts'];
      let offset = response['offset'];
      let dropdownType = 'idea';
      let selectedProjectId =  getSelectedProjectId();

      // update the local data
      updatePromptOffset(offset);
      updateSelectedIdea(ideaRecId);
      let updatedIdeaList = updateExistingIdea(selectedProjectId,ideaRecId,promptList,offset);

      // update the DOM: idea dropdown and prompt list
      clearListOfPrompts_onDOM();
      appendPrompts_onDOM(promptList);
      updateIdeaDropdown_with(updatedIdeaList, ideaRecId);
    },
    error: function (msg) {
      console.log("Fell into failure block for fetching an existing idea from dropdown, error msg: ", msg);
    },
  });
}

function fetchProjectInfo(projectRecId) {

  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/project";
  let jsonPayload = {
      projectId : projectRecId,
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonPayload),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {

      // grab useful proj data from response
      let projectResponse = response['projects'][0]; // should only be one
      let projectIdeas = projectResponse['ideas'];
      let projectName = projectResponse['name'];
      let dropdownType = 'project';
      let projDropdownContentId = projectResponse['record_id'];

      console.log("Successfully fetched single project response is: ", projectResponse);

      // grab useful data relating to idea and prompts
      let lastModifiedIdea = projectIdeas[0];
      let lastModifiedIdeaId = lastModifiedIdea['record_id'];
      let promptsList = lastModifiedIdea['prompts'];
      let promptOffset = lastModifiedIdea['prompt_offset'];

      // update the local data
      updateExistingProject(projectResponse);
      let updatedProjectList = getLoadedProjects();
      updatePromptOffset(promptOffset);
      updateSelectedProject(projDropdownContentId);
      updateSelectedIdea(lastModifiedIdea['record_id']);

      // update the DOM: proj and idea dropdown, and prompt list
      clearListOfPrompts_onDOM();
      appendPrompts_onDOM(promptsList);
      updateProjectDropdown_with(updatedProjectList, projDropdownContentId);
      updateIdeaDropdown_with(projectIdeas, lastModifiedIdeaId);
    },
    error: function (msg) {
      console.log("Fell into failure block for fetching a proj from dropdown!");
    },
  });
}

function fireGenerateCall(promptJson) {
  console.log('The json for generate is:  ', promptJson);
  
  let action = document.getElementById("generateForm").action;
  let newestPromptDiv = appendSinglePromptForLoading_onDOM();
  appendProgressBar_onDOM(".prog-container");

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(promptJson),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      console.log("Fell into success block for prompt gen! with response: ", response);

      let prompt = response['prompt'];
      let promptId = response['promptId'];
      let imageUrl = response['imageUrl'];
      let imageSrc = 'https://' + imageUrl;
      let creationDate = response['creationDate'];
      let generationTime = response['generationTime'];
      let usedSeed = response['usedSeed'];

      promptJson.creationDate = creationDate;
      promptJson.genTime = generationTime;
      promptJson.seed = usedSeed; //this should be used in case the user randomizes the seed

      let promptSummaryJson = promptSummaryTexts(promptJson);
      promptJson.shorterSummary = promptSummaryJson.shorterSummary;
      promptJson.summary = promptSummaryJson.shorterSummary;

      console.log("The latest search had prompt info of: ", promptJson);

      newestPromptDiv.children(".content").children(".prog-container").empty();

      newestPromptDiv.attr("id", promptId);
      newestPromptDiv.attr("prompt", prompt);
      newestPromptDiv.attr("negPrompt", promptJson.negativePrompt);
      newestPromptDiv.attr("gScale", promptJson.guidanceScale);
      newestPromptDiv.attr("seed", promptJson.seed);
      newestPromptDiv.attr("modelName", promptJson.modelName);
      newestPromptDiv.attr("modelVersion", promptJson.modelVersion);

      newestPromptDiv.children(".content").children("a").children("img").attr("src", imageSrc);
      newestPromptDiv.children(".content").children("a").attr("href", imageSrc);
      newestPromptDiv.children(".content").children("a").attr("data-lightbox", 'prompts');
      newestPromptDiv.children(".content").children("a").attr("data-title", promptJson.summary);
      newestPromptDiv.children(".content").children(".prompt-history-metadata-div").children("p").text(prompt);
      newestPromptDiv.children(".content").children(".prompt-history-metadata-div").children("div").children("#metadata-shorter-summary-div").text(promptJson.shorterSummary);
      newestPromptDiv.find("button.copy-button i").attr("promptId", promptId);
      newestPromptDiv.children(".content").children(".prompt-history-metadata-div").removeClass("hidden");
    },
    error: function (msg) {
      console.log("Fell into failure for prompt gen block!");
      newestPromptDiv.children(".prog-container").empty();
      newestPromptDiv.remove();
    },
  });
}

function generateAction(event) {
  event.preventDefault();

  let otherInputValues = getOtherPromptInputValues();
  var prompt = document.getElementById("promptInput").textContent;
  let selectedIdeaId = getSelectedIdeaId();
  var seedToUse = otherInputValues.seed;
  let numberOfImages = otherInputValues.numberOfImages;

  let modelValues = otherInputValues.modelValues;
  let versionValues = otherInputValues.versionValues;
  let instanceKeys = otherInputValues.instanceKeys;

  let hasChosenSeed = seedToUse != "";
  if (hasChosenSeed) {
    for (var i = 0; i < modelValues.length; i++) {
      let modelName = modelValues[i];
      let versionName = versionValues[i];
      let instanceKey = instanceKeys[i];

      let genericPersonId = 'zxc';
      let personalizedPrompt = prompt;
      if (prompt.includes(genericPersonId)) {
        personalizedPrompt = prompt.replace(genericPersonId, instanceKey);
      }

      var jsonObject = {
        imageUrl: "",
        selectedIdea: selectedIdeaId,
        promptId: "",
        prompt: personalizedPrompt,
        negativePrompt: otherInputValues.negativePrompt,
        guidanceScale: otherInputValues.gscale,
        seed: otherInputValues.seed,
        modelName: modelName,
        modelVersion: versionName,
        creationDate : "",
        genTime : 0,
        shorterSummary : "",
        summary : "",
      };

      fireGenerateCall(jsonObject);
    }
  } else {
    for (var j = 0; j < numberOfImages; j++) {

      if (otherInputValues.shouldUseRandomSeedAcrossModels) {
        seedToUse = Math.floor(Math.random() * 4294967296);
      }

      for (var i = 0; i < modelValues.length; i++) {

        let modelName = modelValues[i];
        let versionName = versionValues[i];
        let instanceKey = instanceKeys[i];

        let genericPersonId = 'zxc';
        let personalizedPrompt = prompt;
        if (prompt.includes(genericPersonId)) {
          personalizedPrompt = prompt.replace(genericPersonId, instanceKey);
        }

        var jsonObject = {
          imageUrl: "",
          selectedIdea: selectedIdeaId,
          promptId: "",
          prompt: personalizedPrompt,
          negativePrompt: otherInputValues.negativePrompt,
          guidanceScale: otherInputValues.gscale,
          seed: seedToUse,
          modelName: modelName,
          modelVersion: versionName,
          creationDate : "",
          genTime : 0,
          shorterSummary : "",
          summary : "",
        };

        fireGenerateCall(jsonObject);
      }
    }
  }
}

function checkForEnablingGeneration(event) {
  console.log("Hitting the input change for span prompt input");
  let promptInput = document.getElementById("promptInput");
  let submitButton= document.getElementById("promptSubmitButton")
  
  if (promptInput.textContent == "") {
    submitButton.style.backgroundColor = "silver";
    submitButton.disabled = true;

  } else {
    submitButton.style.backgroundColor = "black";
    submitButton.disabled = false;
  }
}

function checkForPlaceholderPutBack(event) {
  let promptInput = document.getElementById("promptInput");
  let textContent = promptInput.textContent;
  
  if (promptInput.textContent == "") {
    while (promptInput.firstChild) {
      promptInput.removeChild(promptInput.lastChild);
    }
  }
}

// Project Navigation Functions

function userTappedEditProject(e) {
  console.log('ready to show edit proj modal');
  presentEditProjModal();

  document.getElementById("cancelSaveButton").addEventListener("click", dismissEditProjectModal);
  document.getElementById("saveButton").addEventListener("click", attemptToSaveProjectDetails);
  document.getElementById("editProjectInput").addEventListener("input", checkForEnablingSaveProjectDetails);
  document.getElementById("editIdeaInput").addEventListener("input", checkForEnablingSaveProjectDetails);
  document.getElementById("saveButton").addEventListener("paste", checkForEnablingSaveProjectDetails);
  document.getElementById("editProjectModalWrapper").addEventListener("mousedown", checkClickForEditProjDismissal);
}

function presentEditProjModal() {
  let modalWrapperHTML =  modalWrapper("editProjectModalWrapper");
  let modalWrapperElement =  $($.parseHTML(modalWrapperHTML));
  let editProjectModalHTML = editProjectDetailModal();
  let editProjectModalElement = $($.parseHTML(editProjectModalHTML));

  let selectedProjName = getSelectedProject()['name'];
  let selectedIdeaName = getSelectedIdea()['name'];
  editProjectModalElement.children("#editProjectInput").val(selectedProjName);
  editProjectModalElement.children("#editIdeaInput").val(selectedIdeaName);

  modalWrapperElement.append(editProjectModalElement);
  $('body').append(modalWrapperElement);
}

function userTappedNewIdea(e) {
  e.preventDefault();
  var url = $(this).attr('href').replace('#','');
  console.log('ready to show new idea modal');
  presentNewIdeaModal();

  document.getElementById("cancelCreateIdeaButton").addEventListener("click", dismissNewIdeaModal);
  document.getElementById("createIdeaButton").addEventListener("click", attemptToCreateNewIdea);
  document.getElementById("newIdeaInput").addEventListener("input", checkForEnablingCreateIdea);
  document.getElementById("createIdeaButton").addEventListener("paste", checkForEnablingCreateIdea);
  document.getElementById("newIdeaModalWrapper").addEventListener("mousedown", checkClickForNewIdeaDismissal);
}

function presentNewIdeaModal() {
  let modalWrapperHTML =  modalWrapper("newIdeaModalWrapper");
  let modalWrapperElement =  $($.parseHTML(modalWrapperHTML));
  let newIdeaModalHTML = newIdeaModal();
  let newIdeaModalElement = $($.parseHTML(newIdeaModalHTML));
  modalWrapperElement.append(newIdeaModalElement);
  $('body').append(modalWrapperElement);
}


function userTappedNewProject(e) {
  e.preventDefault();
  var url = $(this).attr('href').replace('#','');
  console.log('ready to show new project modal');
  presentNewProjectModal();
  document.getElementById("cancelCreateProjectButton").addEventListener("click", dismissNewProjectModal);
  document.getElementById("createProjectButton").addEventListener("click", attemptToCreateNewProject);
  document.getElementById("newProjectInput").addEventListener("input", checkForEnablingCreateProject);
  document.getElementById("createProjectButton").addEventListener("paste", checkForEnablingCreateProject);
  document.getElementById("newProjectModalWrapper").addEventListener("mousedown", checkClickForNewProjDismissal);
}

function presentNewProjectModal() {
  let modalWrapperHTML =  modalWrapper("newProjectModalWrapper");
  let modalWrapperElement =  $($.parseHTML(modalWrapperHTML));
  let newProjModalHTML = newProjectModal();
  let newProjModalElement = $($.parseHTML(newProjModalHTML));
  modalWrapperElement.append(newProjModalElement);
  $('body').append(modalWrapperElement);
}

function checkClickForNewProjDismissal(e) {
  if (document.getElementById("newProjectModal").contains(e.target)) {
    /* nothing to fire, interacting with create new proj form */
  } else {
    document.getElementById("cancelCreateProjectButton").dispatchEvent(
      new CustomEvent('click', { cancelable: true })
    );
  }
}

function checkClickForNewIdeaDismissal(e) {
  if (document.getElementById("newIdeaModal").contains(e.target)) {
    /* nothing to fire, interacting with create new idea form */
  } else {
    document.getElementById("cancelCreateIdeaButton").dispatchEvent(
      new CustomEvent('click', { cancelable: true })
    );
  }
}

function checkClickForEditProjDismissal(e) {
  if (document.getElementById("editProjectModal").contains(e.target)) {
    /* nothing to fire, interacting with create new idea form */
    console.log("Nothing to fire but we're checking w/ e: ", e);
  } else {
    console.log("Ready to dismiss edit proj modal, with e: ", e);
    document.getElementById("cancelSaveButton").dispatchEvent(
      new CustomEvent('click', { cancelable: true })
    );
  }
}

function attemptToSaveProjectDetails(e) {
  console.log("Ready to save changes that were detected which then enabled the save button get here");

  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/project/update"

  let memberStackId = $('div[data-ms-member]').text()
  let enteredProjectName = document.getElementById("editProjectInput").value;
  let enteredIdeaName = document.getElementById("editIdeaInput").value;
  let projectRecId = getSelectedProjectId();
  let ideaRecId = getSelectedIdeaId();
  let currentProjectName = getSelectedProject()['name'];
  let currentIdeaName = getSelectedIdea()['name'];

  if (typeof memberStackId == 'undefined') {
    console.log("We don't have a member id loaded in for some reason so can't save updated proj details");
    return
  } else {
    console.log("We have a member id so good to save updated proj details");
  }

  var jsonObject = {
    memberId: memberStackId,
    projectId: projectRecId,
    ideaId: ideaRecId,
    newProjectName: enteredProjectName,
    newIdeaName: enteredIdeaName
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonObject),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      let updatedProjectName = response['updatedProjectName'];
      let updatedIdeaName = response['updatedIdeaName'];
      
      console.log('new project name: ', updatedProjectName);
      console.log('bew idea name: ', updatedIdeaName);

      let wasProjectUpdated = updatedProjectName != "";
      let wasIdeaUpdated = updatedIdeaName != "";

      if (wasProjectUpdated) {
        // update selected proj name in nav
        let currentProjDiv = $("#currentProjectSelectionDiv").text(updatedProjectName);
        // update proj name in proj dropdown
        let selectedDpLinkDiv = $(".dp-content-container").children(".dropdown-link").children("div[dpcontentid=" + projectRecId + "]");
        selectedDpLinkDiv.text(updatedProjectName);
      }

      if (wasIdeaUpdated) {
        // update selected idea name in nav
        let currentIdeaDiv = $("#currentIdeaSelectionDiv").text(updatedIdeaName);
        // update idea name in idea dropdown
        let selectedDpLinkDiv = $(".dp-content-container").children(".dropdown-link").children("div[dpcontentid=" + ideaRecId + "]");
        selectedDpLinkDiv.text(updatedIdeaName);
      }

      // update local data w/ the edits
      updateProjectDetails(updatedIdeaName, updatedProjectName);


      // dismiss the edit project details modal
      document.getElementById("cancelSaveButton").dispatchEvent(
        new CustomEvent('click', { cancelable: true })
      );
    },
    error: function (msg) {
      console.log("Fell into failure block for idea creation! msg: ", msg);
    },
  });
}

function attemptToCreateNewIdea(e) {
  const idea_input_text = document.getElementById("newIdeaInput").value

  if (idea_input_text == "") {
    console.log('No idea name defined yet so wont fire off endpoint');
    return
  }

  console.log('ready to create new idea called: ', idea_input_text);

  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/idea/new"
  let memberStackId = $('div[data-ms-member]').text()
  let projectRecId = getSelectedProjectId();

  if (typeof memberStackId == 'undefined') {
    console.log("We don't have a member id loaded in for some reason so don't create new proj");
    return
  } else {
    console.log("We have a member id so good to create the new proj");
  }

  var jsonObject = {
    memberId: memberStackId,
    projectId: projectRecId,
    ideaName: idea_input_text
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonObject),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      let selectedIdeaId = response['selectedIdeaId'];
      let ideasResponse = response['ideas'];
      let newIdea = ideasResponse[0];

      // Update local idea list for the given project and then update DOM
      let newIdeaList = updateIdeaList(projectRecId, newIdea);
      updateIdeaDropdown_with(newIdeaList, selectedIdeaId);
      clearListOfPrompts_onDOM();

      // update other local data
      updatePromptOffset('');
      updateSelectedIdea(selectedIdeaId);

      // dismiss the new idea modal
      document.getElementById("cancelCreateIdeaButton").dispatchEvent(
        new CustomEvent('click', { cancelable: true })
      );
    },
    error: function (msg) {
      console.log("Fell into failure block for idea creation! msg: ", msg);
    },
  });
}

function attemptToCreateNewProject(e) {
  const project_name = document.getElementById("newProjectInput").value
  var idea_name = "Brainstorm"
  const idea_input_text = document.getElementById("newIdeaInput").value
  if (idea_input_text != "") {
    idea_name = idea_input_text
  }

  if (project_name == "") {
    console.log('No project name defined yet so wont fire off endpoint');
    return
  }

  console.log('ready to create new project named: ', project_name);

  let action = "https://whollyai-5k3b37mzsa-ue.a.run.app/project/new"
  let memberStackId = $('div[data-ms-member]').text()

  if (typeof memberStackId == 'undefined') {
    console.log("We don't have a member id loaded in for some reason so don't create new proj");
    return
  } else {
    console.log("We have a member id so good to create the new proj");
  }

  var jsonObject = {
    memberId: memberStackId,
    projectName: project_name,
    ideaName: idea_name
  }

  $.ajax({
    url: action,
    method: "POST",
    data: JSON.stringify(jsonObject),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      console.log("Fell into success block for new project creation");

      // Grab useful info from response
      let projectsResponse = response['projects'];
      let selectedProjectId = response['selectedProjectId'];
      let selectedIdeaId = response['selectedIdeaId'];
      let newProject = projectsResponse[0]; ////there should only be one upon a single project creation
      let projIdeas = newProject['ideas'];
      let createdIdea = projIdeas[0];
      let promptsList = createdIdea['prompts'];
      let promptOffsetForIdea = createdIdea['prompt_offset'];
      console.log("The new project response is: ", response);

      // Update local project list and then update DOM
      let newProjectList = updateProjectList_afterNew(newProject);
      updateProjectDropdown_with(newProjectList, selectedProjectId);
      updateIdeaDropdown_with(projIdeas, selectedIdeaId);
      clearListOfPrompts_onDOM();

      // update other local data
      updatePromptOffset(promptOffsetForIdea);
      updateSelectedProject(selectedProjectId);
      updateSelectedIdea(selectedIdeaId);

      // dismiss the new proj modal
      document.getElementById("cancelCreateProjectButton").dispatchEvent(
        new CustomEvent('click', { cancelable: true })
      );

    },
    error: function (msg) {
      console.log("Fell into failure block for project creation!");
    },
  });
}
 
function dismissNewProjectModal(e) {
  e.preventDefault()
  console.log('dismissNewProjectModal e is called');
  document.getElementById("newProjectModalWrapper").removeEventListener("mousedown", checkClickForNewProjDismissal);
  const element = document.getElementById("newProjectModalWrapper");
  element.remove();
}

function dismissNewIdeaModal(e) {
  e.preventDefault()
  console.log('dismissNewIdeaModal is called');
  document.getElementById("newIdeaModalWrapper").removeEventListener("mousedown", checkClickForNewIdeaDismissal);
  const element = document.getElementById("newIdeaModalWrapper");
  element.remove();
}

function dismissEditProjectModal(e) {
  console.log('dismissEditProject  is called');
  document.getElementById("editProjectModalWrapper").removeEventListener("mousedown", checkClickForEditProjDismissal);
  const element = document.getElementById("editProjectModalWrapper");
  element.remove();
}

function checkForEnablingSaveProjectDetails(event) {
  let editProjectInput = document.getElementById("editProjectInput");
  let editIdeaInput = document.getElementById("editIdeaInput");
  let actionButton = document.getElementById("saveButton");
  
  let selectedProjectName = getSelectedProject()['name'];
  let selectedIdeaName = getSelectedIdea()['name'];

  let wasEitherNameEdited = (editProjectInput.value != selectedProjectName && editProjectInput.value != "") || (editIdeaInput.value != selectedIdeaName && editIdeaInput.value != "");

  if (wasEitherNameEdited) {
    actionButton.classList.remove("not-ready");
    actionButton.classList.add("ready");
    actionButton.disabled = false;
  } else {
    actionButton.classList.remove("ready");
    actionButton.classList.add("not-ready");
    actionButton.disabled = true;
  }
}

function checkForEnablingCreateIdea(event) {
  let newIdeaInput = document.getElementById("newIdeaInput");
  let createIdeaButton= document.getElementById("createIdeaButton");
  
  if (newIdeaInput.value == "") {
    createIdeaButton.classList.remove("ready");
    createIdeaButton.classList.add("not-ready");
    createIdeaButton.disabled = true;
  } else {
    createIdeaButton.classList.remove("not-ready");
    createIdeaButton.classList.add("ready");
    createIdeaButton.disabled = false;
  }
}

function checkForEnablingCreateProject(event) {
  let newProjectInput = document.getElementById("newProjectInput");
  let createProjectButton= document.getElementById("createProjectButton");
  
  if (newProjectInput.value == "") {
    createProjectButton.classList.remove("ready");
    createProjectButton.classList.add("not-ready");
    createProjectButton.disabled = true;
  } else {
    createProjectButton.classList.remove("not-ready");
    createProjectButton.classList.add("ready");
    createProjectButton.disabled = false;
  }
}

function clickedProjectDropdown(event) {
  console.log("Hit the click event for project dropdown wrapper!");
  let contentId = "projectDropdownContent";
  let wrapperId = "projDropdownWrapper";
  wrapperElement = showDropdownContent(contentId, wrapperId);
  wrapperElement.removeEventListener("click", clickedProjectDropdown);
  wrapperElement.addEventListener("click", unClickedProjectDropdownWrapper);
  document.getElementById("bodyDiv").addEventListener("click", checkForProjDropdownDismissal);
}

function unClickedProjectDropdownWrapper(event) {
  console.log("Hit the hide dropdown function, ready tp hide it!");
  let contentId = "projectDropdownContent";
  let wrapperId = "projDropdownWrapper";
  wrapperElement = hideDropdownContent(contentId, wrapperId);
  wrapperElement.removeEventListener("click", unClickedProjectDropdownWrapper);
  wrapperElement.addEventListener("click", clickedProjectDropdown);
  document.getElementById("bodyDiv").removeEventListener("click", checkForProjDropdownDismissal)
}


function clickedIdeaDropdown(event) {
  console.log("Hit the click event for project dropdown wrapper!");
  let contentId = "ideaDropdownContent";
  let wrapperId = "ideaDropdownWrapper";
  wrapperElement = showDropdownContent(contentId, wrapperId);
  wrapperElement.removeEventListener("click", clickedIdeaDropdown);
  wrapperElement.addEventListener("click", unClickedIdeaDropdownWrapper);
  document.getElementById("bodyDiv").addEventListener("click", checkForIdeaDropdownDismissal);
}

function unClickedIdeaDropdownWrapper(event) {
  console.log("Hit the hide dropdown function, ready tp hide it!");
  let contentId = "ideaDropdownContent";
  let wrapperId = "ideaDropdownWrapper";
  wrapperElement = hideDropdownContent(contentId, wrapperId);
  wrapperElement.removeEventListener("click", unClickedIdeaDropdownWrapper);
  wrapperElement.addEventListener("click", clickedIdeaDropdown);
  document.getElementById("bodyDiv").removeEventListener("click", checkForIdeaDropdownDismissal)
}

function checkForProjDropdownDismissal(e) {
  console.log('Checking for proj dropdown!');
  let isShowingProjDropdown = document.getElementById("projectDropdownContent").clientHeight > 0;

  if (!$(event.target).closest('#projDropdownWrapper').length && 
      !$(event.target).is('#projDropdownWrapper') && isShowingProjDropdown) {
    document.getElementById("projDropdownWrapper").dispatchEvent(
      new CustomEvent('click', { cancelable: true })
    );
  }
}

function checkForIdeaDropdownDismissal(e) {
  console.log('Checking for idea dropdown!');
  let isShowingIdeaDropdown = document.getElementById("ideaDropdownContent").clientHeight > 0;

  if (!$(event.target).closest('#ideaDropdownWrapper').length && 
      !$(event.target).is('#ideaDropdownWrapper') && isShowingIdeaDropdown) {
    document.getElementById("ideaDropdownWrapper").dispatchEvent(
      new CustomEvent('click', { cancelable: true })
    );
  }
}

function showDropdownContent(contentId, wrapperId) {
  dropDownContent = document.getElementById(contentId);
  dropDownContent.classList.remove("dropdown-content-hidden");
  dropDownContent.classList.add("dropdown-content-shown");
  dropDownWrapper = document.getElementById(wrapperId);
  dropDownWrapper.classList.remove("dropdown-wrapper-unselected");
  dropDownWrapper.classList.add("dropdown-wrapper-selected");
  return dropDownWrapper;
}

function hideDropdownContent(contentId, wrapperId) {
  dropDownContent = document.getElementById(contentId);
  dropDownContent.scrollTop = 0;
  dropDownContent.classList.remove("dropdown-content-shown");
  dropDownContent.classList.add("dropdown-content-hidden");
  dropDownWrapper = document.getElementById(wrapperId);
  dropDownWrapper.classList.remove("dropdown-wrapper-selected");
  dropDownWrapper.classList.add("dropdown-wrapper-unselected");
  return dropDownWrapper;
}


function getOtherPromptInputValues() {
  // Get the value of the number input with ID 'num-images-input'
  var numberOfImages = document.getElementById('numImagesInput').value;

  // Get the text of the negative prompt input with ID 'negPromptInput'
  let negativePrompt = document.getElementById("negPromptInput").value;

  // Get the value of the number input with ID 'gscale'
  var gscale = document.getElementById('gscale').value;

  // Get the value of the number input with ID 'seed'
  var seed = document.getElementById('seed').value;
  var locallyGeneratedSeed = "";

  let sameRandomSeedSpan = document.getElementById('checkboxForSameRandomSeed');
  let shouldUseRandomSeedAcrossModels = sameRandomSeedSpan.classList.contains('fa-check-square')

  // Get the dropdown with ID 'modelDropdown'
  var dropdown = document.getElementById('modelDropdown');

  // Get the selected options in the dropdown
  var selectedOptions = dropdown.selectedOptions;

  // Create two arrays to store the 'model' and 'version' attributes of the selected options
  var modelValues = [];
  var versionValues = [];
  var instanceKeys = [];

  // Loop through the selected options and get their 'model' attribute
  for (var i = 0; i < selectedOptions.length; i++) {
    modelValues.push(selectedOptions[i].getAttribute('model'));
    versionValues.push(selectedOptions[i].getAttribute('version'));
    instanceKeys.push(selectedOptions[i].getAttribute('instkey'));
  }

  // Return an object containing the values of the inputs
  return {
    numberOfImages: numberOfImages,
    negativePrompt: negativePrompt,
    gscale: gscale,
    seed: seed,
    shouldUseRandomSeedAcrossModels: shouldUseRandomSeedAcrossModels,
    modelValues: modelValues,
    versionValues: versionValues,
    instanceKeys: instanceKeys,
  }
}

function updateGuidanceScale(value) {
  var input = document.getElementById('gscale');
  input.value = value;
}

function updateSliderValueForGScale(value) {
  var slider = document.getElementById('guidance_slider');
  slider.value = value;
}

// Helpful Functions

function getPromptOffset() {
  let projectsData = JSON.parse($('#data-projects').text());
  console.log('The projects data from get prompt offset is: ', projectsData);

  if (!('promptOffset' in projectsData)) {
    return ""
  } else {
    return projectsData['promptOffset']
  }
}

function updatePromptOffset(offset) {
  let projectsData = JSON.parse($('#data-projects').text());
  projectsData['promptOffset'] = offset;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function isCurrentlyPaginatingPrompts() {
  let projectsData = JSON.parse($('#data-projects').text());
  if (!('isPaginatingPrompts' in projectsData)) {
    console.log('No such key found in the projectsData dict!');
    return false
  } else {
    let boolVal = projectsData['isPaginatingPrompts'];
    console.log('the bool for isPaginatingPrompts: ', boolVal);
    return projectsData['isPaginatingPrompts']
  }
}

function lockFurtherPromptPagination() {
  let projectsData = JSON.parse($('#data-projects').text());
  projectsData['isPaginatingPrompts'] = true;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function releasePromptPaginationLock() {
  let projectsData = JSON.parse($('#data-projects').text());
  projectsData['isPaginatingPrompts'] = false;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function getSelectedProjectId() {
  let projectsData = JSON.parse($('#data-projects').text());
  let selectedProject = projectsData['selectedProjectId'];
  return selectedProject
}

function getSelectedProject() {
  let projectsData = JSON.parse($('#data-projects').text());
  let selectedProjectId = projectsData['selectedProjectId'];
  let projectList = projectsData['projects'];
  let selectedProject = projectList.find(o => o.record_id === selectedProjectId);
  return selectedProject
}

function updateSelectedProject(projectId) {
  let projectsData = JSON.parse($('#data-projects').text());
  projectsData['selectedProjectId'] = projectId;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function getSelectedIdeaId() {
  let projectsData = JSON.parse($('#data-projects').text());
  let selectedIdea = projectsData['selectedIdeaId'];
  return selectedIdea
}

function getSelectedIdea() {
  let projectsData = JSON.parse($('#data-projects').text());
  let selectedIdeaId = projectsData['selectedIdeaId'];
  let selectedProjectId = projectsData['selectedProjectId'];
  let projectList = projectsData['projects'];
  let selectedProject = projectList.find(o => o.record_id === selectedProjectId);
  let ideaList = selectedProject['ideas'];
  let selectedIdea = ideaList.find(o => o.record_id === selectedIdeaId);
  return selectedIdea
}

function updateSelectedIdea(ideaId) {
  let projectsData = JSON.parse($('#data-projects').text());
  projectsData['selectedIdeaId'] = ideaId;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function getLoadedProjects() {
  let projectsData = JSON.parse($('#data-projects').text());
  return projectsData['projects']
}

function updateProjectList_afterNew(newProject) {
  let projectsData = JSON.parse($('#data-projects').text());
  var projectList = projectsData['projects'];
  projectList.unshift(newProject);
  projectsData['projects'] = projectList;
  $('#data-projects').text(JSON.stringify(projectsData));
  return projectList
}

function updateProjectName(newProjectName) {
  let projectsData = JSON.parse($('#data-projects').text());
  let selectedProjectId = projectsData['selectedProjectId'];
  var projectList = projectsData['projects'];
  var selectedProject = getSelectedProject();
  selectedProject['name'] = newProjectName;
  updateExistingProject(selectedProject);
}

function updateExistingProject(updatedProject) {
  let projectId = updatedProject['record_id'];
  let projectsData = JSON.parse($('#data-projects').text());
  var projectList = projectsData['projects'];

  projectList.find((o, i) => {
    if (o.record_id === projectId) {
        projectList[i] = updatedProject;
        return true; // stop searching
    }
  })
  projectsData['projects'] = projectList;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function getLoadedIdeas_for(projectId) {
  let projectsData = JSON.parse($('#data-projects').text());
  let projectList = projectsData['projects'];
  let currentProject = projectList.find(o => o.record_id === projectId);
  return currentProject['ideas']
}

function updateIdeaList(projectId, newIdea) {
  let projectsData = JSON.parse($('#data-projects').text());
  var projectList = projectsData['projects'];
  var projectToBeUpdated = projectList.find(o => o.record_id === projectId);
  if (projectToBeUpdated == undefined) { 
    console.log('Could not find local project to update with new idea');
    return 
  }
  var ideaList = projectToBeUpdated['ideas'];

  console.log('The idea list before new idea is added: ', ideaList);

  ideaList.unshift(newIdea);
  projectToBeUpdated['ideas'] = ideaList

  console.log('The idea list after new idea is added: ', ideaList);

  projectList.find((o, i) => {
    if (o.record_id === projectId) {
        projectList[i] = projectToBeUpdated;
        return true; // stop searching
    }
  })

  projectsData['projects'] = projectList;
  $('#data-projects').text(JSON.stringify(projectsData));
  return ideaList
}

function updateExistingIdea(projectRecId, ideaRecId,promptList,offset) {
  let projectsData = JSON.parse($('#data-projects').text());
  let projectList = projectsData['projects'];
  var currentProject = projectList.find(o => o.record_id === projectRecId);
  var ideaList = currentProject['ideas'];
  var currentIdea = ideaList.find(o => o.record_id === ideaRecId);
  currentIdea['prompts'] = promptList;
  currentIdea['prompt_offset'] = offset;

  ideaList.find((o, i) => {
    if (o.record_id === ideaRecId) {
        ideaList[i] = currentIdea;
        return true; // stop searching
    }
  })

  currentProject['ideas'] = ideaList;

  projectList.find((o, i) => {
    if (o.record_id === projectRecId) {
        projectList[i] = currentProject;
        return true; // stop searching
    }
  })

  projectsData['projects'] = projectList;
  $('#data-projects').text(JSON.stringify(projectsData));
  return ideaList
}

function updateProjectDetails(newIdeaName,newProjectName) {
  let projectsData = JSON.parse($('#data-projects').text());
  var projectList = projectsData['projects'];

  var currentProject = getSelectedProject();
  let selectedIdeaId = getSelectedIdeaId();
  let selectedProjectId = getSelectedProjectId();

  var ideaList = currentProject['ideas'];
  var currentIdea = ideaList.find(o => o.record_id === selectedIdeaId);

  if (newIdeaName != "") {
    currentIdea['name'] = newIdeaName;
  }

  ideaList.find((o, i) => {
    if (o.record_id ===  selectedIdeaId) {
        ideaList[i] = currentIdea;
        return true; // stop searching
    }
  })

  currentProject['ideas'] = ideaList;
  if (newProjectName != "") {
    currentProject['name'] = newProjectName;
  }

  projectList.find((o, i) => {
    if (o.record_id === selectedProjectId) {
        projectList[i] = currentProject;
        return true; // stop searching
    }
  })

  projectsData['projects'] = projectList;
  $('#data-projects').text(JSON.stringify(projectsData));
}

function fireProjectFetch() {
  document.getElementById("load-projects-form").dispatchEvent(new CustomEvent('submit', {cancelable: true}));
}

function handlePasteIntoPromptField(event) {
  event.preventDefault();
  // Get the pasted text as plain text
  var text = event.clipboardData.getData('text/plain');
  // Insert the text at the current cursor position using the insertHTML command
  document.execCommand('insertHTML', false, text);
  checkForEnablingGeneration();
}

// from lightbox actions
function copyPromptDetail(element) {
  prompt_detail_val = element.getAttribute('val');
  copyToClipboard(prompt_detail_val);
}

function isSocialButtonSelected(buttonContainer) {
  let i_button_element = $(buttonContainer).children("i")[0];
  return i_button_element.classList.contains('selected');
}

function likedFromLb(buttonContainer) {
  let predictionId = buttonContainer.getAttribute('prompt-id');
  let new_selection_value = !isSocialButtonSelected(buttonContainer); 
  let prompt_list_like_button = $(`#${predictionId}`).find('#likeButton')[0];
  toggleLike(new_selection_value, predictionId, $(buttonContainer), $(prompt_list_like_button));
}

function favoritedFromLb(buttonContainer) {
  let predictionId = buttonContainer.getAttribute('prompt-id');
  let new_selection_value = !isSocialButtonSelected(buttonContainer); 
  let prompt_list_fave_button = $(`#${predictionId}`).find('#heartButton')[0];
  toggleFavorite(new_selection_value, predictionId, $(buttonContainer), $(prompt_list_fave_button));
}

function flaggedFromLb(buttonContainer) {
  let predictionId = buttonContainer.getAttribute('prompt-id');
  let new_selection_value = !isSocialButtonSelected(buttonContainer); 
  let prompt_list_flag_button = $(`#${predictionId}`).find('#flagButton')[0];
  toggleFlag(new_selection_value, predictionId, $(buttonContainer), $(prompt_list_flag_button));
}

function downloadFromLb(buttonContainer) {
  let image_url = $('.lb-image').attr('src');
  downloadSingleImage(image_url, buttonContainer);
  console.log(`button container from download single file from lb: ${buttonContainer}`);
}

function shareFromLb(event) {
  let prompt_id = event.getAttribute('prompt-id');
  console.log(`The prompt id for the share action from lb is: ${prompt_id}`);
}

// Pagination

window.onscroll = function()
{
  // var scrollHeight, totalHeight;
  // scrollHeight = document.body.scrollHeight;
  // totalHeight = window.scrollY + window.innerHeight + 500;

  // if(totalHeight >= scrollHeight)
  // {
  //     let promptOffset = getPromptOffset();
  //     let isPaginatingPrompts = isCurrentlyPaginatingPrompts();
  //     if (!isPaginatingPrompts && promptOffset) {
  //       console.log("Ready to start paginating");
  //       lockFurtherPromptPagination();
  //       document.getElementById("form-fetching-more-prompts").dispatchEvent(new CustomEvent('submit', {cancelable: true}));
  //     } else {
  //       console.log("Either no promptoffset or already paginating next set of prompts");
  //     }

  //     console.log("at the bottom and we have a promptOffset: ", promptOffset);
  // }
}

