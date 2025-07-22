const express = require('express');
const mqtt = require('mqtt');
const app= express();
const PORT=3000;

let ultimoMensaje = null;

const MQTTOptions = {
  host:'192.168.43.56',
  port: 1883,
  username: 'jmsg1988',
  password: 'jmsg140288'
};

const clienteMQTT = mqtt.connect(`mqtt://${MQTTOptions.host}:${MQTTOptions.port}`, {
 username: MQTTOptions.username,
 password: MQTTOptions.password
});

clienteMQTT.on('connect', ()=>{
  console.log('conectado al broker MQTT');
  const topic = 'tele/pzem004/SENSOR';
  clienteMQTT.subscribe(topic, (err)=>{
    if(err){
      console.error('Error al suscribirse al topic: ', err.message);
    }else{
      console.log(`Suscrito al topic: ${topic}`);
    }
  });
});

clienteMQTT.on('message', (topic, mensaje)=>{
  try{
    const datos = JSON.parse(mensaje.toString());
    console.log(`Datos recibidos: ${datos}`);
    ultimoMensaje = datos;
  } catch(e){
     console.error('Hubo un error al parsear el mensaje MQTT');
  }
});

app.use(express.json());
app.get('/hola',(req,res)=>{
	res.json("Hola desde la API");
});

app.get('/datos', (req,res)=>{
	if(ultimoMensaje){
	   res.json(ultimoMensaje);
	}else{
	   res.status(404).json({error: 'Aun no se recibieron datos'});
	}

});
app.listen(PORT,()=>{
	console.log(`Servidor en marcha en el puerto ${PORT}`);
});
