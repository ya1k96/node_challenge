const db = require('../models');
const express = require('express');
const verifyToken = require('../middleware/authtoken');
const router = express.Router();

router.route('/')
.get(verifyToken, async (req, res) => {    
    try {        
       const result = await db.character.findAll({  
           attributes:['name', 'img'],
           include: 'movies',
           where: req.query        
        });
        res.json(result);
    } catch (error) {        
        res.status(400).json({message: 'Sorry, an error occurred'});                
    }
})
.post(verifyToken, async (req, res) => {
    const img     = req.body.img;
    const name    = req.body.name;
    const age     = req.body.age;
    const weight  = req.body.weight;
    const history = req.body.history;
    const movie   = req.body.movie;
    
    try {
        const newCharacter = await db.character.create({
            img, name, age, weight, history, movie
        });
        if(newCharacter == 0) throw new Error("Sorry, an error occurred");
        res.status(200).json({message: 'Character created'});
    } catch (error) {
        res.status(400).json({message: error.meesage});        
    }
});

router.route('/:id', verifyToken)
.put(verifyToken, async (req, res) => {
    const id = req.params.id;

    const data = {
        id,
        img: req.body.img,
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history,
        movie: req.body.movie
    };

    try {
        const character = await db.character.update(data, {where: { id }});
        if(character == 0) throw new Error("Cant find id");
        res.status(201).json(character);
    } catch (error) {               
        res.status(400).json({message: error.message});
    }    
})
.get(verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        const character = await db.character.findByPk(id, {include: 'movies'});
        res.json(character);
    } catch (error) {
        res.status(400).json({message: "An error ocurred"});
    }
    
})
.delete(verifyToken, async (req, res) => {
    const id = req.params.id;
    
    try {
        const character = await db.character.destroy({where: {id}});
        if(character == 0) throw new Error("Cant find id");
        res.json(character);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.route('/:id/movies', verifyToken)
.get(verifyToken, (req, res) => {
    const id = req.params.id;
    try {
        db.character.findByPk(id).then(character => {
            character.getMovies().then(movies => {
                res.json(movies);
            })
        });
        
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
});

module.exports = router;