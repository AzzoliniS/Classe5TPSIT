const express = require('express');         //libreria express
const mysql = require('mysql2');            //libreria mysql2

const app = express();      //servizio che utilizza express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//parametri di connessione al server mysql
const parametriConnessione = {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "dbapp"
}