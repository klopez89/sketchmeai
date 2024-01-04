
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

function changeActiveMenuPage() {
    var page = window.location.pathname.split('/')[1];
    console.log("page from url: ", page);
    var links = document.querySelectorAll('#static-sidebar a');
    links.forEach(function(link) {
        if (link.href.includes(page)) {
            link.classList.add('bg-gray-800', 'text-white');
        } else {
            link.classList.remove('bg-gray-800', 'text-white');
            link.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-800');
        }
    });
}


window.onload = function() {
    addConsoleToDOM();
    copyStaticSidebar();
    console.log("about to hit changeActiveMenuPage()");
    changeActiveMenuPage();
}