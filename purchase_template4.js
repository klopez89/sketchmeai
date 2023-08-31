

function breadcrumb_HTML() {
	let html = `
	<div class="breadcrumb-background" style="display: flex; justify-content: center; margin-top: 30px;">
		<nav class="flex" aria-label="Breadcrumb" style="padding: 16px 1.6rem 16px 0.6rem; background-color: rgba(61, 61, 61, 1); border-radius: 5px;">
			<ol role="list" class="flex items-center space-x-4">
				<li>
					<div>
						<!-- Login -->
						<a href="#" id="bc-login" class="ml-4 text-base font-bold text-gray-400 hover:text-gray-700">Login</a>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<a href="#" id="bc-payment" class="ml-4 text-base font-bold text-gray-400 hover:text-gray-700">Payment</a>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<a href="#" id="bc-upload" class="ml-4 text-base font-bold text-gray-400 hover:text-gray-700">Upload</a>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<!-- Heroicon name: mini/chevron-right -->
						<svg class="h-7 w-7 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
						</svg>
						<a href="#" id="bc-summary" class="ml-4 text-base font-bold text-gray-400 hover:text-gray-700" aria-current="page">Summary</a>
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
	<div class="firebase-ui-container">
		<div id="firebaseui-auth-container" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
		</div>
	</div>
	`; 
	return firebase_ui_html
}

function purchaseContextContainer_HTML() {
	let html = `
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8" style="margin-top: 20px;">
		<div class="mx-auto max-w-3xl">
			<!-- Content goes here -->
			<div class="purchase-context-div min-h-[520px] bg-white rounded relative"></div>
			<button class="float-right mt-4 bg-transparent hover:bg-gray-200 text-gray-400 font-bold py-2 px-4 rounded border border-blue-500 hover:border-transparent" id="logout" onclick="signOutUser()" style="display: none;">
            Logout
			</button>
		</div>
	</div>
	`;
	return html;
}

function paymentContext_HTML() {
	let html = `
	<div class="px-0 py-0">

		<div class="px-8 pt-7 pb-14">
			<div class="bg-white sm:px-0 mb-4">
				<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div class="">
						<h3 class="text-xl font-medium leading-6 text-gray-900">Complete Payment</h3>
						<p class="mt-1 text-sm text-gray-500">One-time payment. No subscription.</p>
					</div>
				</div>
			</div>

			<div class="overflow-hidden border border-gray-200 rounded-md bg-white shadow mt-12 mb-0" style="">
				<ul role="list" class="divide-y divide-gray-200">
					<li class="px-2 py-2">
						<div class="bg-white px-2 py-2 sm:px-4">
							<div class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
								<div class="ml-4 mt-4">
									<h3 class="text-lg font-medium leading-6 text-gray-900">Image Set #1</h3>
									<p class="mt-1 text-sm text-gray-500">100 photos across 20 styles, in small format (512x512)</p>
								</div>
								<div class="ml-4 mt-4 flex-shrink-0">
									<form action="https://whollyai-5k3b37mzsa-ue.a.run.app/create-checkout-session?price-id=price_1MRsmGEJKRsETpgK3kgoxqy4" method="POST">
										<button type="submit" id="set_one_button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 py-3 px-8 text-base font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50">Pay $7.99&nbsp;&nbsp;<p class="line-through font-thin text-orange-100">$10</p></button>
									</form>
								</div>
							</div>
						</div>
					</li>
					<!-- More items... -->
				</ul>
			</div>
		</div>

		<div class="border-gray-200 bg-white px-8 pt-0">
			<div class="ml-0 mt-0 flex flex-wrap items-center justify-between sm:flex-nowrap">
				<div class="">
					<h3 class="text-sm text-gray-500 pb-2">Samples with David Bowie:</h3>
				</div>
			</div>
		</div>


		<ul role="list" class="overflow-x-auto flex flex-row gap-4 pb-7 pt-2 pl-8">
			<li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.cloud.google.com/gayi-ai-stock-photos/4de38a3b-55a3-46eb-968d-e079a4741468.jpg?authuser=3" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-red-100 px-2 py-1 font-medium text-red-800 text-s">Santa Hat</span>
						</dd>
					</dl>
				</div>
				
			</li><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/Hr3hVa.png13_12_2022__20_16_44.png" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-orange-100 px-2 py-1 font-medium text-orange-800 text-s">Leather Daddy</span>
						</dd>
					</dl>
				</div>
				
			</li><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/IMG_8433.PNG" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-fuchsia-100 px-2 py-1 font-medium text-fuchsia-800 text-s">Galactic</span>
						</dd>
					</dl>
				</div>
				
			</li><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/IMG_8503.PNG" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-stone-100 px-2 py-1 font-medium text-stone-800 text-s">Sweater</span>
						</dd>
					</dl>
				</div>
				
			</li>

			<li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/IMG_8504.PNG" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-800 text-s">Champagne</span>
						</dd>
					</dl>
				</div>
				
			</li><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/IMG_8509.PNG" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-fuchsia-100 px-2 py-1 font-medium text-fuchsia-800 text-s">Galactic</span>
						</dd>
					</dl>
				</div>
				
			</li><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/db26a4a3-7abc-4eed-b48b-cd25fcebafa6.jpg" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-red-100 px-2 py-1 font-medium text-red-800 text-s">Santa Hat</span>
						</dd>
					</dl>
				</div>
				
			</li><div class="pr-8"><li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
				<div class="flex flex-col p-4 w-40">
					<img class="mx-auto h-30 w-30 flex-shrink-0 rounded" src="https://storage.googleapis.com/gayi-ai-stock-photos/IMG_8508.PNG" alt="">
					
					<dl class="mt-1 flex flex-grow flex-col justify-between">
						
						
						
						<dd class="mt-2">
							<span class="rounded-full bg-zinc-100 px-2 py-1 text-s font-medium text-zinc-800">In Space</span>
						</dd>
					</dl>
				</div>
				
			</li></div><!-- More people... -->
		</ul>
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
						<h3 class="text-xl font-medium leading-6 text-gray-900">Upload Your Pictures</h3>
						<p class="mt-1 text-sm text-gray-500">In order to train the AI on your likeness, we will need at least 10 photos of you. Please review our photo guidelines so that the AI has the best chance at making aswesome renditions of you!</p>
					</div>
				</div>
			</div>
		</div>
		<button id="uploadAreaButton" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 text-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
			<i class="fa fa-images text-5xl"></i>
		  <span class="mt-2 block text-base font-medium text-gray-400" id="upload-caption">Upload at least 10 photos</span>
		</button>
		<input id="localUploadInput" type="file" style="display:none;" multiple/>
	</div>

	<ul role="list" id="uploadEntryContainer" class="flex flex-wrap gap-2 pb-7 pt-6 pl-0 justify-center">
	</ul>

	<div id="uploadToServerButtonContainer" class="px-8 pb-8 flex justify-center">
		<button type="submit" id="uploadToServerButton" class="flex w-fit items-center justify-center rounded-md border border-transparent bg-gray-200 py-3 px-8 text-base font-semibold text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50" disabled="">
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
		<li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow upload-width-sizing" filename="${filename}" filetype="${fileType}">
			<div class="flex flex-col" style="position: relative;">
				<img id="uploadedImage" class="p-1 rounded-lg upload-preview-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="">
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





