function basicExamplesHTML() {
    return `
    <div class="bg-gray-100 h-full relative flex justify-center">
        <div class="mx-auto max-w-4xl px-8 py-8 h-full w-full bg-gray-100 transform transition-all duration-200 ease-in-out">
            <div id="examples-container" class="flex flex-col">





            </div>
        </div>
    </div>
    `;
}

const example_dictionaries = [
    {
        "prompt": "closeup portrait graphic image of Kevin with soft smile and sleek red-colored leather jacket, style is bold, sharp outlines and solid borders around each shape, reminiscent of cell-shading in classic animation and graphic novels",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.9,
        "seed": 382414040,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img8.png"
    },
    {
        "prompt": "closeup portrait graphic image of Kevin with soft smile and sleek red-colored leather jacket, style is bold, sharp outlines and solid borders around each shape, reminiscent of cell-shading in classic animation and graphic novels",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.9,
        "seed": 382414040,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img8.png"
    },
    {
        "prompt": "closeup portrait graphic image of Kevin with soft smile and sleek red-colored leather jacket, style is bold, sharp outlines and solid borders around each shape, reminiscent of cell-shading in classic animation and graphic novels",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.9,
        "seed": 382414040,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img8.png"
    }
];



function newPromptExample(example_dictionary) {
    return `
    <div class="flex flex-col md:flex-row items-start p-4 gap-4">
        <div class="w-full md:w-1/2">
            <div class="aspect-w-10 aspect-h-10 overflow-hidden">
                <img src="https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img8.png" alt="Image description" class="object-cover w-full h-full">
            </div>
        </div>
        <div id="prompt-values" class="md:w-1/2">
            <div id="value-set">
                <header3 class="text-base font-semibold">Prompt</header3>
                <div class="text-sm text-black">closeup portrait graphic image of Kevin with soft smile and sleek red-colored leather jacket, style is bold, sharp outlines and solid borders around each shape, reminiscent of cell-shading in classic animation and graphic novels
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Negative Prompt</header3>
                <div class="text-sm text-black">morbid, photorealistic, ugly, teeth
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Denoising Steps</header3>
                <div class="text-sm text-black">20
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Guidance Scale</header3>
                <div class="text-sm text-black">13
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Lora Scale</header3>
                <div class="text-sm text-black">0.9
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Seed</header3>
                <div class="text-sm text-black">382414040
                </div>
            </div>
        </div>
    </div>
    `
}