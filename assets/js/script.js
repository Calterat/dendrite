let methodPlacement = {};
// API fetch for random word with wordsAPI and function that creates the card.
const whiteboardEl = $('#whiteboard');

// loads localStorage items
const loadMethods = () => {
    methodPlacement = JSON.parse(localStorage.getItem("methodPlacement"));
    // if nothing in localStorage, create a new object to track all cards in what methods
    if (!methodPlacement) {
      methodPlacement = {
        '1': [],
        '2': [],
        '3': [],
        '4': []
      };
    }

    // loop over object properties
    $.each(methodPlacement, function(list, arr) {
    // then loop over sub-array
    arr.forEach(function(method) {
      populateCard(method.randoFrom, method.rando, list);
    });
  });
}

// save method placements
const saveTasks = () => {
    localStorage.setItem("methodPlacement", JSON.stringify(methodPlacement));
  };

// generates random tiles for drag and drop
const populateCard = (type, thing, method) => {
    // create card element and it's children
    let cardDivEl = $("<div>");
    cardDivEl.addClass('card is-narrow p-2 mx-4');
    let cardTitleEl = $('<h3>').text(type);
    let cardWordEl = $('<h4>').text(thing);
    // add word to title of card and append it to card
    cardDivEl.append(cardTitleEl).append(cardWordEl);
    if (!method) {
        whiteboardEl.append(cardDivEl);
    } else {
        $(`#${method}`).append(cardDivEl);
    }
}

$(".method-container").sortable({
    connectWith: $(".method-container"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    receive: function(event) {
        // let re = / /gi;
        // let query = event.target.childNodes[1].childNodes[1].innerText.replace(re, '+');
        // let modalNum = event.target.id;
        // let modalQuery = $(`#modalLink${modalNum}`);
        // let modalLink = $('<a>').attr('href', `https://www.google.com/search?q=${query}`).attr('target', '_blank')
        // modalLink.html(`Click here to see your google search on ${event.target.childNodes[1].childNodes[1].innerText}`);
        // modalQuery.append(modalLink);
        // $(`#modal-method${modalNum}`).addClass('active');
    },
    update: function(event) {
        let tempArr = [];
        $(this).children().each(function(){
            let randoText = $(this).find('h3').text().trim();
            let randoTitle = $(this).find('h4').text().trim();
            tempArr.push({
                randoFrom: randoText,
                rando: randoTitle
            })
        });
        let arrName = $(this).attr("id");
        if (arrName !== 'whiteboard') {
            methodPlacement[arrName] = tempArr;
            saveTasks();
        }
      }
  });

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
            // populateCard('Random Wiki:', response.query.random[2].title);
            // populateCard('Random Wiki:', response.query.random[3].title);
        })
}


randomWordFetch();
randomWikiFetch();
loadMethods();


// display cards using chosen CSS CDN in HTML whiteboard div

// make white board cards draggable to any method column

// display the method procedures in modals for each time an item is dragged to its method column



