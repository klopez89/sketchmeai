function blogListHTML() {
    return `
    <div class="bg-gray-100 h-full relative flex justify-center">
        <div class="mx-auto max-w-4xl px-8 py-8 h-full w-full bg-gray-100 transform transition-all duration-200 ease-in-out">
            <header class="px-4 mb-6 text-3xl font-bold">SketchMeAi Blog</header>
            <div id="blog-list-container" class="flex flex-col">

            



            </div>
        </div>
    </div>
    `;
}

function blogListGridHTML() {
    return `
    <div id="blog-grid" class="grid grid-cols-2 gap-4">
        <div class="flex flex-col items-start space-y-4 group cursor-pointer">
            <div class="aspect-w-1 aspect-h-1 w-full">
            <img src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_1imgs/blog_post1_img39.png" alt="Blog Image 1" class="object-cover">
            </div>
            <div>
            <h2 class="text-xl font-bold group-hover:underline">Getting Started with SketchMeAi: Model Training and Generation Basics</h2>
            <p class="text-sm text-gray-500">Thur, March 28th 2024</p>
            </div>
        </div>
        <div class="flex flex-col items-start space-y-4">
            <div class="aspect-w-1 aspect-h-1 w-full">
            <img src="https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_1imgs/blog_post1_img45.png" alt="Blog Image 2" class="object-cover">
            </div>
            <div>
            <h2 class="text-xl font-bold">Blog Title 2</h2>
            <p class="text-sm text-gray-500">Published on: <span class="font-medium">Publishing Date 2</span></p>
            </div>
        </div>
    </div>
    `;
}