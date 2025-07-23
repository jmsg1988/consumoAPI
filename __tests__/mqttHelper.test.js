const { hayCambioDeDia } = require('../mqtt/helpers/mqttHelper');

describe('hay cambio de dia', () => {
    it('devuelve true si cambia el dia', () => {
        const msg1 = { Time: '2025-07-22T23:59:59' };
        const msg2 = { Time: '2025-07-23T00:00:01' };
        expect(hayCambioDeDia(msg1, msg2)).toBe(true);
    });

    it('devuelve false si es el mismo día', () => {
        const msg1 = { Time: '2025-07-23T10:00:00' };
        const msg2 = { Time: '2025-07-23T11:30:00' };
        expect(hayCambioDeDia(msg1, msg2)).toBe(false);
    });

    it('devuelve false si uno de los mensajes no existe', () => {
        expect(hayCambioDeDia(null, { Time: '2025-07-23T11:30:00' })).toBe(false);
        expect(hayCambioDeDia({ Time: '2025-07-23T11:30:00' }, null)).toBe(false);
    });
});