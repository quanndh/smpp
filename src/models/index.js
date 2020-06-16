"use strict";

const fs = require("fs");
const path = require("path");
const config = require("../../configs/configs")

const Sequelize = require("sequelize")
const basename = path.basename(__filename)
const db = {}
const Op = Sequelize.Op
const operatorsAliases = {
    "$eq": Op.eq,
    "$ne": Op.ne,
    "$gte": Op.gte,
    "$gt": Op.gt,
    "$lte": Op.lte,
    "$lt": Op.lt,
    "$not": Op.not,
    "$in": Op.in,
    "$notIn": Op.notIn,
    "$is": Op.is,
    "$like": Op.like,
    "$notLike": Op.notLike,
    "$iLike": Op.iLike,
    "$notILike": Op.notILike,
    "$regexp": Op.regexp,
    "$notRegexp": Op.notRegexp,
    "$iRegexp": Op.iRegexp,
    "$notIRegexp": Op.notIRegexp,
    "$between": Op.between,
    "$notBetween": Op.notBetween,
    "$overlap": Op.overlap,
    "$contains": Op.contains,
    "$contained": Op.contained,
    "$adjacent": Op.adjacent,
    "$strictLeft": Op.strictLeft,
    "$strictRight": Op.strictRight,
    "$noExtendRight": Op.noExtendRight,
    "$noExtendLeft": Op.noExtendLeft,
    "$and": Op.and,
    "$or": Op.or,
    "$any": Op.any,
    "$all": Op.all,
    "$values": Op.values,
    "$col": Op.col
}

const sequelize = new Sequelize({
    "username": config.DB_SQL_USER,
    "password": config.DB_SQL_PASSWORD,
    "database": config.DB_SQL_NAME,
    "host": config.DB_SQL_HOST,
    "port": config.DB_SQL_PORT,
    "dialect": "mysql",
    "freezeTableName": true,
    "define": {
        "charset": 'utf8mb4',
        "collate": 'utf8mb4_general_ci',
    },
    // "operatorsAliases": operatorsAliases,
    "timezone": "+07:00",
    "logging": false
})

fs
    .readdirSync(__dirname, "./schema")
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));

        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.operatorsAliases = operatorsAliases;

module.exports = db;
