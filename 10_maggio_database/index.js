const express = require('express');     //carico la libreria 
const mysql = require('mysql2');        //carico la libreria mysql2, successiva a mysql e migliorata
const bodyParser = require('body-parser');  //per elaborare il body della richiesta http e restituire un oggetto con i dati presenti

const service = express();  //creo un servizio con express

service.use(bodyParser.json());     //middleware body-parser per elaborare i dati del body della richiesta HTTP in formato json
service.use(bodyParser.urlencoded({ extended: false }));    //configura il body-parser per elaborare i dati contenuti nel body della richiesta HTTP in formato HTML Form

// Definisco un oggetto con i parametri di connessione al server MYSQL (utilizzata dalla libreria mysql2 per stabilire la connessione)
const parametriConnessioneMysqlServer = {
    host: "127.0.0.1",  //port 3306:3306, server esposto sulla rete del server docker
    user: "root",
    password: "root",
    database: "dbapp"
}

// Imposto il servizio in modo che sia in grado di rispondere alle richieste in arrivo dalla rete.
service.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

//Mi permette di restituire tutti gli utenti presenti nella tabella
service.get('/utenti', (req, res) => {
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
service.get('/utenti/:id', (req, res) => {
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


// Il metodo consente di aggiungere un nuovo record alla tabella utenti
// Nome e cognome devono essere inclusi nel body della richiesta HTTP
// Il verbo HTTP usato è POST: secondo lo standard RESTFUL CRUD
service.post('/utenti', (richiesta, risposta) => {
    // Creo un array con i dati da inserire nella tabella. la proprietà body viene messa a disposizione dalla libreria body-parser
    let datiUtente = [richiesta.body.nome, richiesta.body.cognome];
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    // Il punto di domanda verrà sostituito con il valore del secondo parametro del metodo query
    const SQLQuery = 'INSERT INTO utenti (nome, cognome) VALUES (?, ?)';
    // Effettuo la query. L'esecuzione avviene in modo asincrono, quindi devo definire la funzione dei callback da eseguire
    // al recepimento dei dati o di un messaggio di errore
    connessione.query(SQLQuery, datiUtente, (data, error) => {
        // Controllo se ci sono stati errori
        if (!error) {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio i dati al client in formato json
            risposta.json(data);
        }
        else {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio al client il messaggio di errore con uno status HTTP 500: Internal server error
            risposta.status(500).send(error);
        }
    })
})

// Il metodo consente di eliminare l'utente con id = :id (parametro che dovrà essere sostituito conl'id dell'utente che si vuole ottenere)
service.delete('/utenti/:id', (richiesta, risposta) => {
    // Recupero l'id presente nella URL della richiesta
    let id = richiesta.params.id;
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    // Il punto di domanda verrà sostituito con il valore del secondo parametro del metodo query
    const SQLQuery = 'DELETE FROM utenti WHERE id = ?';
    // Effettuo la query. L'esecuzione avviene in modo asincrono, quindi devo definire la funzione dei callback da eseguire
    // al recepimento dei dati o di un messaggio di errore
    connessione.query(SQLQuery, id, (data, error) => {
        // Controllo se ci sono stati errori
        if (!error) {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio i dati al client in formato json
            risposta.json(data);
        }
        else {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio al client il messaggio di errore con uno status HTTP 500: Internal server error
            risposta.status(500).send(error);
        }
    })
})

// Il metodo consente di modificare un record della tabella utenti
// Nome e cognome devono essere inclusi nel body della richiesta HTTP
// Il verbo HTTP usato è PUT: secondo lo standard RESTFUL CRUD
// l'utente da modificare viene identificato con l'id  (parametro che dovrà essere sostituito conl'id dell'utente che si vuole modificare)
service.put('/utenti/:id', (richiesta, risposta) => {
    // Recupero l'id presente nella URL della richiesta
    let id = richiesta.params.id;
    // Creo un array con i dati da inserire nella tabella. la proprietà body viene messa a disposizione dalla libreria body-parser
    // E l'id dell'utente da modificare
    let datiQuery = [richiesta.body.nome, richiesta.body.cognome, id];
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    // Il punto di domanda verrà sostituito con il valore del secondo parametro del metodo query
    const SQLQuery = 'UPDATE utenti SET nome = ?, cognome = ? WHERE id = ?';
    // Effettuo la query. L'esecuzione avviene in modo asincrono, quindi devo definire la funzione dei callback da eseguire
    // al recepimento dei dati o di un messaggio di errore
    connessione.query(SQLQuery, datiQuery, (data, error) => {
        // Controllo se ci sono stati errori
        if (!error) {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio i dati al client in formato json
            risposta.json(data);
        }
        else {
            // Se non ci sono stati errori, chiudo la connessione con il server mysql (anche questo metodo è asincrono,
            // quindi imposto una funzione di callback vuota)
            connessione.end(() => {});
            // Invio al client il messaggio di errore con uno status HTTP 500: Internal server error
            risposta.status(500).send(error);
        }
    })
})

// Per mettere il servizio in ascolto creo un server che prende come valore il servizio in ascolto sulla porta 3000.
// La funzione di callback viene eseguita all'avvio del server
const server = service.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
})