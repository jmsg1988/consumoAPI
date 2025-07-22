const express = require('express');
const router = express.Router();
const {getUltimoMensaje} = require('../mqtt/cliente');

router.get('/hola', (req,res)=>{
	res.send('La api esta levantada correctamente');
});

router.get('/datos', (req,res)=>{
	const datos  = getUltimoMensaje();
	if(datos){
		res.json(datos);
	}else{
		res.status(404).json({error: 'Aún no se han recibido datos'});
	}
});

module.exports = router;
