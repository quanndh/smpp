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
const smpp = require('smpp');
let session = smpp.connect(
    `smpp://${config.SMPP_HOST}:2775`
);
dotenv.config({ "path": ".env" });
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

session.bind_transceiver({
    system_id: config.SMPP_USERNAME,
    password: config.SMPP_PASSWORD,
}, (pdu) => {
    if (pdu.command_status !== 0) {
        console.log("can not bind smpp")
    } else {
        session.on("pdu", (pdu) => {
            console.log(1, pdu)
        })
    }
})

module.exports = session




