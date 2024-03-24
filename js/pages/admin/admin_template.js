function generateDashboardHTML(data) {
    let html = `
    <div class="p-5 bg-white rounded shadow-md">
        <h2 class="text-2xl font-bold mb-5">Dashboard</h2>
        <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Users</h3>
                <p>${data.total_users}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded">
                <h3 class="font-semibold">Total Credits Purchased</h3>
                <p>${data.total_credits_purchased}</p>
            </div>
            <!-- More divs for other data points -->
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

    html += `</div></div>`;
    return html;
}