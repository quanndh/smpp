const config = require("../../configs/configs");
const smpp = require('smpp');
let session = smpp.connect(
    `smpp://${config.SMPP_HOST}:2775`
);

module.exports = {
    sendMessage: (req, res) => {
        try {
            let { shortcode, msisdn, mo } = req.query;
            session.bind_transceiver({
                system_id: config.SMPP_USERNAME,
                password: config.SMPP_PASSWORD,
            }, (pdu) => {
                console.log(pdu)
                console.log('Successfully bound')
                session.submit_sm({
                    source_addr: shortcode,
                    destination_addr: msisdn,
                    short_message: mo
                }, function (pdu) {
                    if (pdu.command_status == 0) {
                        return res.status(200).send({
                            code: 0,
                            message: "success"
                        })
                    }
                });
            })
        } catch (error) {
            return res.send({
                code: 400,
                error
            })
        }
    }
}