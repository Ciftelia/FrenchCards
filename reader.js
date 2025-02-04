document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('json-selector');
    fetchAndDisplayJSON(selector.value);

    selector.addEventListener('change', (event) => {
        fetchAndDisplayJSON(event.target.value);
    });
});

function fetchAndDisplayJSON(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            createHtmlElement(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

function createHtmlElement(jsonData) {
    const container = document.getElementById('flashcards-container');
    container.innerHTML = ''; // Clear previous content

    jsonData.notes.forEach(note => {
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard';

        const questionElement = document.createElement('h4');
        questionElement.innerHTML = note.fields[0];
        cardElement.appendChild(questionElement);

        const answerElement = document.createElement('p');
        answerElement.innerHTML = note.fields[1];
        cardElement.appendChild(answerElement);

        container.appendChild(cardElement);
        
        
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


