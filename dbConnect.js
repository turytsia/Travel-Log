const mongoose = require("mongoose");

module.exports = mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
        console.log(`DB has connected`);
    })
    .catch((err) => {
        console.error(`Unable to connect to DB: ${err}`);
    });