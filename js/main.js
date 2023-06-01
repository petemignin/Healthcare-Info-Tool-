window.addEventListener("DOMContentLoaded", () => {
  listGlossaryTitles();
  document
    .getElementById("glossaryButton")
    .addEventListener("click", listGlossaryTitles);
});

function listGlossaryTitles() {
  const ul = document.querySelector("ul");
  fetch("http://localhost:3000/glossary")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((term, index) => {
        const termTitle = term.title;
        const termIndex = index; // Use index as the makeshift ID
        ul.innerHTML += `<li><a href="#" data-index="${termIndex}">${termTitle}</a></li>`;
      });
      clickLink();
    });
}

const clickLink = () => {
  const titles = document.querySelectorAll("a");
  titles.forEach((title) => {
    title.addEventListener("click", displayContent);
  });
};

const displayContent = (event) => {
  console.log(event.target.dataset.index);
  const definition = document.getElementById("definition");
  const ul = document.querySelector("ul");
  const termIndex = event.target.dataset.index;
  ul.innerHTML = "";
  fetch("http://localhost:3000/glossary")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const term = data[termIndex];
      if (term) {
        const termTitle = term.title;
        const termContent = term.content;
        console.log(termTitle, termContent);
        definition.innerHTML = `
          <h4>${termTitle}</h4>
          <h5>Explanation:</h5>
          <p>${termContent}</p>
          <h5>URL:</h5>
          <p>https://www.healthcare.gov${term.url}</p>
        `;
      }
    });
};
