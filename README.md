# Grid-pattern-code

A small client-side tool that converts plain sentences into a compact “secret code” using a 5×5 letter grid and a single hidden letter. Without the correct hidden letter, decoding will not recover the original message.

---

## 🔍 Overview
- **Purpose:** Encode and decode messages using a 5×5 grid made from the English alphabet minus a chosen hidden letter.
- **Files:** `index.html` (UI), `index.js` (encoding/decoding logic), `style.css` (visuals).

---

## 🚀 Quick start
1. Open `index.html` in your browser.
2. In the **Encode** panel:
   - Enter the sentence in **Enter your sentence**.
   - Type a single character in **Hide letter** (the letter to hide).
   - Click **Generate Code** — encoded output appears in `result`.
   - Use **Copy** to copy the result.
3. In the **Decode** panel:
   - Paste the comma-separated code in **Enter your code**.
   - Type the same hidden character in **Reveal letter**.
   - Click **Reveal Sentence** to decode.

---

## 🧭 How the grid pattern works
1. Start with the alphabet: `abcdefghijklmnopqrstuvwxyz`.
2. Move the **hide letter** to the end of the string; the first 25 characters then form the 5×5 grid (rows 0..4, columns 0..4).
3. Encoding rules:
   - A visible letter maps to a coordinate token `ij` (row `i`, column `j`, both 0-based).
   - Space (` `) → `-2`.
   - Hidden letter → `-1`.
   - Output format: comma-separated tokens (e.g., `12,04,-1,-2`).
4. Decoding reverses that mapping using the reveal letter and reconstructed grid.

Example (conceptual):
- Hide letter `l` → `l` moved to end; grid uses letters `a..k,m..z`.
- `h` → `12`, `e` → `04`, `l` → `-1`, space → `-2`.

### 5×5 Grid visual example (hide letter: `l`)
Below is the 5×5 grid that will be built when hiding the letter `l`. Rows and columns are 0-based; tokens use `rowcol` form.

| Row\\Col | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| **0** | a | b | c | d | e |
| **1** | f | g | h | i | j |
| **2** | k | m | n | o | p |
| **3** | q | r | s | t | u |
| **4** | v | w | x | y | z |

Code examples:
- `h` → row 1, col 2 → `12`
- `e` → row 0, col 4 → `04`
- hidden letter `l` → `-1`
- space → `-2`

ASCII view (rowcol:letter):

```
00:a 01:b 02:c 03:d 04:e
10:f 11:g 12:h 13:i 14:j
20:k 21:m 22:n 23:o 24:p
30:q 31:r 32:s 33:t 34:u
40:v 41:w 42:x 43:y 44:z
```

Note: The decoder accepts tokens like `4` or `04`, but using fixed two-digit tokens (`00`..`44`) is recommended for clarity.

---

## 🔧 Code flow (function mapping)
- `arranging(letter, hL)` — moves the hide letter (value from `hL.value`) to the end of the alphabet string and returns the rearranged string.
- `createLetterGrid(grid, letters)` — fills a 5×5 array using the first 25 characters of `letters`.
- Encode listener (`process-button`):
  - Builds grid from `hide-letter`.
  - Iterates over `sentence.value` and pushes tokens for each character.
  - Shows CSV token string in `#result-p`.
- Decode listener (`reveal-button`):
  - Rebuilds grid from `reveal-letter`.
  - Splits input `code` by comma and maps tokens back to characters (handles `-2`, `-1`, and numeric tokens; numeric tokens support `4`, `04`, `23`).
- `copyfunction(paragra)` — copies paragraph content to clipboard and alerts on result.

---

## ⚠️ Known issues & edge cases
- **Missing validation:** No explicit check that hide/reveal letters are a single alphabetic character (empty or invalid input may produce unexpected results).
- **Non-letter characters:** Punctuation, digits, and special symbols are ignored or skipped — they are not encoded.
- **Copy error alert:** On failure the code uses `alert("Failed to copy: ", err);` which passes two args to `alert`. Use concatenation or a proper error message.
- **Whitespace types:** Only the single space `" "` is encoded as `-2`; tabs/newlines are unhandled.
- **Token format consistency:** Tokens are variable-length (`4` vs `04`). While decoder handles both, standardizing to two-digit tokens (`00`..`44`) may be cleaner.

---

## ✅ Suggested improvements (prioritized)
1. **Input normalization & validation**
   - Force `sentence`, `hide-letter`, and `reveal-letter` to `.toLowerCase()` and validate single-letter input.
2. **Better token format**
   - Use fixed two-digit tokens (`00`..`44`) for readability and consistent parsing.
3. **Support more characters**
   - Add explicit handling for digits and punctuation or allow passthrough tokens.
4. **Improve UX**
   - Inline error messages/toasts instead of `alert()` for copy and validation errors.
5. **Tests & examples**
   - Extract core logic into testable functions and add unit tests (Jest or similar).
6. **Flexibility**
   - Allow configurable alphabets and grid sizes for non-English alphabets or custom encodings.

---

## 🧪 Example
- Input: sentence `hello there`, hide letter `l` (lowercased).
- After arranging the alphabet and building the grid, tokens may look like:
  `12,04,-1,-1,14,-2,20,04,17,04,10` → Decoding with reveal letter `l` returns `hello there`.

---

## 🛠 Development & run instructions
- Open `index.html` in a browser to try the UI.
- For debugging, open DevTools Console to see errors or logs.
- To extend or test logic: move encode/decode functions into a module and add unit tests using Jest.

---

## 🤝 Contributing
1. Fork the repo and create a feature branch.
2. Add tests and update `README.md` if behavior changes.
3. Open a pull request describing the change.

---

If you'd like, I can now implement the top-priority fixes (input normalization, validation, and a couple of tests). Would you like me to do that? ✨
