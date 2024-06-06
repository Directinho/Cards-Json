const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001;

const filmesPath = path.join(__dirname, 'filmes.json');
const filmesData = fs.readFileSync(filmesPath, 'utf-8');
const filmes = JSON.parse(filmesData);

function criarCard(filme) {
    return `
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${filme.cartaz}" class="img-fluid rounded-start" alt="${filme.titulo}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${filme.titulo}</h5>
        <p class="card-text">${filme.diretor}</p>
        <p class="card-text>${filme.genero}</p>
        <p class="card-text"><small class="text-body-secondary">${filme.ano}</small></p>
      </div>
    </div>
  </div>
</div>
`;
}

app.get('/', (req, res) => {
    const CardsHtml = filmes.map(filme => criarCard(filme)).join('');
    const pageHtmlPath = path.join(__dirname, 'index.html');
    let pageHtml = fs.readFileSync(pageHtmlPath, 'utf-8');
    pageHtml = pageHtml.replace('{{CardsHtml}}', CardsHtml);
    res.send(pageHtml);
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
