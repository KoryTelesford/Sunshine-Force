let quotem = document.getElementById("quotemsg")
let quotebu = document.getElementById("gen")

//Loading

function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
        // console.log("Ran")
      }
    }, 1000);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  
  onReady(function() {
    setVisible('.pagelu', true);
    setVisible('#loading', false);
  });

//Quote

async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
    //   quote.textContent = data.content;
    //   cite.textContent = data.author;
    quotem.textContent = data.content

    // console.log(data.content)
    // console.log(data.author)
    // console.log(data);


    } else {
      quotem.textContent = "An error occured";
      // console.log(data);
    }
  }

  quotebu.addEventListener("click", () => {
    updateQuote();

  });

  updateQuote();