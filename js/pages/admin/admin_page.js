fetchAdminData();
// addAdminDivsToDOM();

function addAdminDivsToDOM() {
    let admin_dashboard_html = generateDashboardHTML();
    let admin_dashboard_div = $($.parseHTML(admin_dashboard_html));
    $('body').append(admin_dashboard_div);
}

function fetchAdminData() {
	let action = `${CONSTANTS.BACKEND_URL}admin/health`
	$.ajax({
		url: action,
		method: "POST",
		data: JSON.stringify({}),
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log('admin/health endpoint hit success, w/ response: ', response);
		},
		error: function (msg) {
            hideLoader();
			console.log("Fell into failure block for action - admin/health, with msg: ", msg);
		},
  	});
}