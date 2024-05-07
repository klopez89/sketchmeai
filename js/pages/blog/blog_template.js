function blogListHTML() {
    return `
    <div class="bg-gray-100 h-full relative flex justify-center">
        <div class="mx-auto max-w-4xl px-8 py-8 h-full w-full bg-gray-100 transform transition-all duration-200 ease-in-out">
            <header class="mb-6 text-3xl font-bold">SketchMeAi Blog</header>
            <div id="blog-list-container" class="flex flex-col">

            



            </div>
        </div>
    </div>
    `;
}

function blogListGridHTML() {
    return `
    <div id="blog-grid" class="grid grid-cols-2 gap-4">
        <div class="flex flex-col items-start space-y-4 group cursor-pointer" onclick="window.location.href='https://${CONSTANTS.SITE_URL}/blog/entries/post1'">
            <div class="aspect-w-1 aspect-h-1 w-full">
                <img src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_1imgs/blog_post1_img39.png" alt="Blog Post 2 Thumbnail" class="object-cover">
            </div>
            <div>
                <h2 class="text-xl font-bold group-hover:underline">Getting Started with SketchMeAi: Model Training and Generation Basics</h2>
                <p class="text-sm text-gray-500">Thur, March 28th 2024</p>
            </div>
        </div>

        <div class="flex flex-col items-start space-y-4 group cursor-pointer" onclick="window.location.href='https://${CONSTANTS.SITE_URL}/blog/entries/post2'">
            <div class="aspect-w-1 aspect-h-1 w-full">
                <img src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_2imgs/blog_post_2_thumbnail.jpeg" alt="Blog Post 2 Thumbnail" class="object-cover">
            </div>
            <div>
                <h2 class="text-xl font-bold group-hover:underline">Organize Your Generations with Collections</h2>
                <p class="text-sm text-gray-500">Tues, April 23rd 2024</p>
            </div>
        </div>

        <div class="flex flex-col items-start space-y-4 group cursor-pointer"  onmousedown="this.dataset.moving = 'false'" 
        onmousemove="this.dataset.moving = 'true'" 
        onclick="if (this.dataset.moving === 'false') window.location.href='https://${CONSTANTS.SITE_URL}/blog/entries/post3'">
            <div id="post-3-comparison-slider" class="aspect-w-1 aspect-h-1 w-full">
                <comparison>
                    <div class="comp-container" style="--position: 48%;">

                        <div class="image-container">
                            <img class="image-before slider-image" src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blank_sq_1024.png" true_src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_non_ays.png" alt="Before, non ays image for post 3">
                            <img class="image-after slider-image" src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blank_sq_1024.png" true_src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_ays.png" alt="Afer, ays image for post 3">
                        </div>
                        
                        <input type="range" min="0" max="100" value="50" aria-label="Percentage of before photo shown" class="slider" autocompleted="">
                        <div class="slider-line" aria-hidden="true"></div>

                        <div class="slider-button" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                <line x1="96" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                <polyline points="48 160 16 128 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                                <line x1="160" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                <polyline points="208 96 240 128 208 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                            </svg>
                        </div>
                    </div>
                </comparison>
            </div>
            <div>
                <h2 class="text-xl font-bold group-hover:underline">Organize Your Generations with Collections</h2>
                <p class="text-sm text-gray-500">Tues, April 23rd 2024</p>
            </div>
        </div>
    </div>
    `;
}