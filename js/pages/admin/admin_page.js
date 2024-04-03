addBaseDashboardToDOM();
addUserDeleteFormToDOM();
addAdminLoaderToDOM();
fetchAdminData();


function addBaseDashboardToDOM() {
    let base_dashboard_html = baseDashboardHTML();
    let base_dashboard_div = $($.parseHTML(base_dashboard_html));
    $('body').append(base_dashboard_div);
}

function addUserDeleteFormToDOM() {
	let delete_user_form_html = deleteUserFormHTML();
	let delete_user_form_div = $($.parseHTML(delete_user_form_html));
	$('#admin-dashboard').append(delete_user_form_div);
}

function addAdminLoaderToDOM() {
	let admin_loader_html = adminLoaderHTML();
	let admin_loader_div = $($.parseHTML(admin_loader_html));
	$('#admin-dashboard').append(admin_loader_div);
}

function addInfoToDashboard(admin_data) {
    let dashboard_data_html = dashboardDataHTML(admin_data);
    let dashboard_data_div = $($.parseHTML(dashboard_data_html));
    $('#admin-dashboard').append(dashboard_data_div);
}

function hideLoader() {
    $('#admin-loader').animate({height: '0px'}, 500, function() {
        $(this).hide();
    });
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
            hideLoader();
            addInfoToDashboard(response);
			console.log('admin/health endpoint hit success, w/ response: ', response);
		},
		error: function (msg) {
            hideLoader();
			console.log("Fell into failure block for action - admin/health, with msg: ", msg);
		},
  	});
}

function deleteUser() {
	let user_rec_id = document.getElementById('user_rec_id').value;
	if (user_rec_id != '') {

	let action = `${CONSTANTS.BACKEND_URL}users/delete`
		$.ajax({
			url: action,
			method: "POST",
			data: JSON.stringify({
				"user_rec_id": user_rec_id
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (response) {
				console.log('users/delete endpoint hit success, w/ response: ', response);
			},
			error: function (msg) {
				console.log("Fell into failure block for action - users/delete, with msg: ", msg);
			},
		});
	}
}