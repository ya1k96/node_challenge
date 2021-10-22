const db = require('../models');
const express = require('express');
const character = require('../models/character');
const verifyToken = require('../middleware/authtoken');
const router = express.Router();

router.route('/', verifyToken)
.get(async (req, res) => {
    try {
        const users = await db.character.findAll({            
        });
        res.status(200).json(users);
    } catch (error) {

        console.log(error)
        res.status(400).json({message: 'Sorry, an error occurred'});                
    }
})
.post((req, res) => {
    const img     = req.body.img;
    const name    = req.body.name;

    try {
        db.gender.create({
            img, name
        });
        res.status(200).json({message: 'Gender created'});
    } catch (error) {
        res.status(400).json({message: 'Sorry, an error occurred'});        
    }
});


module.exports = router;