const express = require('express');
const app = express();
const {persone} = require('./persone');

app.use(express.json())

//---------------------------------------------------------

app.get('/api/persone', (req, res) =>{
    res.status(200).json(persone);
})

app.get('/api/persone/:id', (req, res) =>{
    const {id} = req.params
    const pers = persone.find((pers) => pers.id === id)
    res.json(pers);
})

app.post('/api/persone', (req, res)=>{
    console.log(req.body);

    const pers = req.body;
    persone.push(pers);
    res.status(200).json({success:true, data: persone})
})

app.put('/api/persone/:id', (req, res)=>{
    const {id} = req.params;
    const pers = req.body;

    persone[Number(id)-1] = pers;

    res.status(200).json({success:true, data: persone})
})

app.delete('/api/persone/:id', (req, res)=>{
    const {id} = req.params;

    //cerco l'index della persona con l'id indicato
    const index = persone.findIndex(pers => pers.id === id);
    //elimino un elemento a partire dalla posizione index
    persone.splice(index, 1);    

    res.status(200).json({success:true, data: persone})
})


//---------------------------------------------------------
app.listen(3000)














/*
const express = require('express');
const app = express()
const personeRouter = require('./routes/persone')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/persone', personeRouter);


app.get('/', (req, res)=>{
    res.sendFile("form.html", {root: __dirname + "/public"});
})


app.listen(3000)
*/

