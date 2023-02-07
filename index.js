// const express = require('express'); // VERSION COMMON JS
import express from 'express'; // VERSION IMPORT
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

// Conectar a la DB
db.authenticate()
    .then( () => console.log('DB conectada'))
    .catch( error => console.log(error))

// DEFINIR PUERTO
const port = process.env.PORT || 4000;

//  Habilitar PUG
app.set('view engine', 'pug');

app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next();
});
// Agregar Body Parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


// Definir la carpeta publica
app.use(express.static('public'));
app.use('/viajes', express.static('public'));

// AGREGAR ROUTER
app.use('/', router); // USE SOPORTA GET POST PATCH DELETE

app.listen(port, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})