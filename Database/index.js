const express = require('express');     //carico la libreria 
const mysql = require('mysql2');        //carico la libreria mysql2, successiva a mysql e migliorata
const bodyParser = require('body-parser');  //per elaborare il body della richiesta http e restituire un oggetto con i dati presenti

const app = express();  //creo un servizio con express

app.use(bodyParser.json());     //middleware body-parser per elaborare i dati del body della richiesta HTTP in formato json
app.use(bodyParser.urlencoded({ extended: false }));    //configura il body-parser per elaborare i dati contenuti nel body della richiesta HTTP in formato HTML Form

// Definisco un oggetto con i parametri di connessione al server MYSQL (utilizzata dalla libreria mysql2 per stabilire la connessione)
const parametriConnessioneMysqlServer = {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "dbapp"
}

app.get('/', (req, res) => {
    res.end("Hello world");
});

//GET
app.get('/utenti', (req, res) => {
    const conn = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = "SELECT * FROM utenti";

    conn.query(SQLQuery,(error, data) => {
        if(!error){
            conn.end(() => {});
            res.json(data);
        }else{
            conn.end(() => {});
            res.status(500).send(error);
        }
    })
})

//GET utente con id specificato
app.get('/utenti/:id', (req, res) => {
    let id = req.params.id;

    const conn = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = "SELECT * FROM utenti WHERE id = ?";

    conn.query(SQLQuery, id, (error, data) => {
        if(!error){
            conn.end(() => {});
            res.json(data);
        }else{
            conn.end(() => {});
            res.status(500).send(error);
        }
    })
})

//POST
app.post('/utenti', (req, res) => {
    let datiUtente = [req.body.nome, req.body.cognome];

    const conn = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = "INSERT INTO utenti (nome, cognome) VALUES (?, ?)";

    conn.query(SQLQuery, datiUtente, (error, data) => {
        if(!error){
            conn.end(() => {});
            res.json(data);
        }else{
            conn.end(() => {});
            res.status(500).send(error);
        }
    })
})

//DELETE
app.delete('/utenti/:id', (req, res) => {
    let id = req.params.id;

    const conn = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = "DELETE FROM utenti WHERE id = ?";

    conn.query(SQLQuery, id, (error, data) => {
        if(!error){
            conn.end(() => {});
            res.json(data);
        }else{
            conn.end(() => {});
            res.status(500).send(error);
        }
    })
})


//PUT
app.put('/utenti/:id', (req, res) => {
    let datiUtente = [req.body.nome, req.body.cognome, req.params.id];

    const conn = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = "UPDATE utenti SET nome = ?, cognome = ? WHERE id = ?";

    conn.query(SQLQuery, datiUtente, (error, data) => {
        if(!error){
            conn.end(() => {});
            res.json(data);
        }else{
            conn.end(() => {});
            res.status(500).send(error);
        }
    })
})



// Per mettere il servizio in ascolto creo un server che prende come valore il servizio in ascolto sulla porta 3001.
// La funzione di callback viene eseguita all'avvio del server
const server = app.listen(3001, () => {
    console.log('Server in ascolto sulla porta 3001...');
})