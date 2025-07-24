// config.example.js
module.exports = {
  port: 3000,
  mqtt: {
    host: '192.168.1.100',
    port: 1883,
    username: 'usuario',
    password: 'contraseña',
    topic: 'tutopic'
  },
  telegram: {
    bot_token: 'tokenbot',
    chat_id: 'idchat'
  }

};
