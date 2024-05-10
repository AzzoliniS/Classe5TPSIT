create table utenti(
    id int auto_increment primary key,
    nome varchar(20),
    cognome varchar(20)
);

insert into utenti(nome, cognome) values ('Mattia', 'Miorandi');
insert into utenti(nome, cognome) values ('Sara', 'Scattone');
insert into utenti(nome, cognome) values ('Stefano', 'Marinelli');