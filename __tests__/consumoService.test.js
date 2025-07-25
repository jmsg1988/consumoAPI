const {getLimiteConsumo, grabarLimiteConsumo } = require('../services/consumoService');
const path = require ('path');
const fs = require('fs/promises');

const pathFile = path.join(__dirname, '..', 'config.json');
describe('obtener el limite actual', ()=>{
    it('leemos el limite', async ()=>{
        const limite = await getLimiteConsumo();
        const data = await fs.readFile(pathFile, 'utf-8');
        const parsedData = JSON.parse(data);
        expect(parsedData.limiteConsumo).toBe(limite);
    });
});

describe('grabar nuevo Limite', ()=>{
    it('enviamos limite numerico', async ()=>{
        const nuevoLimite = 5000;
        const resul = await grabarLimiteConsumo(nuevoLimite);
        const data = await fs.readFile(pathFile, 'utf-8');
        const parsedData = JSON.parse(data);
        expect(parsedData.limiteConsumo).toBe(nuevoLimite);
    });

    it('enviamos limite con cadena', async()=>{
        const nuevoLimite = "5000";
        const resul = await grabarLimiteConsumo(nuevoLimite);
        expect(resul).toBe(false);
    })
});