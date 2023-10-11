

function breadcrumb_HTML() {
	let html = `
	<div class="breadcrumb-background" style="display: flex; justify-content: center; margin-top: 30px;">
		<nav class="flex bg-white shadow-sm" aria-label="Breadcrumb" style="padding: 16px 1.6rem 16px 0.6rem; border-radius: 5px;">
			<ol role="list" class="flex items-center space-x-4">
				<li>
					<div>
						<!-- Login -->
						<p id="bc-login" class="ml-4 text-base font-semibold text-gray-300 cursor-default" aria-current="page">Auth</p>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<p id="bc-payment" class="ml-4 text-base font-semibold text-gray-300 cursor-default" aria-current="page">Payment</p>

					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<p id="bc-upload" class="ml-4 text-base font-semibold text-gray-300 cursor-default" aria-current="page">Upload</p>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<p id="bc-summary" class="ml-4 text-base font-semibold text-gray-300 cursor-default" aria-current="page">Summary</p>
					</div>
				</li>

			</ol>
		</nav>
	</div>
	`;
	return html;
}

function firebaseUI_HTML() {
	let firebase_ui_html = `
	<div class="px-8 flex flex-col flex-grow">
		<div class="px-0 pt-7 pb-8 flex flex-col flex-grow">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-semibold leading-6 text-gray-800">Authenticate</h3>
						<p class="mt-1 text-sm text-gray-500">Create an account or sign in.</p>
					</div>
				</div>
			</div>

			<div class="relative block w-full p-12 flex flex-col flex-grow justify-center" >
				<div>
					<div id="firebaseui-auth-container">
					</div>
				</div>
			</div>
		</div>
	</div>
	`; 
	return firebase_ui_html
}

function purchaseContextContainer_HTML() {
	let html = `
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8" style="margin-top: 20px;">
		<div class="mx-auto max-w-3xl shadow-sm">
			<!-- Content goes here -->
			<div class="purchase-context-div min-h-[500px] flex flex-col bg-white rounded relative"></div>
			<button class="hidden float-right mt-4 rounded-md px-3 py-2 text-sm font-semibold shadow-sm bg-white bg-opacity-80 text-gray-400 hover:bg-gray-200" id="logout" onclick="signOutUser()">
            Logout
			</button>
			<button class="float-left flex flex-row items-center mt-0 rounded-md ml-[-9px] pr-3 py-2 text-sm font-semibold bg-transparent text-gray-400 hover:text-gray-500" id="logout" onclick="goBackHome()">
				<svg class="h-7 w-7 flex-shrink-0 transform scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
				</svg>Back home
			</button>
		</div>
	</div>
	`;
	return html;
}

function paymentContext_HTML() {
	let html = `
	<div class="px-0 py-0">

		<div class="px-8 pt-7 pb-5">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-semibold leading-6 text-gray-800">Complete Payment</h3>
						<p class="mt-1 text-sm text-gray-500">One-time payment. Powered by Stripe.</p>
					</div>
				</div>
			</div>

			<div class="overflow-hidden border border-gray-200 rounded-md bg-white shadow mt-10 mb-0" style="">
				<ul role="list" class="divide-y divide-gray-200">
					<li class="px-2 py-2">
						<div class="bg-white px-2 py-2 sm:px-4">
							<div class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
								<div class="ml-4 mt-4">
									<h3 class="text-lg font-medium leading-6 text-gray-800" id="productName"></h3>
									<ul class="list-disc text-sm pl-8 pt-2" id="productFeatureList"></ul>
								</div>
								<div class="ml-4 mt-4 flex-shrink-0">
									<button type="button" class="ml-3 inline-flex items-center rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500" onclick="userWantsToPay()" id="payButton"></button>
								</div>
							</div>
						</div>
					</li>
					<!-- More items... -->
				</ul>
			</div>
		</div>

		<div class="border-gray-200 bg-white px-14 pt-0">
			<div class="ml-0 mt-0 flex flex-wrap items-center justify-between sm:flex-nowrap">
				<div class="">
					<h3 class="text-sm text-gray-500 pb-2">Examples across included themes:</h3>
				</div>
			</div>
		</div>

		<div class="flex space-x-2 overflow-x-auto pl-12 pb-2" id="productImageCarousel">
		</div>
	</div>
	`;
	return html;
}


function uploadContext_HTML() {
	let html = `
	<div class="px-8">
		<div class="px-0 pt-7 pb-8">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-semibold leading-6 text-gray-800">Upload Images</h3>
						<p class="mt-1 text-sm text-gray-500">To train a new AI model, upload 10 images of yourself or any other person. Crop other people out. Variety is encouraged, including images w/ torso and varying light conditions. This custom AI model is configured to be trained on a person, so uploading images of a different subject will yield unexpected results.</p>
					</div>
				</div>
			</div>
		</div>
		<button id="uploadAreaButton" class="relative flex flex-col items-center block w-full rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400">
			<div class="flex flex-row items-center">		
				<i class="fa fa-images text-base pr-2"></i>
				<span class="mt-0 block text-base font-medium text-gray-400" id="upload-caption">Drag or click to upload 10 images</span>
			</div>
		</button>
		<input id="localUploadInput" type="file" style="display:none;" multiple/>
	</div>

	<ul role="list" id="uploadEntryContainer" class="flex overflow-x-auto space-x-2 pb-4 pt-6 px-8 mb-5">
	</ul>

	<div id="uploadToServerButtonContainer" class="px-8 pb-8 flex justify-center">
		<button type="submit" id="uploadToServerButton" class="flex w-fit shadow-sm items-center justify-center rounded-md border border-transparent bg-gray-200 px-5 py-3 text-base font-semibold text-white hover:bg-gray-200" disabled="">
		<p>Upload</p>
		<i class="fa fa-spinner fa-spin" style="position: absolute; display:none;"></i>
		</button>
	</div>
	`;
	return html;
}


function uploadEntryDiv(file, is_first_file) {
  let filename = file.name;
  let fileSize = file.size;
  let fileType = file.type;

  let html =
  `
		<li class="w-[8em] h-[8em] flex flex-none divide-y divide-gray-200 rounded-lg bg-white text-center shadow" filename="${filename}" filetype="${fileType}">
			<div class="flex flex-col" style="position: relative;">
				<img id="uploadedImage" class="w-full h-full rounded-lg object-cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="">
				<button class="remove-upload-button">
		      <span class="fa-stack" style="width:2.0em;">
		        <i class="fa fa-circle fa-stack-2x"></i>
		        <i class="fa fa-times fa-stack-1x fa-inverse"></i>
		      </span>
				</button>
			</div>
		</li>
  `;

  return html
}

function summaryContext_HTML(title, subtitle, callToAction, callToActionLink) {
	let callToActionButton_html = '';
	if (callToActionLink != null) {
		let url = new URL(callToActionLink);
		let params = new URLSearchParams(url.search);
		let image_set_name = params.get('image_set_name');
		image_set_name = image_set_name.replace(/_/g, ' ');
		image_set_name = image_set_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		let buttonTitle = `Go to ${image_set_name}`;
		
		callToActionButton_html = `<button type="button" class="select-to-share-button mt-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onclick="window.location.href='${callToActionLink}'">${buttonTitle}</button>`
	}

	let html = `
	<div class="px-8 flex flex-col flex-grow">
		<div class="px-0 pt-7 pb-8 flex flex-col flex-grow">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-semibold leading-6 text-gray-800">${title}</h3>
						<p class="mt-1 text-sm text-gray-500">${subtitle}</p>
					</div>
				</div>
			</div>

			<div class="relative block w-full p-12 text-center text-gray-300 flex flex-col flex-grow justify-center" id="callToActionArea">
				<div>
					<span class="mt-2 block text-base font-medium text-gray-400" id="upload-caption">${callToAction}</span>
					${callToActionButton_html}
				</div>
			</div>
		</div>
	</div>
	`;
	return html;
}

function product_feature_list_html(feature_list) {
	let html = '';
	feature_list.forEach(feature => {
		html += `<li class="mb-1 text-gray-500">${feature}</li>\n`;
	});
	return html;
}



function image_set_theme_info_html(image_set_theme_info) {
	let html = '';
	let keys = Object.keys(image_set_theme_info);
	for(let i = 0; i < keys.length; i++) {
		let theme_name = image_set_theme_info[keys[i]][0];
		theme_name = theme_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		let image_url = image_set_theme_info[keys[i]][1];
		html += `<div class="flex-none bg-white p-2 rounded-md">
        <img src="${image_url}" alt="Description 1" class="w-[8em] h-[8em] shadow-md object-cover rounded-md mb-2">
        <p class="text-center text-sm text-gray-500">${theme_name}</p>
    </div>\n`;
	}
	return html;
}

function payment_button_html(price, strikethrough_price) {
	let html = `
	Pay ${price}&nbsp;<p class="line-through font-thin text-blue-100">${strikethrough_price}</p>	
	`;
	return html;
}
