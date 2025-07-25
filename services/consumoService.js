const fs = require('fs/promises');
const path = require('path')

const configPath = path.join(__dirname, '..', 'config.json')

async function getLimiteConsumo(){
    const data = await fs.readFile(configPath, 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.limiteConsumo;
}

async function grabarLimiteConsumo(nuevoLimite){
    try{
        if(typeof(nuevoLimite) !== 'number') return false;
        const data = await fs.readFile(configPath, 'utf-8');
        const parsedData = JSON.parse(data);
        parsedData.limiteConsumo = nuevoLimite;
        await fs.writeFile(configPath, JSON.stringify(parsedData, null, 2));
        return true;
    }catch(e){
        console.error('No se pudo grabar el nuevo limite', e);
        return false;
    }
}

module.exports = {
    getLimiteConsumo,
    grabarLimiteConsumo
}