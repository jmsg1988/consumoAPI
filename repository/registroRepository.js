const admin = require ('./firebase');

function guardarRegistroDiario(fechaISO, mensaje){
    //Devolvemos la promesa al hacer set, no hace falta hacer async en la funcion explicitamente
    return admin.database().ref(`registros/${fechaISO}`).set(mensaje);
}

module.exports = {
    guardarRegistroDiario
};