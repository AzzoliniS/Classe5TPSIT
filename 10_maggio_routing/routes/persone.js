const express = require('express');
const router = express.Router();
const {persone} = require('../persone')

router.get('/', (req, res)=>{
    res.status(200).json(persone);
})

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    const pers = persone.find((pers) => pers.id === id)
    res.json(pers);
})

router.post('/', (req, res)=>{
    const {id, nome, cognome} = req.body;
    const nuovo = {
        id: id,
        nome: nome,
        cognome: cognome
    };
    console.log(nuovo);
    persone.push(nuovo);
    res.status(200).json({success:true, data: persone});
})

module.exports = router;