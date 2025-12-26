// grid code pattern for secert use in communication
// user input 'sentence', 'hide letter'
// manipulate " " return 0

const sentence = document.getElementById("sentence-input");
const hideLetter = document.getElementById("hide-letter");
const btn = document.getElementById("process-button");
const resultP = document.getElementById("result-p");

const codeInput = document.getElementById("code-input");
const revealLetter = document.getElementById("reveal-letter");
const revealBtn = document.getElementById("reveal-button");
const revealP = document.getElementById("reveal-result-p");

function arranging(letter, hL) {
  // arranging letters according to hidden letter given by user
  for (const e of letter) {
    if (hL.value === e) {
      letter = letter.replace(hL.value, "");
      letter = letter.concat(hL.value);
      break;
    }
  }
  return letter;
}

function createLetterGrid(grid,letters) {
  // putting each arranged letters in array grid
  for (let i = 0; i < grid.length; i++) {
    const element = grid[i];
    let processedletters;
    for (let j = 0; j <= 4; j++) {
      grid[i][j] = letters[j];
      processedletters = letters.split(letters[j]);
    }
    letters = processedletters.at(-1);
  }
  return grid;
}

btn.addEventListener("click", () => {
  // defining variable;
  let grid = [[], [], [], [], []];
  let codes = [];
  let letters = "abcdefghijklmnopqrstuvwxyz";

  letters = arranging(letters, hideLetter);

  grid = createLetterGrid(grid, letters);

  // getting sentence code given by user.
  for (const e of sentence.value) {
    if (e == " ") {
      codes.push("-2");
    } else if (e === hideLetter.value) {
      codes.push("-1");
    } else {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j <= 4; j++) {
          let element = grid[i][j];
          if (element === e) {
            //  leading zero is
            codes.push(`${i}${j}`);
          }
        }
      }
    }
  }

  // display codes as string
  resultP.innerText = codes.join(",");
});

revealBtn.addEventListener("click", () => {
  // defining variable;
  let grid = [[], [], [], [], []];
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let revealedLetters = [];

  letters = arranging(letters, revealLetter);

  grid = createLetterGrid(grid, letters);

  // getting sentence code given by user.
  const codeArray = codeInput.value.split(",");

  for (const raw of codeArray) {
    const e = raw.trim();
    if (e === "") continue;
    if (e === "-2") {
      revealedLetters.push(" ");
    } else if (e === "-1") {
      revealedLetters.push(revealLetter.value);
    } else {
      // parse numeric token robustly (handles "4" or "04" or "23")
      const num = parseInt(e, 10);
      if (Number.isNaN(num)) {
        revealedLetters.push("?"); // invalid token
        continue;
      }
      let row, col;
      if (num < 10) {
        row = 0;
        col = num;
      } else {
        row = Math.floor(num / 10);
        col = num % 10;
      }
      if (row >= 0 && row < grid.length && col >= 0 && col <= 4) {
        revealedLetters.push(grid[row][col]);
      } else {
        revealedLetters.push("?");
      }
    }
  }

  // display revealed letters
  revealP.innerText = revealedLetters.join("");
});

const copyBtnResult = document.getElementById("copy-btn-result")
const copyBtnReveal = document.getElementById("copy-btn-reveal")

// const resultP = document.getElementById("result-p"); // copied on copyBtnResult click 
// const revealP = document.getElementById("reveal-result-p");// copied on copyBtnReveal click


function copyfunction(paragra) {
  navigator.clipboard.writeText(paragra.innerText).then(() => {
    alert("Copied to clipboard");
  }).catch(err => {
    alert("Failed to copy: ", err);
  });
}

copyBtnResult.addEventListener("click", () => {
  copyfunction(resultP);
});

copyBtnReveal.addEventListener("click", () => {
  copyfunction(revealP);
});