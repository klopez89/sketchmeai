addBaseDashboardToDOM();
addUserDeleteFormToDOM();
addAdminLoaderToDOM();

firebase.auth().onAuthStateChanged(function(user) {
    if (user && (user.uid === 'ud8KyII2xkPPrbFU8763bAi40Zz2' || user.uid === 'Vv6tX3E6aNTQNUQHkZEjBXB2S5o2') ) {
        console.log('User is signed in.');
        fetchAdminData();
    } else {
        console.log('No user is signed in.');
        navigationToHomePage();
    }
});

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
		showLoadingDeleteUserButton();
		hideUserDeleteResultLabel();
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
				hideLoadingDeleteUserButton();
				updateUserDeleteResultLabel(`Successfully deleted user with id: ${user_rec_id}`)
				console.log('users/delete endpoint hit success, w/ response: ', response);
			},
			error: function (msg) {
				var failureMsg = `Fell into failure block for action - users/delete, with msg: ${msg}`;
				if (msg.status == 417) {
					failureMsg = msg.responseText;
				}
				hideLoadingDeleteUserButton()
				updateUserDeleteResultLabel(failureMsg);
			},
		});
	}
}


function hideLoadingDeleteUserButton() {
	let deleteUserButtonTextElement = $('#delete-user-button p')[0];
	deleteUserButtonTextElement.classList.remove('text-transparent');
	let deleteUserButtonLoadingElement = $('#delete-user-button i')[0];
	deleteUserButtonLoadingElement.classList.add('hidden');
}

function showLoadingDeleteUserButton() {
	let deleteUserButtonTextElement = $('#delete-user-button p')[0];
	deleteUserButtonTextElement.classList.add('text-transparent');
	let deleteUserButtonLoadingElement = $('#delete-user-button i')[0];
	deleteUserButtonLoadingElement.classList.remove('hidden');
}

function updateUserDeleteResultLabel(result) {
	let resultLabel = document.getElementById('user-delete-result-label');
	resultLabel.innerHTML = result;
	resultLabel.classList.remove('text-transparent');
	resultLabel.classList.add('text-black');
}

function hideUserDeleteResultLabel() {
	let resultLabel = document.getElementById('user-delete-result-label');
	resultLabel.classList.add('text-transparent');
	resultLabel.classList.remove('text-black');
}

function navigationToHomePage() {
    window.location.href = `https://${CONSTANTS.SITE_URL}`;
}