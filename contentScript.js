// contentScript.js
let didRun = false;
let nextSongCheck = "test";
let firstDiv;
let translate = false;
let currentSong;
let printLyrics = false;

const customStyle = `
  .custom-bg {
    color: green;
    background-color: yellow;
    grid-area: 1/1/-1/-1;
    -webkit-transition: all .25s ease-out;
    transition: all .25s ease-out
  }
`;

// Function to log the count of occurrences in div elements with the 'data-testid' attribute
function logOccurrencesInDTDivs() {
  // Select all div elements with the 'data-testid' attribute
  const dtDivs = document.querySelectorAll('div[data-testid]');
  const songName = document.querySelectorAll('div[data-testid="context-item-info-title"]');
  
  songName.forEach((div, index) => {
    if (div.textContent !== currentSong){
      printLyrics = true;
      currentSong = div.textContent;
    }
  });

  let fourBlankDivs = false;
  let blankDivCounter = 0;
  let prevDiv;

  // Log the text content of each div for inspection
  dtDivs.forEach((div, index) => {
    if (div.textContent.length <= 100) {
        if (div.textContent == '' && prevDiv == ''){
            blankDivCounter++;
        }
        if (blankDivCounter == 5){
            fourBlankDivs = true;
        }
        // Create a style element
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

styleElement.textContent = `
  @keyframes colorChange {
    0% {
      color: paleturquoise;
    }
    25% {
      color: plum;
    }
    50% {
      color: lightcoral;
    }
    75% {
      color: plum;
    }
    100% {
      color: paleturquoise;
    }
  }
`;

        if (fourBlankDivs == true && div.textContent.length > 0 && printLyrics == true) {// && !nextSongCheck.includes(div.textContent)) {

            console.log(`Text content of div ${index + 1}: "${div.textContent}"`);
            div.style.animationName = 'colorChange';
            div.style.animationDuration = '3s';
            div.style.animationIterationCount = 'infinite';
            div.style.animationDirection = 'alternate';
            div.style.textShadow = '2px 2px 2px black';

            blankDivCounter = 0;
            didRun = true;
            nextSongCheck += div.textContent;
        }
            prevDiv = div.textContent;
            if (index + 2 == dtDivs.length){
              printLyrics = false;
            }
    }
  });
}

// Run the initial check
logOccurrencesInDTDivs();

// Set up an interval to run the check every five seconds
const intervalId = setInterval(logOccurrencesInDTDivs, 5000);

// Optional: Stop the interval after a certain number of iterations (e.g., 10 times)
// setTimeout(() => clearInterval(intervalId), 10 * 5000);