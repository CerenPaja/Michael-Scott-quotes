const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://sheltered-beach-31597.herokuapp.com/';
    const apiUrl = 'https://michael-scott-quotes-api.herokuapp.com/randomQuote';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank, add unknown
        authorText.innerText = 'Michael Scott';
        if(data.quote.length < 220) {

        // Reduce font size for long quotes
        if (data.quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quote;
        // Stop Loader, show quote
        complete();
        }
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
