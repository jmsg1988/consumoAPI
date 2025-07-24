const axios = require('axios');
const config = require('../config.js');
const TELEGRAM_BOT_TOKEN = config.telegram.bot_token;
const TELEGRAM_CHAT_ID = config.telegram.chat_id;

async function sendPowerAlert(activePower) {
    const text = `!Alerta! Active power ha superado los 3300W! Actualmente se estan consumiendo: ${activePower};`
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHAT_ID,
                text
            }
        );
        return response;
    } catch (error) {
        console.error('Error enviando mensaje a Telegram:', error);
        throw error;
    }
}

module.exports = {sendPowerAlert} ;