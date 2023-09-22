
function loader() {
	let loaderHTML = `
	<div id="loader" class="loader-overlay">
		<i class="fa fa-spinner fa-spin loading-spinner"></i>
	</div>
	`;
	return loaderHTML
}

function centeredLoader_HTML(loadingText = '') {
	let loaderHTML = `
	<div id="loader" class="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-white">
		<div class="flex flex-col items-center gap-4">
			<p class="text-2xl">${loadingText}</p>
			<i class="text-4xl fa fa-spinner fa-spin"></i>
		</div>
	</div>
	`;
	return loaderHTML
}
