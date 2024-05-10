const express = require('express');
const app = express();
const {persone} = require('./persone');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//pagina HOME
app.get('/', (req, res) => {
    res.sendFile("form.html", {root: __dirname+"/public"});
});

// Aggiunge una persona
app.post('/add', (req, res) => {
    const { id, nome, cognome } = req.body;
    persone.push({ id, nome, cognome });
    res.send('Dati inseriti correttamente!');
});

// Visualizza le persone
app.get('/api/persone', (req, res) => {
    res.json(persone);
});

app.listen(3000) //default port