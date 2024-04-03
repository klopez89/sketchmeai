function baseDashboardHTML() {
    return `
    <div id="admin-dashboard" class="p-5 h-full bg-gray-100 rounded shadow-md overflow-y-auto">
        <h2 class="text-2xl font-bold mb-5">Dashboard</h2>
    </div>
    `;
}

function adminLoaderHTML() {
    return `
    <div id="admin-loader" class="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div class="bg-gray-100 w-full flex justify-center items-start">
            <div class="mt-5">    
                <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    `;
}

function dashboardDataHTML(data) {
    let html = `
        <div class="grid grid-cols-2 gap-4 p-4 bg-gray-200">
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Users</h3>
                <p>${data.total_users}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Credits Purchased</h3>
                <p>${data.total_credits_purchased}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Images Generated</h3>
                <p>${data.total_images_generated}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Trained Models</h3>
                <p>${data.total_trained_models}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Training Credit Spend</h3>
                <p>${data.total_training_credit_spend.toFixed(2)}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Image Credit Spend</h3>
                <p>${data.total_image_credit_spend.toFixed(2)}</p>
            </div>
            <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-semibold">Total Unused Credits</h3>
                <p>${data.total_credits.toFixed(2)}</p>
            </div>
        </div>
        <h3 class="text-xl font-bold mt-5">Users without AI models</h3>
        <div class="grid grid-cols-1 gap-4 p-4 bg-gray-200">`;

    data.users_without_ai_models.forEach(user => {
        for (let key in user) {
            html += `
            <div class="p-3 bg-gray-100 rounded">
                <h4 class="font-semibold">User ID: ${key}</h4>
                <p>Email: ${user[key].email}</p>
                <p>Display Name: ${user[key].display_name}</p>
            </div>`;
        }
    });

    html += `</div>
    <h3 class="text-xl font-bold mt-5">Users with AI model but no generations</h3>
    <div class="grid grid-cols-1 gap-4 p-4 bg-gray-200">`;

    data.users_with_ai_model_but_no_generations.forEach(user => {
        for (let key in user) {
            html += `
            <div class="p-3 bg-gray-100 rounded">
                <h4 class="font-semibold">User ID: ${key}</h4>
                <p>Email: ${user[key].email}</p>
                <p>Display Name: ${user[key].display_name}</p>
            </div>`;
        }
    });

    html += `</div>`;
    return html;
}

function deleteUserFormHTML() {
    return `
    <div class="p-5 bg-gray-200 mt-5 mb-5">
        <h2 class="text-2xl font-bold mb-5">Delete User</h2>
        <form id="delete-user-form" class="bg-gray-100 p-3 rounded">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="user_rec_id">
                    User Record ID
                </label>
                <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user_rec_id" type="text" placeholder="Enter user record ID">
                <button id="delete-user-button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onclick="deleteUser()">
                    <p class="flex items-center">Delete</p>
					<i class="fa fa-spinner fa-spin hidden absolute" aria-hidden="true"></i>
                </button>
                <label id="user-delete-result-label" class="block text-black italic text-xs mt-2">
                    Successfully deleted user with id: 123abc
                </label>
            </div>
        </form>
    </div>
    `;
}