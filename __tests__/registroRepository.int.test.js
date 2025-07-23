const admin = require('../repository/firebase');
const { guardarRegistroDiario } = require('../repository/registroRepository');

describe('integracion real con firebase', () => {
    const fechaPrueba = '2099-12-31';
    const mensajePrueba = {
        Time: '2099-12-31T23:59:59',
        ENERGY: { Power: 123, Voltage: 230 }
    };

    afterAll(async () => {
        // Limpia el test
        await admin.database().ref(`registros/${fechaPrueba}`).remove();
    });

    it('guarda el mensaje correctamente en Firebase', async () => {
        await guardarRegistroDiario(fechaPrueba,mensajePrueba);

        const snapshot = await admin.database().ref(`registros/${fechaPrueba}`).once('value');
        const data = snapshot.val();

        expect(data).toEqual(mensajePrueba);
    });
});