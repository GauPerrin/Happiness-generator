const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader =document.getElementById('loader');


let apiQuotes =[];

// Show loading
function loading() {
    loader.hidden= false;
    quoteContainer.hidden=true;

}

// hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true
}

// Show new quote
function newQuote(){
    loading();
    // Pick a random quote from the API
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if author field is blank
    if(!quote.author){
        authorText.textContent="Unknown"
    } else{
        authorText.textContent=quote.author;
    }
    
    // Check the quote lenth to determine its styling 
    if(quote.text.length > 70){
        quoteText.classList.add('long-quotes');
    }else{
        quoteText.classList.remove('long-quotes');
    }
    // Set quote and hide loeader
    quoteText.textContent=quote.text;
    complete();
}

// Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        // It enables us to fetch the data before entering a value within response
        const response= await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();

    } catch(error){
        // Catch error here
    }
}

// Get ressource for twitter button https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // notice that these are backquotes, the? tells that we are going to have a query parameters
    window.open(twitterUrl, '_blank');
    // The blank parameter allow us to open it in a new tab
}

// Event listeners: generally go at the bottom 
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();
// loading();