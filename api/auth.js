const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");
const md5 = require('md5');
const sendEmail = require('../bulkSend');
require('dotenv').config();

router.route('/login')
.post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    try {
        const user = await db.Users.findOne({where: {email}});
        if(!user) {
            res.status(204).send("User not found");
        }
        if(md5(password) === user.password) {
            const data = {email, name: user.name}
            const token = jwt.sign(data, process.env.KEY, { expiresIn: '6h' });

            res.status(200).json({token});
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).send(error.message);                
    }

});

router.route('/register')
.post(async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    try {
        const newuser = await db.Users.create({
            email, password: md5(password), name
        });
        if(newuser == 0) throw new Error("Sorry, something went wrong. Try later");
        const senderEmail = 'yamilm61@gmail.com';
        const senderName = 'Yamil Martinez';
        await sendEmail(senderEmail, senderName, email, name, 'Confirmacion de cuenta');
        res.status(200).send('Usuario creado');        
    } catch (error) {               
        res.status(400).send(error.message);        
    }
});

module.exports = router;