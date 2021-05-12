console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
    loadBreedOptions();
});

// On page load fetch the images using the url 
function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/10"
    fetch(imgUrl)
      .then(res=> res.json())
      .then(results => {
        results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPicUrl;
    container.appendChild(newImageEl);
}

// On page load fetch all the dog breeds using the url
function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
      .then(res => res.json())
      .then(results => {
  
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

// Color changes on click
function updateColor(event) {
    event.target.style.color = 'lightblue';
}

// User can filter breeds that start with a particular letter using a dropdown
function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      selectBreedsStartingWith(event.target.value);
    });
}




