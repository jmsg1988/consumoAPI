const mqtt = require('mqtt');
const config = require('../config');
const { guardarUltimoMensajeDelDia } = require('../services/registroService');
const { hayCambioDeDia } = require('./helpers/mqttHelper');
const { sendPowerAlert } = require('../services/telegramService');

let ultimoMensaje = null;

const cliente = mqtt.connect(`mqtt://${config.mqtt.host}:${config.mqtt.port}`, {
	username: config.mqtt.username,
	password: config.mqtt.password
});

cliente.on('connect', () => {
	console.log('Conectado al broker MQTT');
	cliente.subscribe(config.mqtt.topic, (err) => {
		if (err) {
			console.error('Error al suscribirse:', err.message);
		} else {
			console.log(`Suscripción exitosa al topic: ${config.mqtt.topic}`);
		}
	});
});

cliente.on('message', async (topic, mensaje) => {
	let datos;
	try {
		datos = JSON.parse(mensaje.toString());
		console.log(`Datos recibidos:`, datos);
		if(datos?.ENERGY.Power > 3300){
			await sendPowerAlert(datos?.ENERGY.Power);
		}
		//Comprobamos cambio de dia si ya hemos recibido algun mensaje alguna vez
		if (hayCambioDeDia(datos, ultimoMensaje)) {
			console.log(`Cambio de día detectado`);
			guardarUltimoMensajeDelDia(ultimoMensaje)
				.then(() => {
					console.log(`Último mensaje del ${fechaAnterior} guardado en Firebase.`);
				})
				.catch(err => {
					console.error('Error al guardar mensaje en Firebase:', err);
				});
		}

		// después de la comparación, se actualiza el último mensaje
		ultimoMensaje = datos;

	} catch (e) {
		console.error('Error parseando mensaje MQTT:', e.message);
	}
});

module.exports = {
	getUltimoMensaje: () => ultimoMensaje
};
