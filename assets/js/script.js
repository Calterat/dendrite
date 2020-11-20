// initializing object for localStorage
let methodPlacement = {};

// Pulling the Whiteboard element for global use
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
const saveMethods = () => {
    localStorage.setItem("methodPlacement", JSON.stringify(methodPlacement));
  };

// generates tiles for drag and drop
const populateCard = (type, thing, method) => {
    // create card element and it's children
    let cardDivEl = $("<div>");
    cardDivEl.addClass('card is-narrow p-2 mx-4');
    let cardTitleEl = $('<h3>').text(type);
    let cardWordEl = $('<h4>').text(thing);
    // add word to title of card and append it to card
    cardDivEl.append(cardTitleEl).append(cardWordEl);
    // if there is no method id then append new, otherwise place in appropriate method column
    if (!method) {
        whiteboardEl.append(cardDivEl);
    } else {
        $(`#${method}`).append(cardDivEl);
    }
};

// jQuery sort function. This also activates Modals.
$(".method-container").sortable({
    connectWith: $(".method-container"),
    appendTo: document.body,
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
    out: function(event) {
        console.log(event.target);
        if (event.target.id === "whiteboard") {
            let whiteBoard = $('#whiteboard');
            console.log(whiteBoard[0].children);
            console.log(whiteBoard[0].children.length);
            if (whiteBoard[0].children.length === 2) {
                randomWordFetch();
                randomWikiFetch();
            }
        }
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
            // if area you are trying to place isn't whiteboard id than save to localStorage
            saveMethods();
        }
      },
      // highlight spots to be able to drop cards
      activate: function(event) {
          for (i=1;i<5;i++){
              $(`#${i}`).addClass('ui-state-highlight');
          }
      },
      deactivate: function(event) {
          for (i=1;i<5;i++){
              $(`#${i}`).removeClass('ui-state-highlight');
          }
      }
  });

// API fetch for random word with wordsAPI and function that creates the card.

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
};

// this functions deletes cards in the targetted method columns
const deleteItems = (event) => {
    if (event.target.className === "button") {
        let id = event.target.attributes[1].value;
        methodPlacement[id] = [];
        $(`#${id}`).html('');
        saveMethods();
    }
}

randomWordFetch();
randomWikiFetch();
loadMethods();
$('#main').on('click', deleteItems);



