const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let data = [];

// show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const newQuote = () => {
  loading();
  let randomQuote = data[Math.floor(Math.random() * data.length)];
  // remove type.fit text from auther
  randomQuote.author = randomQuote.author.replace(", type.fit", "");

  authorText.textContent = randomQuote.author;
  quoteText.textContent = randomQuote.text;
  complete();
};

// Get data from api

async function getQuote() {
  loading();
  let URL = "https://type.fit/api/quotes";
  try {
    const res = await fetch(URL);
    data = await res.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
  complete();
}

// Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//event listner
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
