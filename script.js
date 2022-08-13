
$(document).ready(function() {

    $('#new-quote').on('click', function(event){
        generateNewQuote(); //generate new quote
        
        count+=1; //add 1 to change color for next time the button is pressed

        // this condition will reset the color option to start at index 0.
        if(count == colorOptions.length){
            count = 0;
        }
      });
});

const generateNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response = await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    let index = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote = allQuotes[index].text;

    //Store the author of the respective quote
    const auth = allQuotes[index].author;

    //display the quote 
    $('#text').text(quote);

    //this condition checks if the author is known or unknown
    if(auth == null)
    {
        $('#author').text("- Unknown");
    }
    else {
        $('#author').text("- " + auth);
    }

    //change the background and text color
    $('body, #new-quote, #tweet-quote').css('background-color', colorOptions[count]);
    $('body').css('color', colorOptions[count]);

    //tweet the quote
    $('#tweet-quote').attr('href', "https://twitter.com/intent/tweet?text=" + quote + " ~ " + (auth!=null? auth:'Unknown'))
}

var count = 0; //Keeps count to cycle throught the color options

let colorOptions = [
    '#7389AE',
    '#9067C6',
    '#B6465F',
    '#7EA172',
    '#E7A977'
]; // array of color options available

/* 
Contributions:

My generator origninally had 5 quotes and would cycle through the 5 quotes. I wanted to add unlimited quotes
and I found an artice on how to make this happen fetching these quotes from API.

Neha Soni 
https://dev.to/nehasoni__/random-quote-generator-using-html-css-and-javascript-3gbp

*/