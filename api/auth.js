const express = require("express");
const { body, validationResult, check  } = require('express-validator');
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
    
    try {
        const user = await db.Users.findOne({where: {email}});
        console.log(user);
        if(user === null) return res.status(400).json({message: "User not found"});        

        if(md5(password) === user.password) {
            const data = {email, name: user.name}
            const token = jwt.sign(data, process.env.KEY, { expiresIn: '6h' });

            return res.status(200).json({token});
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        return res.status(400).json({message: error.message});                
    }

});

router.route('/register')
.post(
    check('email').notEmpty() //Email requerido
    .bail() //Evitamos desencadenar las demas validaciones
    .trim() //Eliminamos espacios
    .withMessage('Field required'),    
    check('email').isEmail() //Email valido requerido
    .bail()
    .withMessage('Valid email required'),
    check('email').custom(async value => {
        const user = await db.Users.findOne({where: {email: value}})                
        if(user !== null && value) {
            return Promise.reject('');
        }
               
      }) //Verifacmos si el correo se encuentra en uso
      .withMessage('E-mail already in use'),
    body('password').notEmpty() //Constraseña requerida
    .withMessage('Field required')
    .bail(),    
    body('password') 
    .isLength({ min: 5 }) // La contraseña debe tener un minimo de 5 caracteres
    .withMessage('Must be at least 5 chars long'),    
    body('name').notEmpty() //Nombre requerido
    .withMessage('Field required'),    

    async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    //Obtenemos los errores del formulario
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        
        const newuser = await db.Users.create({
            email, password: md5(password), name
        });

        if(newuser == 0) throw new Error("Sorry, something went wrong. Try later");

        //Preparamos para enviar el correo de confirmacion
        const senderEmail = 'yamilm61@gmail.com';
        const senderName = 'Yamil Martinez';
        await sendEmail(senderEmail, senderName, email, name, 'Confirmacion de cuenta');

        res.status(200).json({message: 'Usuario creado'});        
    } catch (error) {        
        console.log(error)       
        res.status(400).json({message: error.message});        
    }
});

module.exports = router;