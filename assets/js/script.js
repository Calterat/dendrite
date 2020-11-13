// API fetch for random word with wordsAPI and function that creates the card.
const whiteboardEl = $('#whiteboard');
let wordsApiUrl = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
let wordsApiKey = "XXX";

const populateWordCard = (word) => {
    console.log(word);
    // create card element and it's children
    let cardDivEl = $("<div>");
    let cardTitleEl = $('<h3>').text('Random Word(s):');
    let cardWordEl = $('<h4>').text(word);
    // add word to title of card and append it to card
    cardDivEl.append(cardTitleEl).append(cardWordEl);
    whiteboardEl.append(cardDivEl);
}

// pulls random word and then spits it to it's card generator
const randomWordFetch = () => {
    fetch(`${wordsApiUrl}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": wordsApiKey,
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // alert(`ERROR: ${response.statusText}`);
            }
        })
        .then(response => {
            populateWordCard(response.word);
        })
}

randomWordFetch();

// API fetch for random fact from X API

// API fetch for random fact from Y API

// API fetch for random fact from Z API


// display cards using chosen CSS CDN in HTML whiteboard div

// make white board cards draggable to any method column

// display the method procedures in modals for each time an item is dragged to its method column



