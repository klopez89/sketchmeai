// Brainstorm HTML Templates

function imageRowDiv() {
return `
  <div class="image-row flex"></div>
`
}

//promptList-container
function startingElements() {
  let row =
  `
  <div class="border-b border-gray-200 py-5 px-5 sm:flex sm:items-center sm:justify-between">
    <h3 class="text-2xl leading-6 font-black text-gray-800">Image Set 1</h3>
    <div class="mt-3 flex sm:ml-4 sm:mt-0">
      <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="downloadAllButton" onclick="downloadAll()">Download All</button>
      <button type="button" class="select-to-share-button ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onclick="toggleImageSelectability()">Select to Share</button>
    </div>
  </div>
  <div data-te-lightbox-init data-te-infinite-scroll-init class="promptList-container overflow-y-scroll" id="promptListContainer">
  </div>
  <div id="infiniteLoader" class="text-4xl h-full w-full flex bg-transparent flex flex-col items-center pt-4 pb-5">
		<i class="fa fa-spinner fa-spin"></i>
	</div>
  <div class="selection-bar fixed bottom-0 w-full right-0 py-5 px-5 bg-white bg-opacity-70 z-50 hidden">
    <div class="float-right space-x-4">
      <button type="button" class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm bg-white bg-opacity-80 text-gray-500 hover:bg-gray-200" onclick="toggleImageSelectability()">Cancel</button>
      <button type="button" class="share-button ml-3 inline-flex items-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm" onclick="shareButtonPressed()">Share</button>
    </div>
  </div>
  `;
  return row
}

function promptEntryColumn() {
  let column =
  `
  <div class="prompt-entry-column brainstorm-column" id="promptEntryColumn">
  </div>
  `;
  return column
}

function promptListColumn() {
  let column =
  `
    <div class="prompt-list-column brainstorm-column" id="promptListColumn">
    </div>
  `;
  return column
}

function promptEntryContainer() {
  let container =
  `
  <div class="prompt-entry-container" id="promptEntryContainer">
  </div>
  `;
  return container;
}

function promptGenerationForm(inputTitle,inputPlaceholder) {
  let form =
  `
  <form class="generate-form" id="generateForm" 
  action="https://whollyai-5k3b37mzsa-ue.a.run.app/generate" method="get">

    <label for="prompt" class="prompt-field-label first">${inputTitle}</label>
    
    <span class="prompt-input-field" id="promptInput" name="prompt" 
    data-name="prompt" role="textbox" contenteditable required="" 
    placeholder=${inputPlaceholder}></span>

    <input type="submit" class="prompt-submit-button shadow-style" 
    id="promptSubmitButton" value="Generate" disabled=true>

    <input class="num-images shadow-style" type="number" id="numImagesInput" value="1">

    <div class="horizontal-divider" style="margin-top: 18px; margin-bottom: 18px;"></div>

    <label class="prompt-field-label second" for="negPrompt">Negative Prompt:</label>
    <input type="text" id="negPromptInput" class="negetive_prompt_input" placeholder="Enter words for the AI to not include">

    <label for="gscale" class="prompt-field-label">Guidance Scale:</label>
    <div style="display: flex;">
      <input type="number" id="gscale" min="1.0" max="20.0" step="0.1" value="19" oninput="updateSliderValueForGScale(this.value)" style="width: 60px; font-size: 1rem; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none; box-shadow: 0 2px 8px lightgrey; padding-left: 10px;">
      <div style="width: 10px;"></div>
      <input type="range" id="guidance_slider" min="1.0" max="20.0" step="0.1" value="19" oninput="updateGuidanceScale(this.value)" style="flex: 1; font-size: 1rem; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none;">
    </div>

    <label for="seed" class="prompt-field-label">Seed:</label>
    <input type="number" id="seed" min="0" max="4294967295" value="" style="font-size: 1rem; width: 100%; height: calc(1rem + 20px); padding: 5px; border-radius: 5px; border: none; box-shadow: 0 2px 8px lightgrey; padding-left: 10px;" placeholder="Random if empty. 0 to 4294967295">
    <div style="display: flex; align-items: center; margin-top: 5px;">
      <span class="fa fa-square checkmarkInput" id="checkboxForSameRandomSeed"></span>
      <p style="margin-left: 10px; color: gray; font-size: 0.92rem;" class="checkboxTitle">Run all selected models with the same random seed</p>
    </div>

    <div style="width: 100%;">
      <label class="prompt-field-label">Model:</label>
      <select class="model-dropdown" id="modelDropdown" size="7" style="border: none; box-shadow: 0 2px 8px lightgrey; font-size: 1rem !important; width: 100%;" multiple>
        <option selected id="stb" instkey="" model="stability-ai/stable-diffusion" version="6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c">&nbsp;&nbsp;Stable Diffusion 2.1</option>
        <option id="klo_10to5_drw" instkey="zxc" model="klopez89/klo_10to5_drw" version="ae00e4cb912db042646898586e27961b9aeb0705e8bff16b8c9773dadfa42389">&nbsp;&nbsp;Kevin, 10to5_Drawing</option>
        <option id="jks_10to5_drw" instkey="zxc" model="klopez89/jks_10to5_drw" version="3db0c81fe691df5303011ec73360a216655d7fd081a473eda55de4048031a24d">&nbsp;&nbsp;James, 10to5_Drawing</option>
        <option id="mags_10to5_drw" instkey="zxc" model="klopez89/mags_10to5_drw" version="f61f56370d4616ddb27c3895e55a3ced09f086e2c1a9ba7b1501ea9a869467ec">&nbsp;&nbsp;Mags, 10to5_Drawing</option>
        <option id="alb_10to5_drw" instkey="zxc" model="klopez89/b75anpibtft2ra2ckhwbx6jrkug1_drw_model_2983197865" version="3387ce767f1ae4bfbecbf950f39cc93c81d9e15f03c8eca431b9530e3955ed85">&nbsp;&nbsp;Alb, 10to5_Drawing</option>
        <option id="ben_10to5_drw" instkey="zxc" model="klopez89/ben_10to5_drw" version="89b7fe0c81e7c78568a7c1601a3715575d0ad09be22cf473c7b7fab04c552bd8">&nbsp;&nbsp;Ben, 10to5_Drawing</option>
        <option id="jon_10to5_drw" instkey="zxc" model="klopez89/jon_10to5_drw" version="ada47df35bbea65b739f213dddc764096a418e07724c518189e7a873f1db2a03">&nbsp;&nbsp;Jon, 10to5_Drawing</option>
        <option id="alb_10to5_drw_cropped" instkey="zxc" model="klopez89/alb_10to5_drw" version="663756c8e90a471837504178b4c720c767a438e32141052196cc3c9f258431bc">&nbsp;&nbsp;Alb Cropped, 10to5_Drawing</option>
      </select>
    </div>

    <div class="new-model-drop-area" id="newModelDropArea">
      <div style="pointer-events: none;">
        <p id="dropAreaTitle">Drag or click to upload 10 images</p>
        <i class="fa fa-images"></i>
      </div>
    </div>
    <input id="localUploadInput" type="file" style="display:none;" multiple/>
    <div class="upload-entry-container" id="uploadEntryContainer"></div>

  </form> 
  `;
  return form
}

function uploadEntryDiv(file) {
  let filename = file.name;
  let fileSize = file.size;
  let fileType = file.type;

  let div =
  `
  <div class="image-upload-entry" filename="${filename}" filetype="${fileType}">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="upload-preview-image">
    <p class="label">${filename}, ${fileSize}</p>
    <button class="remove-upload-button">
      <span class="fa-stack">
        <i class="fa fa-circle fa-stack-2x"></i>
        <i class="fa fa-times fa-stack-1x fa-inverse" style="margin-top: 1px;"></i>
      </span>
    </button>
  </div>
  `;
  return div
}

function promptDiv(promptJson, shouldLazyLoad) {
  var placeHolderImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

  let promptId = promptJson.promptId;
  let recipeTheme = promptJson.recipeTheme;
  let thumbnailUrl = promptJson.thumbnailImageUrl;
  let imageUrl = promptJson.imageUrl;

  let div = 
  `
  <div class="prompt-div overflow-hidden rounded-md selectable relative" id=${promptId}>
    <img
      src = "${imageUrl}"
      data-te-img="${imageUrl}"
      alt="${recipeTheme}"
      class="object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto">
    <div class="selection-overlay absolute inset-0 cursor-pointer pointer-events-none">
      <div class="overlay-bg h-full w-full"></div>
      <i class="fa fa-circle checkbox hidden absolute top-2 right-2 cursor-pointer text-gray-800 text-3xl"></i>
    </div>
  </div>
  `;
  return div
}

function memberIdDiv() {
  let div =   
  `
  <div data-ms-member="id" style="display:none">
  </div>
  `;
  return div
}


function modalWrapper(elementId) {
  let modalWrapper =
  `
  <div class="modal-wrapper" id=${elementId}>
  </div>
  `;
  return modalWrapper
}

function editProjectDetailModal() {
  let editProjDetailModal = 
  `
  <div class="standard-modal" id="editProjectModal">

    <p class="form-input-title">Project</p>
    <input type="text" id="editProjectInput" class="standard-form-input project" placeholder="i.e. Fantasy Adventure Ebook">
    
    <p class="form-input-title">Idea</p>
    <input type="text" id="editIdeaInput" class="standard-form-input idea" placeholder="i.e. Chapter 1: Sea King">

    <div class="form-submit-button not-ready" id="saveButton">Save</div>
    <div class="form-cancel-button" id="cancelSaveButton">Cancel</div>

  </div>
  `;
  return editProjDetailModal
}

function newProjectModal() {
  let newProjModal = 
  `
  <div class="standard-modal" id="newProjectModal">

    <p class="form-input-title">Project</p>
    <input type="text" id="newProjectInput" class="standard-form-input project" placeholder="i.e. Fantasy Adventure Ebook">
    
    <p class="form-input-title">Idea</p><p class="form-optional-text">(optional, defaults to Brainstorm)</p>
    <input type="text" id="newIdeaInput" class="standard-form-input idea" placeholder="i.e. Chapter 1: Sea King">

    <div class="form-submit-button not-ready" id="createProjectButton">Create</div>
    <div class="form-cancel-button" id="cancelCreateProjectButton">Cancel</div>

  </div>
  `;
  return newProjModal
}

function newIdeaModal() {
  let newIdeaModal = 
  `
  <div class="standard-modal" id="newIdeaModal">

    <p class="form-input-title">Idea</p>
    <input type="text" id="newIdeaInput" class="standard-form-input idea" placeholder="i.e. Sea Monsters">

    <div class="form-submit-button not-ready" id="createIdeaButton">Create</div>
    <div class="form-cancel-button" id="cancelCreateIdeaButton">Cancel</div>

  </div>
  `;
  return newIdeaModal
}


function baseForProjectNavigationMenu() {
  let projNavigationMenuDiv =
  `
  <div class="organizer-menu" id="organizerMenu">
    <div class="organizer-menu-container" id="organizerMenuContainer">
     
      <div id="projDropdownWrapper" class="dropdown-wrapper dropdown-wrapper-unselected noselect"></div>
      
      <div class="vertical-divider"></div>
      
      <div id="ideaDropdownWrapper" class="dropdown-wrapper dropdown-wrapper-unselected noselect"></div>
      
      <div class="vertical-divider"></div>

    </div>
  </div>
  `;
  return projNavigationMenuDiv
}

function projectSelectorContainer(currentProjectName) {
  let selectorContainer = 
  `
  <div class="dropdown-selector-container">
    <p class="dropdown-title">Project</p>
    <div id="currentProjectSelectionDiv" class="selected-project-div">${currentProjectName}</div>
    <div class="down-arrow">▼</div>
  </div>
  `;
  return selectorContainer
}

function ideaSelectorContainer(currentIdeaName) {
  let selectorContainer = 
  `
  <div class="dropdown-selector-container">
    <p class="dropdown-title">Idea</p>
    <div id="currentIdeaSelectionDiv" class="selected-idea-div">${currentIdeaName}</div>
    <div class="down-arrow">▼</div>
  </div>
  `;
  return selectorContainer
}

function projectDropdownContent() {
  let dropDownContent =
  `
  <div id="projectDropdownContent" class="dropdown-content dropdown-content-hidden">
  </div>
  `;
  return dropDownContent
}

function ideaDropdownContent() {
  let ideaDownContent =
  `
  <div id="ideaDropdownContent" class="dropdown-content dropdown-content-hidden">
  </div>
  `;
  return ideaDownContent
}

function horizontalDividerDiv() {
  let div =
  `
  <div class="horizontal-divider"></div>
  `;
  return div
}

function newProjectContentContainer() {
  let container =
  `
  <div class="dp-content-container new" id="newProjContentDiv">
    <a href="#" class="dropdown-link new" id="newProjectLink">
    <div>New Project</div>
    </a>
  </div>
  `;
  return container
}

function newIdeaContentContainer() {
  let container =
  `
  <div class="dp-content-container new" id="newProjContentDiv">
    <a href="#" class="dropdown-link new" id="newIdeaLink">
    <div>New Idea</div>
    </a>
  </div>
  `;
  return container
}

function dpContentContainer(dropdownTitle,dropdownType, dpContentId) {
  let container =
  `
  <div class="dp-content-container">
    <a href="#" class="dropdown-link">
      <div dpType=${dropdownType} dpContentId=${dpContentId}>${dropdownTitle}</div>
    </a>
  </div>
  `;
  return container
}

function editButtonWrapper() {
  let wrapper =
  `
  <div class="edit-button-wrapper" id="editButtonWrapper">
    <div class="edit-button-container" id="editButtonContainer">
      <i class="fa fa-edit edit-button-icon"></i>
      <p class="edit-button-title">Edit</p>
    </div>
  </div>
  `;
  return wrapper
}


function downloadAllButton() {
  let button = `
  <button class="download-all-btn" id="downloadAllButton" onclick="downloadAll()">
    Download All
  </button>
  `
  return button
}

function downloadFavoritesButton() {
  let button = `
  <button class="download-faves-btn" id="downloadFavesButton" onclick="downloadFavorites()">
    Download Favorites
  </button>
  `
  return button
}


