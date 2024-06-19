const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001;

const filmesPath = path.join(__dirname, 'filmes.json');
const filmesData = fs.readFileSync(filmesPath, 'utf-8');
const filmes = JSON.parse(filmesData);

function buscarFilmesPorGenero(genero) {
    if (!genero) return filmes;
    return filmes.filter(filme => filme.genero.toLowerCase() === genero.toLowerCase());
}

app.get('/buscar-filme', (req, res) => {
    let filmesCards = '';
    const generoBuscado = req.query.genero;
    const filmesEncontrados = buscarFilmesPorGenero(generoBuscado);

    
    filmesEncontrados.forEach(filme => {
 filmesCards += `
 <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${filme.cartaz}" class="img-fluid rounded-start" alt="${filme.titulo}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text">${filme.genero}</p>
                        <p class="card-text">${filme.diretor}</p>
                        <p class="card-text"><small class="text-body-secondary">${filme.ano}</small></p>
                    </div>
                </div>
            </div>
        </div>`;
    });

    const htmlContent = fs.readFileSync('index.html', 'utf-8');
    const finalHtml  = htmlContent.replace('{{CardsHtml}}', filmesCards);

    res.send(finalHtml);
});

app.get('/', (req, res) => {
    let filmesCards = '';
    const generoBuscado = req.query.genero;
    const filmesEncontrados = buscarFilmesPorGenero(generoBuscado);

    
    filmesEncontrados.forEach(filme => {
        filmesCards += `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${filme.cartaz}" class="img-fluid rounded-start" alt="${filme.titulo}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${filme.titulo}</h5>
                    <p class="card-text">${filme.genero}</p>
                    <p class="card-text">${filme.diretor}</p>
                    <p class="card-text"><small class="text-body-secondary">${filme.ano}</small></p>
                </div>
            </div>
        </div>
    </div>`;
    });

    const htmlContent = fs.readFileSync('index.html', 'utf-8');
    const finalHtml  = htmlContent.replace('{{CardsHtml}}', filmesCards);

    res.send(finalHtml);
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
