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

// Imposto il servizio in modo che sia in grado di rispondere alle richieste in arrivo dalla rete.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

//Mi permette di restituire tutti gli utenti presenti nella tabella
app.get('/utenti', (req, res) => {
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);    // Creo una connessione con il server MYSQL
    const SQLQuery = 'SELECT * FROM utenti';    // Definisco la stringa SQL da eseguire

    connessione.query(SQLQuery, (error, data) => {  //eseguo la query
        if (!error) {   // Controllo se ci sono stati errori
            connessione.end(() => {});  //chiudo la connessione con il server
            res.json(data);    // Invio i dati al client in formato json
        }
        else {
            connessione.end(() => {});  //chiudo la connessione con il server
            res.status(500).send(error);   //Invio al client il messaggio di errore con uno status HTTP 500: Internal server error
        }
    })
})

//Mi restituisce l'utente con id indicato nel parametro
app.get('/utenti/:id', (req, res) => {
    let id = req.params.id;   //Recupero l'id presente nella URL della richiesta
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);    // Creo una connessione con il server MYSQL
    const SQLQuery = 'SELECT * FROM utenti WHERE id = ?';       // Definisco la stringa SQL da eseguire, il ? verrà poi sostituito nel metodo query

    connessione.query(SQLQuery, id, (error, data) => {    //eseguo la query e sostituisco ? con id
        if (!error) {   // Controllo se ci sono stati errori
            connessione.end(() => {});  //chiudo la connessione con il server
            res.json(data);    // Invio i dati al client in formato json
        }
        else {
            connessione.end(() => {});  //chiudo la connessione con il server
            res.status(500).send(error);   //Invio al client il messaggio di errore con uno status HTTP 500: Internal server error
        }
    })
})


// POST: Aggiungo un nuovo record alla tabella utenti (nome e cognome nel body della richiesta)
app.post('/utenti', (req, res) => {
    let datiUtente = [req.body.nome, req.body.cognome]; // Creo un array con i dati da inserire nella tabella
    const {nome, cognome} = req.body;

    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = 'INSERT INTO utenti (nome, cognome) VALUES (?, ?)';    //SQL da eseguire, ? sostituito con secondo parametro del metodo query

    connessione.query(SQLQuery, datiUtente, (error, data) => {
        if (!error) {
            connessione.end(() => {});
            res.json(data);     //se non ci sono stati errori invio i dati al client in formato json
        }
        else {
            connessione.end(() => {});
            res.status(500).send(error);    //status HTTP 500: Internal server error
        }
    })
})

// DELETE: eliminare l'utente con id = :id
app.delete('/utenti/:id', (req, res) => {
    let id = req.params.id;   // Recupero l'id presente nella URL della richiesta

    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    const SQLQuery = 'DELETE FROM utenti WHERE id = ?';

    connessione.query(SQLQuery, id, (error, data) => {
        if (!error) {
            connessione.end(() => {});
            res.json(data);    // Se non ci sono stati errori invio i dati al client in formato json
        }
        else {
            connessione.end(() => {});
            res.status(500).send(error);
        }
    })
})

// PUT: modifico record identificato con l'id indicato. Nome e cognome devono essere inclusi nel body della richiesta
app.put('/utenti/:id', (req, res) => {
    let id = req.params.id;

    let datiQuery = [req.body.nome, req.body.cognome, id];  // Creo un array con i dati da inserire nella tabella.
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);

    const SQLQuery = 'UPDATE utenti SET nome = ?, cognome = ? WHERE id = ?';

    connessione.query(SQLQuery, datiQuery, (error, data) => {
        if (!error) {
            connessione.end(() => {});
            res.json(data);
        }
        else {
            connessione.end(() => {});
            res.status(500).send(error);
        }
    })
})

// Per mettere il servizio in ascolto creo un server che prende come valore il servizio in ascolto sulla porta 3000.
// La funzione di callback viene eseguita all'avvio del server
const server = app.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
})