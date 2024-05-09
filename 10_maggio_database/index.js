// Carico la libreria express (consenti di realizzare con semplicità un web server)
// Il progetto node utilizza la tradizionale organizzazione in moduli del codice javascript
const express = require('express');

// Carico la libreria mysql2 (a differenza della libreria mysql mi consente di utilizzare i sistemi di autenticazione
// delle versioni di mysql successive alla 5)
const mysql = require('mysql2');

// Carico la libreria body-parser: mette a disposizione un middleware in grado di elaborare il body della richiesta http
// e di restituire un oggetto con i dati presenti
const bodyParser = require('body-parser');

// Creo un nuovo servizio utilizzando express
const service = express();

// Aggiungo alla catena di elaborazioneil middlware body-parser
// .json() configura body-parser per elaborare i dati contenuti nel body della richiesta HTTP in formato json
service.use(bodyParser.json());
// .urlencoded({extended: false}) configura body-parser per elaborare i dati contenuti nel body della richiesta HTTP in formato HTML Form
service.use(bodyParser.urlencoded({ extended: false }));

// Imposto il servizio in modo che sia in grado di rispondere alle richieste in arrivo dalla rete.
// get: verbo HTTP per il quale si mette in ascolto il server
// '/help': URL da utilizzare per accedere a questa risorsa (vedi RESTFUL)
// (richiesta, risposta) => {
//     ...    
// }: espressione lambda che specifica la funzione da eseguire quando il server riceve la richiesta
// richiesta: oggetto che contiene la richiesta inviata dal client
// risposta: oggetto da utilizzare per preparare ed inviare la risposta al client
service.get('/', (richiesta, risposta) => {
    // sendfile: consente di inviare in risposta al client il file specificato fra parentesi
    // __dirname: variabile che ha come valore il path della directory che contiene i file dell'applicazione
    risposta.sendFile(__dirname + '/help.html');
});

// Definisco un oggetto con i parametri di connessione al server MYSQL
// La costante viene utilizzata dalla libreria mysql2 per stabilire una connessione con il server mysql
// Host = 127.0.0.1: con il parametro port: 3306:3306, il server viene esposto sulla rete del server docker (codespace)
const parametriConnessioneMysqlServer = {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "dbapp"
}

// Imposto il servizio in modo che sia in grado di rispondere alle richieste in arrivo dalla rete.
// get: verbo HTTP per il quale si mette in ascolto il server
// '/utenti': URL da utilizzare per accedere a questa risorsa (vedi RESTFUL)
// Il metodo restituisce tutti gli utenti presenti nella tabella
service.get('/utenti', (richiesta, risposta) => {
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    const SQLQuery = 'SELECT * FROM utenti';
    // Effettuo la query. L'esecuzione avviene in modo asincrono, quindi devo definire la funzione dei callback da eseguire
    // al recepimento dei dati o di un messaggio di errore
    connessione.query(SQLQuery, (data, error) => {
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

// Il metodo restituisce l'utente con id = :id (parametro che dovrà essere sostituito conl'id dell'utente che si vuole ottenere)
service.get('/utenti/:id', (richiesta, risposta) => {
    // Recupero l'id presente nella URL della richiesta
    let id = richiesta.params.id;
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    // Il punto di domanda verrà sostituito con il valore del secondo parametro del metodo query
    const SQLQuery = 'SELECT * FROM utenti WHERE id = ?';
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

// Il metodo restituisce l'utente con id = :id (parametro che dovrà essere sostituito conl'id dell'utente che si vuole ottenere)
service.get('/utenti/:id', (richiesta, risposta) => {
    // Recupero l'id presente nella URL della richiesta
    let id = richiesta.params.id;
    // Creo una connessione con il server MYSQL usando i parametri di connessione precedentemente definiti
    const connessione = mysql.createConnection(parametriConnessioneMysqlServer);
    // Definisco la stringa SQL da eseguire
    // ATTENZIONE: nomi delle tabelle e dei campi sono case-sensitive
    // Il punto di domanda verrà sostituito con il valore del secondo parametro del metodo query
    const SQLQuery = 'SELECT * FROM utenti WHERE id = ?';
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