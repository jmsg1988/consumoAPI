const express = require('express');
const router = express.Router();
const {getUltimoMensaje} = require('../mqtt/cliente');
const {getLimiteConsumo, grabarLimiteConsumo} = require('../services/consumoService');

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

router.get('/limite', async (req,res)=>{
	try{
		const consumoLimite = await getLimiteConsumo();
		res.json({
			limite: consumoLimite,
			instrucciones: `Para modificar el limite manda un post a esta misma ruta /limite con la propiedad nuevoLimite y su valor. Ejemplo: {"nuevoLimite": 3000}`
		})
	}catch(e){
		res.status(500).json({error: 'No se ha podido recuperar el limite de consumo'});
	}
	
});

router.post('/limite', async (req,res)=>{
	const {nuevoLimite} = req.body;
	if (typeof nuevoLimite !== 'number') {
        return res.status(400).json({ error: 'El nuevo límite debe ser un número' });
    }
    const ok = await grabarLimiteConsumo(nuevoLimite);
    if (ok) {
        res.json({ success: true, nuevoLimite });
    } else {
        res.status(500).json({ error: 'No se pudo actualizar el límite de consumo' });
    }

});

module.exports = router;
