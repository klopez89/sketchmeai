

// Array of middle parts of the prompts
const middleParts = [
    "wearing a sleek black leather jacket,",
    "wearing a sleek red leather jacket,",
    "wearing a sleek baby-blue leather jacket,",
    "sitting on a wooden bench,",
    "standing under a cherry blossom tree,"
    // Add more as needed
];

// Array of last parts of the prompts
const lastParts = [
    "forest in background",
    "city skyline behind",
    "ocean waves in background",
    "mountains in the distance"
    // Add more as needed
];

const firstParts = [
    "Person",
    "Cat",
    "Dog",
    "Bird",
    "Lizard",
    "Fish",
    "Robot",
]

function generatePrompt(model_name) {
    // Get a random middle part
    const randomMiddle = middleParts[Math.floor(Math.random() * middleParts.length)];

    // Get a random last part
    const randomLast = lastParts[Math.floor(Math.random() * lastParts.length)];

    // Get a random first part if its an empty string
    if (model_name == "") {
        model_name = firstParts[Math.floor(Math.random() * firstParts.length)];
    }

    // Construct the prompt
    const prompt = `${model_name} with a soft smile, ${randomMiddle} ${randomLast}`;

    return prompt;
}

