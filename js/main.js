const glossaryURL = "http://localhost:3000/glossary";
const wordListContainer = document.querySelector("ul");
const definitionContainer = document.getElementById("definitionContainer");

document.addEventListener("DOMContentLoaded", () => {
  fetchGlossary().then(renderGlossaryList);
});

function fetchGlossary() {
  return fetch(glossaryURL).then((res) => res.json());
}

function renderGlossaryList(glossary) {
  clearWordList();
  glossary.forEach((word, index) => appendWordToList(word, index));
}

function clearWordList() {
  wordListContainer.innerHTML = "";
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

function handleWordDefinitionClick(event) {
  event.preventDefault();
  const wordId = event.currentTarget.getAttribute("data-id");
  fetchGlossary()
    .then((glossary) => {
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
    <h5>URL:</h5>
    <p>https://www.healthcare.gov${wordURL}</p>
  `;

  definitionContainer.innerHTML = definitionHTML;
}

function clearDefinitionContainer() {
  definitionContainer.innerHTML = "";
}

const relistButton = document.getElementById("relistButton");
relistButton.addEventListener("click", () => {
  clearDefinitionContainer();
  fetchGlossary().then(renderGlossaryList);
});
