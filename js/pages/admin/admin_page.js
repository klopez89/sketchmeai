addBaseDashboardToDOM();
fetchAdminData();
// addAdminDivsToDOM();

function addBaseDashboardToDOM() {
    let base_dashboard_html = baseDashboardHTML();
    let base_dashboard_div = $($.parseHTML(base_dashboard_html));
    $('body').append(base_dashboard_div);
}

function addInfoToDashboard(admin_data) {
    let dashboard_data_html = dashboardDataHTML(admin_data);
    let dashboard_data_div = $($.parseHTML(dashboard_data_html));
    $('#admin-dashboard').append(dashboard_data_div);
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
            addInfoToDashboard(response);
			console.log('admin/health endpoint hit success, w/ response: ', response);
		},
		error: function (msg) {
            hideLoader();
			console.log("Fell into failure block for action - admin/health, with msg: ", msg);
		},
  	});
}