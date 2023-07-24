//the call to bored API
var mainButton = document.querySelector("#boredButton")
var dropdownHeader = document.querySelector(".dropbtn")
var dropdownOptions = document.querySelector(".dropdown-content")
var boredAPIResponse = document.querySelector(".boredAPI")
var cards = document.querySelectorAll(".card")

var urlOgMetaTag = document.querySelector('[property="og:url"]')
var facebookShare = document.querySelector(".fb-share-button")
var ogTitleMetaTag = document.querySelector('[property="og:title"]')
var ogImageMetaTag = document.querySelector('[property="og:image"]')


facebookShare.setAttribute("data-href",window.location.href)
urlOgMetaTag.setAttribute("content",window.location.href)




function getCategory(){
    var type
    var dropdownHeaderText = dropdownHeader.innerText
    if (dropdownHeaderText === "Categories"){
        type = ''
    } else {
        //the API query takes the category in lowercase
        dropdownHeaderText = dropdownHeaderText[0].toLowerCase() + dropdownHeaderText.substring(1)
        if (dropdownHeaderText === "d.I.Y."){
            dropdownHeaderText = "diy"
        }
        type = '?type=' + dropdownHeaderText
        console.log(type)
    }
    return type
}

function getThingToDo(){
    var type = getCategory()
    
    fetch("https://www.boredapi.com/api/activity" + type)
    .then(function(response){
        //console.log(response.status)
        return response.json()
    }).then(function(data){
        var suggestion = data.activity
        boredAPIResponse.innerHTML = suggestion
        ogTitleMetaTag.setAttribute("content",suggestion)//do something with the data
        getGIF(suggestion)
        for (var i = 0; i < cards.length; i++){
            var card = cards[i]
            card.classList.remove("is-hidden")
        }
    })
}

function getGIF(query){
    //the call to giphy API
    //'q' is where the suggestion from bored API will go
    //all others are unimportant
    fetch("https://api.giphy.com/v1/gifs/search?api_key=PRySORNjXGxSwtXPYa9rBLmB9WAFuRDa&q=" + query + "&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips")
    .then(function(response){
        //console.log(response.status)
        return response.json()
    }).then(function(json){
        for (var i = 0; i < 3; i++){
            var GIFEl = document.querySelector(".giphy-gif" + i)
            var GIF = json.data[i]
            var GIFImage = GIF.images.original.url
            ogImageMetaTag.setAttribute("content",GIFImage)//console.log(GIFImage)
            GIFEl.src = GIFImage
        }
        
    })
}

function selectOption(event){
    var selectedOption = event.target.innerText
    dropdownHeader.innerText = selectedOption
    
}

//event listener for the dropdown to select which option the user wants



document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });


  mainButton.addEventListener("click", getThingToDo)
dropdownOptions.addEventListener("click", selectOption)

