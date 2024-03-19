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
        "prompt": "closeup drawing of Kevin with a soft smile, in the style of Olivier Bonhomme, in science lab wearing a white coat, wide-angle view, soft shadows, no contrast, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.9,
        "seed": 360946499,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img1.png"
    },
    {
        "prompt": "closeup colored portrait drawing of Kevin with soft smile and dressed in police uniform in the style of Mordecai Ardon, city street in background, wide-angle view, soft shadows, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.95,
        "seed": 268156152,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img2.png"
    },
    {
        "prompt": "closeup portrait graphic image of Kevin with soft smile and santa hat, style is bold, sharp outlines and solid borders, reminiscent of cell-shading in classic animation and graphic novels",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 80,
        "guidanceScale": 13,
        "loraScale": 0.98,
        "seed": 178512442,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img3.png"
    },
    {
        "prompt": "colored portrait drawing of Kevin with a soft smile, wearing a brimmed wizard-hat and wizard-robe, in the style of Christopher Balaskas, castle in background, wide-angle view, soft shadows, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.9,
        "seed": 335962825,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img4.png"
    },
    {
        "prompt": "anime art of Kevin with soft smile, at the beach during sunset, wide-angle view, professional color grading, soft shadows, no contrast, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 0.98,
        "seed": 220047764,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img5.png"
    },
    {
        "prompt": "drawing of Kevin in the pool with a drink, wearing a speedo",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 40,
        "guidanceScale": 10,
        "loraScale": 0.9,
        "seed": 280729989,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img6.png"
    },
    {
        "prompt": "closeup drawing of Kevin with a soft smile, comic and graphic novel style, in space wearing a spacesuit, wide-angle view, soft shadows, no contrast, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 40,
        "guidanceScale": 13,
        "loraScale": 1,
        "seed": 5212531,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img7.png"
    },
    {
        "prompt": "closeup colored portrait drawing of Kevin with soft smile and silver shirt in the style of Alexander Archipenko, crowd in the background, wide-angle view, soft shadows, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 20,
        "guidanceScale": 13,
        "loraScale": 1,
        "seed": 119674369,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img9.png"
    },
    {
        "prompt": "anime art of Kevin with soft smile, wearing cowboy hat, farm in background, wide-angle view, professional color grading, soft shadows, no contrast, clean sharp focus",
        "negativePrompt": "morbid, photorealistic, ugly, teeth",
        "denoisingSteps": 80,
        "guidanceScale": 13,
        "loraScale": 0.98,
        "seed": 337474749,
        "imageUrl": "https://storage.googleapis.com/sketchmeai-public/prompt_examples/home_img10.png"
    },
];



function newPromptExample(example_dictionary) {
    return `
    <div class="flex flex-col md:flex-row items-start p-4 gap-4">
        <div class="w-full md:w-1/2">
            <div class="aspect-w-10 aspect-h-10 overflow-hidden">
                <img src="${example_dictionary.imageUrl}" alt="Image description" class="object-cover w-full h-full">
            </div>
        </div>
        <div id="prompt-values" class="md:w-1/2">
            <div id="value-set">
                <header3 class="text-base font-semibold">Prompt</header3>
                <div class="text-sm text-black">${example_dictionary.prompt}
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Negative Prompt</header3>
                <div class="text-sm text-black">${example_dictionary.negativePrompt}
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Denoising Steps</header3>
                <div class="text-sm text-black">${example_dictionary.denoisingSteps}
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Guidance Scale</header3>
                <div class="text-sm text-black">${example_dictionary.guidanceScale}
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Lora Scale</header3>
                <div class="text-sm text-black">${example_dictionary.loraScale}
                </div>
            </div>
            <div id="value-set" class="mt-2">
                <header3 class="text-base font-semibold">Seed</header3>
                <div class="text-sm text-black">${example_dictionary.seed}
                </div>
            </div>
        </div>
    </div>
    `
}