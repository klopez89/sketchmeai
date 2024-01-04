
function addConsoleToDOM() {
	let console_html = consoleHtml();
	let console_div = $($.parseHTML(console_html));
  $('body').append(console_div);
}

function copyStaticSidebar() {
    var staticSidebar = document.getElementById('static-sidebar');
    var swapDiv = document.getElementById('swap-for-static-sidebar');
    var clonedSidebar = staticSidebar.cloneNode(true);
    swapDiv.innerHTML = clonedSidebar.innerHTML;
}

window.onload = function() {
    addConsoleToDOM();
    copyStaticSidebar();
}