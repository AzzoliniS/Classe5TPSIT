const express = require('express');     //carico la libreria 
const mysql = require('mysql2');        //carico la libreria mysql2, successiva a mysql e migliorata
const bodyParser = require('body-parser');  //per elaborare il body della richiesta http e restituire un oggetto con i dati presenti

const app = express();  //creo un servizio con express

app.use(bodyParser.json());     //middleware body-parser per elaborare i dati del body della richiesta HTTP in formato json
app.use(bodyParser.urlencoded({ extended: false }));    //configura il body-parser per elaborare i dati contenuti nel body della richiesta HTTP in formato HTML Form

// Definisco un oggetto con i parametri di connessione al server MYSQL (utilizzata dalla libreria mysql2 per stabilire la connessione)
const parametriConnessioneMysqlServer = {
    host: "127.0.0.1",  //port 3306:3306, server esposto sulla rete del server docker
    user: "root",
    password: "root",
    database: "dbapp"
}

app.get('/', (req, res) => {
    res.end("Hello world");
});



// Per mettere il servizio in ascolto creo un server che prende come valore il servizio in ascolto sulla porta 3000.
// La funzione di callback viene eseguita all'avvio del server
const server = app.listen(3001, () => {
    console.log('Server in ascolto sulla porta 3001...');
})