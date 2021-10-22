const db = require('../models');
const express = require('express');
const verifyToken = require('../middleware/authtoken');
const router = express.Router();

router.route('/', verifyToken)
.get(async (req, res) => {
    try {
        const users = await db.movie.findAll({   
            attributes: ['title','img','createdAt'],
            include: 'characters'         
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: 'Sorry, an error occurred'});                
    }
})
.post(async (req, res) => {
    const img    = req.body.img;
    const title  = req.body.title;
    const rating = req.body.rating;

    try {
        const newMovie = await db.movie.create({
            img, rating, title
        });
        if(newMovie == 0) throw new Error("Sorry, an error occurred");
        res.status(200).json({message: 'Movie created'});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
});
router.route('/:id', verifyToken)
.put(async (req, res) => {
    const id = req.params.id;
    
    const data = {
        title: req.body.title,
        rating: req.body.rating,
        img: req.body.img,
    };
    
    try {
        const movie = await db.movie.update(data, {where: { id }});
        if(movie == 0) throw new Error("Cant find id");
        res.json(movie);
    } catch (error) {
        res.status(400).json({message: error.message});        
    }    
}).get(async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await db.movie.findByPk(id, {include: 'characters'});
        res.json(movie);
    } catch (error) {
        res.status(400).json({message: "An error ocurred"});
    }
    
})
.delete(async (req, res) => {
    const id = req.params.id;
    
    try {
        const movie = await db.movie.destroy({where: {id}});
        if(movie == 0) throw new Error("Cant find id");
        res.json(movie);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
router.route('/:id/genders', verifyToken)
.get( async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await db.movie.findByPk(id);
        if(!movie) throw new Error("Cant get id");
        
        movie.getGenders().then(genders => {
            res.json(genders);
        })
        
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
});

module.exports = router;