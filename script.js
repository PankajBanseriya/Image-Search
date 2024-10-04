const accessKey = "g_hCQPIzkWY7mn1wVm5wIzaDL21c-ayOwyHyxcmLTdU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
inputData = inputEl.value;
console.log(inputData);
const url = `https://api.unsplash.com/search/photos?query=${inputData}&page=${page}&client_id=${accessKey}`;



const response = await fetch(url);
const data=await response.json();
console.log(data);

const results = data.results;

if(page === 1)
{
    searchResults.innerHTML = "";
}


results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target= "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);

});

page++;
if(page > 1){
    showMore.style.display = "block";
}
 
}

formEl.addEventListener("submit", (event) => {
event.preventDefault();
page = 1;
searchImages();
});

showMore.addEventListener("click",() =>{
    searchImages();
});

window.addEventListener("load", async ()=>{
    let randomPage = Math.floor(Math.random() * 50) + 1
    console.log(randomPage);
    
    const url = `https://api.unsplash.com/photos?per_page=21&client_id=${accessKey}&page=${randomPage}`;

    const response = await fetch(url);
    const data=await response.json();
    console.log(data);

    data.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target= "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    
    });
    

})

