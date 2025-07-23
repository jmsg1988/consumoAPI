const { guardarRegistroDiario } = require('../repository/registroRepository');

function guardarUltimoMensajeDelDia(mensaje){
    if(!mensaje || !mensaje.ENERGY){
        throw new Error ('Mensaje MQTT no válido');
    }

    const fecha = new Date(mensaje.Time);
    const fechaLocalISO = fecha.getFullYear() + '-' +
        String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
        String(fecha.getDate()).padStart(2, '0');
    return guardarRegistroDiario(fechaLocalISO,mensaje);
}

module.exports = {
    guardarUltimoMensajeDelDia
}