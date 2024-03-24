function baseDashboardHTML() {
    return `
    <div id="admin-dashboard" class="p-5 h-full bg-gray-100 rounded shadow-md">
        <h2 class="text-2xl font-bold mb-5">Dashboard</h2>
        <div id="admin-loader" class="w-full h-full px-4 py-8 sm:px-6 lg:px-8">
            <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                <div class="mt-5">    
                    <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </div>
    ;`
}

function dashboardDataHTML(data) {
    let html = `
        <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Users</h3>
                <p>${data.total_users}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Credits Purchased</h3>
                <p>${data.total_credits_purchased}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Images Generated</h3>
                <p>${data.total_images_generated}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Trained Models</h3>
                <p>${data.total_trained_models}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Training Credit Spend</h3>
                <p>${data.total_training_credit_spend.toFixed(2)}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Image Credit Spend</h3>
                <p>${data.total_image_credit_spend.toFixed(2)}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Unused Credits</h3>
                <p>${data.total_credits.toFixed(2)}</p>
            </div>
        </div>
        <h3 class="text-xl font-bold mt-5">Users without AI models</h3>
        <div class="grid grid-cols-1 gap-4">`;

    data.users_without_ai_models.forEach(user => {
        for (let key in user) {
            html += `
            <div class="p-3 bg-red-100 rounded">
                <h4 class="font-semibold">User ID: ${key}</h4>
                <p>Email: ${user[key].email}</p>
                <p>Display Name: ${user[key].display_name}</p>
            </div>`;
        }
    });

    html += `</div>
    <h3 class="text-xl font-bold mt-5">Users with AI model but no generations</h3>
    <div class="grid grid-cols-1 gap-4">`;

    data.users_with_ai_model_but_no_generations.forEach(user => {
        for (let key in user) {
            html += `
            <div class="p-3 bg-yellow-100 rounded">
                <h4 class="font-semibold">User ID: ${key}</h4>
                <p>Email: ${user[key].email}</p>
                <p>Display Name: ${user[key].display_name}</p>
            </div>`;
        }
    });

    html += `</div>`;
    return html;
}