# Consumo Energético - MQTT + Node.js + Raspberry Pi

Este proyecto conecta una Raspberry Pi a un medidor de consumo eléctrico usando MQTT y expone una API REST para consultar los datos en tiempo real.

## Tecnologías usadas

- Node.js (Express)
- MQTT (con un dispositivo Tasmota)
- Raspberry Pi

## Endpoints

- `GET /api/v1/hola` -> Prueba de funcionamiento.
- `GET /api/v1/datos` -> Devuelve el último mensaje MQTT recibido.

## Cómo configurar

Cambiar el archivo config.example.js y rellenarlo con las credenciales correctas del Topic y el host del broker MQTT y renombrarlo como config.js

## Cómo usar

```bash
npm install
node app.js

