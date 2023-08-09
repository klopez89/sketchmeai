document.addEventListener('TailwindLoaded', function() {
  configureHomePage();
});

function configureHomePage() {
	addHomePageToDOM();
}

function addHomePageToDOM() {
	let home_page_html = homePageHtml();
	let home_page_div = $($.parseHTML(home_page_html));
  $('body').append(home_page_div);
}

