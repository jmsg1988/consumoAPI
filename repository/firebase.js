const admin = require('firebase-admin');
const account = require('../consumoapi-7a6cf-firebase-adminsdk-fbsvc-44e6c42129.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: "https://consumoapi-7a6cf-default-rtdb.europe-west1.firebasedatabase.app/"
});

module.exports = admin ;