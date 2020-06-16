// configure server express
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const express = require("express")
const app = express();
const logger = require("morgan");
const route = require("./src/routes/v1");
const config = require("./src/configs/configs")
const dotenv = require("dotenv");
let server = null;
const helmet = require("helmet");
const authMiddleware = require('./src/middleware/auth/auth.middleware');
dotenv.config({ "path": ".env" });

const smpp = require('smpp');
let session = smpp.connect({
    url: `smpp://${config.SMPP_HOST}:2775`,
    auto_enquire_link_period: 10000
});
// config server with http of https
server = http.createServer(app);


// set server port
app.set("port", config.PORT);

// handle cors
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ["Content-Type", "Authorization"],
    "exposedHeaders": ["Cookie"]
}));

// handle form data using bodyParser
app.use(bodyParser.json({ "extended": true }));
app.use(bodyParser.urlencoded({ "extended": false }));


// create log on server
app.use(logger("dev"));

// helmet security
app.use(helmet());

app.use(authMiddleware);

// create route views
app.use("/api/v1", route);

app.use("/", (req, res) => res.send("API running!"));

// listen a port
server.listen(config.PORT, () => {
    console.log(`Api server: process ${process.pid} running on port ${config.PORT}`);
});

let isConnected = false
session.on('connect', () => {
    isConnected = true;

    session.bind_transceiver({
        system_id: config.SMPP_USERNAME,
        password: config.SMPP_PASSWORD,
        interface_version: 1,
        system_type: '380666000600',
        address_range: '+380666000600',
        addr_ton: 1,
        addr_npi: 1,
    }, (pdu) => {
        console.log(pdu)
        if (pdu.command_status == 0) {
            console.log('Successfully bound')
            sendSMS("9819", "0977059294", "ky thuat test")
        }
    })
})

session.on('close', () => {
    console.log('smpp is now disconnected')
    if (isConnected) {
        session.connect();    //reconnect again
    }
})

session.on('error', error => {
    console.log('smpp error', error)
    isConnected = false;
});

function sendSMS(from, to, text) {
    from = `+${from}`

    // this is very important so make sure you have included + sign before ISD code to send sms

    to = `+${to}`

    session.submit_sm({
        source_addr: from,
        destination_addr: to,
        short_message: text
    }, function (pdu) {
        if (pdu.command_status == 0) {
            // Message successfully sent
            console.log(pdu.message_id);
        }
    });
}

// console.log(isConnected)

