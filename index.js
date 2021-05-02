require('dotenv').config()
const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/config')
//Crear el servidor de express
const app = express();
//middlewords
//Configurar cors
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//Base de datos
dbConnection();

//mean_user
//K1NntVDE7vZ0efnF
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT)
});