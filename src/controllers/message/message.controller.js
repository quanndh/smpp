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
                if (pdu.command_status !== 0) {
                    return res.status(400).send({
                        code: 400,
                        message: "Lỗi bind với server",

                    })
                }
                session.submit_sm({
                    source_addr: shortcode,
                    destination_addr: msisdn,
                    short_message: mo
                }, function (pdu) {
                    if (pdu.command_status == 0) {
                        return res.status(200).send({
                            code: 0,
                            shortcode,
                            msisdn,
                            mo,
                            message: "success"
                        })
                    } else {
                        return res.status(400).send({
                            code: 400,
                            message: "Lỗi gửi sms",

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