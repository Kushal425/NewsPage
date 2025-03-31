// API details: https://newsdata.io/news-sources/India-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in"; 
const options = [
    "top", 
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
];

let requestURL;

const generateUI = (articles) => {
    container.innerHTML = ""; 

    if (!articles || articles.length === 0) {
        container.innerHTML = "<p>No articles found.</p>";
        return;
    }

    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
    <img src="${item.image_url || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.link}" target="_blank" class="view-button">Read More</a>
    </div>`;
        container.appendChild(card);
    }
};

const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.results); 
};

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    
    requestURL = `https://newsdata.io/api/1/latest?country=${country}&category=${category}&apikey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${i == "top" ? "active" : ""
            }" onclick="selectCategory(event,'${i}')">${i}</button>`; 
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsdata.io/api/1/latest?country=${country}&category=top&apikey=${apiKey}`; 
    init();
};