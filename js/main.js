const glossaryURL = "http://localhost:3000/glossary";
const wordListContainer = document.querySelector("ul");
const definitionContainer = document.getElementById("definitionContainer");

function fetchGlossary() {
  return fetch(glossaryURL).then((res) => res.json());
}

fetchGlossary()
.then(renderGlossaryList);

function renderGlossaryList(glossary) {
  glossary.forEach((word, index) => appendWordToList(word, index));
}

function appendWordToList(word, index) {
  const wordLi = document.createElement("li");
  const wordLink = document.createElement("a");
  wordLink.addEventListener("click", handleWordDefinitionClick);
  wordLink.setAttribute("data-id", index);
  wordLink.href = "#";
  wordLink.textContent = word.title;
  wordLi.appendChild(wordLink);
  wordListContainer.appendChild(wordLi);
}

function clearWordList() {
  wordListContainer.innerHTML = "";
}

function handleWordDefinitionClick(event) {
  event.preventDefault();
  const wordId = event.currentTarget.getAttribute("data-id");
  fetchGlossary().then((glossary) => {
    const word = glossary[wordId];
    clearWordList();
    displayWordDefinition(word);
  });
}

function displayWordDefinition(word) {
  clearDefinitionContainer();
  const wordTitle = word.title;
  const wordDefinition = word.content;
  const wordURL = word.url;
  const definitionHTML = `
    <h4>${wordTitle}</h4>
    <h5>Explanation:</h5>
    <p>${wordDefinition}</p>
    <h5>View this on Healthcare.gov:</h5>
    <p><a href="https://www.healthcare.gov${wordURL}" target="_blank">https://www.healthcare.gov${wordURL}</a></p>
  `;
  definitionContainer.innerHTML = definitionHTML;
}

function clearDefinitionContainer() {
  definitionContainer.innerHTML = "";
}

const handleRelistButtonClick = document.getElementById("relistButton");
handleRelistButtonClick.addEventListener("click", () => {
  clearDefinitionContainer();
  fetchGlossary().then(renderGlossaryList);
});

const toggleModeButton = document.getElementById("toggleDarkModeBtn");
const body = document.body;
toggleModeButton.addEventListener("click", toggleMode);
function toggleMode() {
  body.classList.toggle("dark-mode");
}


