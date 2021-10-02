const express = require('express');
const app = express();

//Declaracion de rutas
const characterRoute = require('./api/character');
const movieRoute = require('./api/movie');
const authRoute = require('./api/auth');

app.use(express.json());

app.use('/api/characters', characterRoute);
app.use('/api/movies', movieRoute);
app.use('/api/auth', authRoute);

app.listen(3000, () => console.log("Servidor corriendo port:3000"));