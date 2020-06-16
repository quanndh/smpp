const config = require("../../configs/configs");
const smpp = require('smpp');
let session = smpp.connect(
    `smpp://${config.SMPP_HOST}:2775`
);

module.exports = {
    sendMessage: (req, res) => {
        try {
            session.bind_transceiver({
                system_id: config.SMPP_USERNAME,
                password: config.SMPP_PASSWORD,
            }, (pdu) => {
                console.log(pdu)
                if (pdu.command_status == 0) {
                    console.log('Successfully bound')
                    session.submit_sm({
                        source_addr: "9819",
                        destination_addr: "84829908363",
                        short_message: text
                    }, function (pdu) {
                        if (pdu.command_status == 0) {
                            return res.status(200).send({
                                message: "success"
                            })
                        }
                    });
                }
            })
        } catch (error) {
            return res.send({
                error
            })
        }
    }
}