const { sendPowerAlert } = require('../services/telegramService');

describe('El consumo es de mas de 3300W', ()=>{
    it('envia el mensaje', async ()=>{
        const response = await sendPowerAlert(3400);
        expect(response.data.ok).toBe(true);
    });
});