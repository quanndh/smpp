/**
 *
 *
 * @type {{}}
 */

module.exports = {
  PORT: process.env.NODE_ENV === "production" ? 4789 : 4789,
  URL: process.env.NODE_ENV === "production" ? "72.16.50.11:4785" : 'http://localhost:6868',

  SMPP_HOST: "103.129.188.31",
  SMPP_PORT: 2775,
  SMPP_USERNAME: "daitamphat",
  SMPP_PASSWORD: "cUnT@!t3",

  DB_SQL_HOST: process.env.NODE_ENV === "production" ? "172.16.50.11" : "localhost",
  DB_SQL_USER: process.env.NODE_ENV === "production" ? "u.smscontent" : "root",
  DB_SQL_PORT: "3306",
  DB_SQL_NAME: process.env.NODE_ENV === "production" ? "sms_content" : "mhealth",
  DB_SQL_PASSWORD: process.env.NODE_ENV === "production" ? "tpMuM5P3S4Cza@" : "",
  JWT_KEY: 'ValarMorghulis!',

};
