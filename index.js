//importo il modulo express
const express = require('express');
const app = express()
const {persone} = require("./persone")


//tutti le persone
app.get('/api/persone', (req, res) =>{
    res.status(200).json(persone);
})

//una persona specifica
app.get('/api/persone/:id', (req, res) =>{
    const {id} = req.params

    const pers = persone.find((pers) => pers.id === id)
    res.json(pers);
})


app.get('/', (req, res) => {
    //res.send("HOMEPAGE");
    //res.sendFile('homepage.html', {root: __dirname + "/public"})    //invio il file homepage.html
    res.json(persone);
})


//porta sulla quale è in ascolto il server
app.listen(3000)