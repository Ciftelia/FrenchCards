fetch('./FlashCardsAsJSON/deck.json')
    .then(response => response.json())
    .then(data => {
        data['notes'].forEach(card => {
            console.log(card['fields'][0])
            console.log(card['fields'][1])
            let question = card['fields'][0]
            let answer = card['fields'][1]
            let cardDiv = document.createElement('div')

            cardDiv.classList.add('card')
            let questionDiv = document.createElement('div')
            questionDiv.classList.add('question')
            questionDiv.innerHTML = question
            let answerDiv = document.createElement('div')
            answerDiv.classList.add('answer')
            answerDiv.innerHTML = answer
            cardDiv.appendChild(questionDiv)
            cardDiv.appendChild(answerDiv)
            document.querySelector('#flashcards-container').appendChild(cardDiv)
            
            let breakLine = document.createElement('br')
            document.querySelector('#flashcards-container').appendChild(breakLine)
        })
        
    })


