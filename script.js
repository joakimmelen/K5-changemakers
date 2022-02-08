const API_KEY = "253b5260-56ee-4d1f-a552-638f8851c14d";

const BASE_URL = `https://api.thecatapi.com/v1/images/search`;

const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

const pageIndicator = document.querySelector(".page-indicator");
const results = document.querySelector(".results");

const LIMIT = 12;
const ORDER = "asc";

let page = 0;

function toggleButtons(disabled) {
  previous.disabled = disabled;
  next.disabled = disabled;
}

async function fetchCats() {
  const url = new URL(BASE_URL);

  url.searchParams.append("limit", LIMIT);
  url.searchParams.append("page", page);
  url.searchParams.append("order", ORDER);

  pageIndicator.textContent = `Page ${page}`;
  results.textContent = "Loading...";

  toggleButtons(true);

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.json();
    renderCats(data);
  } catch (err) {
    results.textContent =
      "Everything went wrong!! What are you doing?!";
  } finally {
    toggleButtons(false);
    previous.disabled = page === 0;
  }
}

function renderCats(data) {
  results.textContent = null;

  data.forEach(({ url }) => {
    const img = document.createElement("img");
    img.src = url;
    results.append(img);
  });
}

previous.addEventListener("click", () => {
  page--;
  fetchCats();
});

next.addEventListener("click", () => {
  page++;
  fetchCats();
});

fetchCats();
