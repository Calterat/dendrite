// API fetch for random word with wordsAPI and function that creates the card.
const whiteboardEl = $('#whiteboard');

const populateCard = (type, thing) => {
    // create card element and it's children
    let cardDivEl = $("<div>");
    cardDivEl.addClass('card is-narrow p-2');
    let cardTitleEl = $('<h3>').text(type);
    let cardWordEl = $('<h4>').text(thing);
    // add word to title of card and append it to card
    cardDivEl.append(cardTitleEl).append(cardWordEl);
    whiteboardEl.append(cardDivEl);
}

// pulls random word and then spits it to it's card generator
const randomWordFetch = () => {
    let wordsApiUrl = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
    let wordsApiKey = "XXX";
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
            if (response) {
                populateCard('Random Word(s):', response.word);
            } else {
                populateCard('Randomness:', 'Placeholder');
            }
        })
}

// API fetch for random wikipedia article.

// pulls random word and then spits it to it's card generator
const randomWikiFetch = () => {
    let wikiApiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=4&origin=*';
    fetch(wikiApiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert(`ERROR: ${response.statusText}`);
            }
        })
        .then(response => {
            populateCard('Random Wiki:', response.query.random[0].title);
            populateCard('Random Wiki:', response.query.random[1].title);
            populateCard('Random Wiki:', response.query.random[2].title);
            populateCard('Random Wiki:', response.query.random[3].title);
        })
}


randomWordFetch();
randomWikiFetch();

// API fetch for random fact from X API

// API fetch for random fact from Y API

// API fetch for random fact from Z API


// display cards using chosen CSS CDN in HTML whiteboard div

// make white board cards draggable to any method column

// display the method procedures in modals for each time an item is dragged to its method column



