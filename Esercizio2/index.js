const express = require('express');
const app = express();
const { persone } = require('./persone');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//---------------------------------------------------------

app.get('/', (req, res) => {
    res.sendFile("form.html", { root: __dirname + "/public" });
})

app.post('/api/persone', (req, res) => {

    if (req.body) {
        const { id, nome, cognome } = req.body;

        const nuovo = {
            id: id,
            nome: nome,
            cognome: cognome
        };

        console.log(nuovo);
        persone.push(nuovo);
        res.status(200).json({ success: true, data: persone });
    } else{
        res.status(400).send("Errore");
    }
})

//---------------------------------------------------------
app.listen(3000)