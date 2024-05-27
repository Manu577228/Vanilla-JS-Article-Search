// Get references to HTML elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeBtn");
const modalArticle = document.getElementById("modalArticle");

// Event listener for search button click
searchBtn.addEventListener("click", searchArticles);

// Function to fetch articles based on search query
function searchArticles() {
  // Get the search query from input
  const query = searchInput.value.trim();
  // Check if query is empty
  if (query === "") {
    alert("Please enter a search query");
    return;
  }

  // Fetch articles from NYT API
  fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=fRNqmrrZuo1fr3DqrClrrusqYXciLLpy`
  )
    .then((response) => {
      // Check if response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully:", data); // Debugging line
      displayResults(data.response.docs);
    })
    .catch((error) => {
      // Log any errors
      console.error("Error fetching articles:", error);
    });
}

// Function to display search results
function displayResults(articles) {
  // Clear previous results
  resultsContainer.innerHTML = "";

  // Handle no results
  if (articles.length === 0) {
    resultsContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }

  // Iterate through articles and create HTML elements for each
  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("result");

    const headline = document.createElement("h2");
    headline.textContent = article.headline.main;

    const snippet = document.createElement("p");
    snippet.textContent = article.snippet;

    articleDiv.appendChild(headline);
    articleDiv.appendChild(snippet);

    // Add event listener to show full article on click
    articleDiv.addEventListener("click", () => {
      displayArticle(article);
    });

    // Append article elements to results container
    resultsContainer.appendChild(articleDiv);
  });
}

// Function to display full article in modal
function displayArticle(article) {
  // Clear previous article content
  modalArticle.innerHTML = "";

  // Create HTML elements for article details
  const headline = document.createElement("h2");
  headline.textContent = article.headline.main;

  const snippet = document.createElement("p");
  snippet.textContent = article.snippet;

  const fullArticle = document.createElement("p");
  fullArticle.textContent = "Full article: ";

  const articleLink = document.createElement("a");
  articleLink.href = article.web_url;
  articleLink.textContent = article.web_url;
  articleLink.target = "_blank";

  // Append article elements to modal
  modalArticle.appendChild(headline);
  modalArticle.appendChild(snippet);
  modalArticle.appendChild(fullArticle);
  modalArticle.appendChild(articleLink);

  // Show modal
  modalContainer.style.display = "block";
}

// Event listener to close modal when close button is clicked
closeBtn.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

// Event listener to close modal when clicked outside modal content
window.addEventListener("click", (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});
