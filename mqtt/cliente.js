const mqtt = require('mqtt');
const config = require('../config');

let ultimoMensaje=null;

const cliente = mqtt.connect(`mqtt://${config.mqtt.host}:${config.mqtt.port}`, {
	username: config.mqtt.username,
	password: config.mqtt.password
});

cliente.on('connect', ()=>{
	console.log('Conectado al broker MQTT');
	cliente.subscribe(config.mqtt.topic, (err)=>{
		if(err){
			console.error('Hubo algun error al suscribirse: ', err.message);
		}else{
			console.log(`Se subscribió correcamente al topic: ${config.mqtt.topic}`);
		}
	});
});

cliente.on('message', (topic,mensaje)=>{
	try{
		const datos = JSON.parse(mensaje.toString());
		ultimoMensaje = datos;
		console.log(`Datos recibidos: ${datos}`);
	}catch(e){
		console.log('Hubo algun error parseando MQTT message');
	}
});

module.exports = {
	getUltimoMensaje: ()=> ultimoMensaje
};
