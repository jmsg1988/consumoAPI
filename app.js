const express = require('express');
const app =  express();
const config = require('./config');
const rutas = require('./routes/datos');

app.use(express.json());
app.use('/api/v1', rutas);

app.listen(config.port, ()=>{
	console.log(`Servidor escuchando en el puerto ${config.port}`);
});
