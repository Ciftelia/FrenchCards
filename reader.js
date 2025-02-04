const isGitHubPages = window.location.hostname === 'your-github-username.github.io';
const basePath = isGitHubPages ? '/FrenchCards' : '';

let jsonData;  // Global variable for fetched data
let currentIndex = 0;

async function fetchJSON(filePath) {
    console.log(filePath);
    try {
        const response = await fetch(filePath);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function showCard(index) {
    console.log(jsonData, index);
    const container = document.getElementById('flashcards-container');
    container.innerHTML = ''; // Clear previous card

    const note = jsonData.notes[index]; // get the current card

    if (!note) return; // Prevent errors if the index is out of range

    const cardElement = document.createElement('div');
    cardElement.className = 'flashcard';

    const questionElement = document.createElement('h4');
    questionElement.innerHTML = note.fields[0];
    questionElement.className = 'centered';
    cardElement.appendChild(questionElement);

    const answerElement = document.createElement('button');
    answerElement.innerHTML = note.fields[1];
    answerElement.style.display = 'none'; // Hide answer initially
    answerElement.className = 'wrap';
    cardElement.appendChild(answerElement);

    // Button to reveal the answer
    const showAnswerButton = document.createElement('button');
    showAnswerButton.innerText = 'Show Answer';
    showAnswerButton.onclick = () => {
        answerElement.style.display = 'block';
        showAnswerButton.style.display = 'none'; // Hide the 'Show Answer' button
    };
    cardElement.appendChild(showAnswerButton);
    container.appendChild(cardElement);
}

function nextCard() {
    if (currentIndex < jsonData.notes.length -1 ) {
        currentIndex++;
        showCard(currentIndex);
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentIndex);
    }
}

 document.addEventListener('DOMContentLoaded', async () => {
    const selector = document.getElementById('json-selector');
    jsonData = await fetchJSON(basePath+selector.value);

    const container = document.getElementById('container');

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous Card';
    prevButton.onclick = prevCard;
    container.appendChild(prevButton);  

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next Card';
    nextButton.onclick = nextCard;  
    container.appendChild(nextButton);

    // Show the first card
    showCard(currentIndex);
});

document.getElementById('json-selector').addEventListener('change', async (event) => {
    jsonData = await fetchJSON(basePath+event.target.value);
    currentIndex = 0; // Reset to the first card
    showCard(currentIndex);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


