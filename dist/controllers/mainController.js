"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.version = exports.time = exports.ping = void 0;
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const FileInfo = {
    serverFilePath: path_1.default.join(__dirname, process.env.TARGET_FILE_PATH),
    fileSize: undefined,
    companyName: process.env.COMPANY_NAME,
    buildNum: parseInt(process.env.BUILD_NUM),
    buildDate: process.env.BUILD_DATE,
    api_key: process.env.API_KEY,
    md5Checksum: undefined
};
function md5GetCheckSum() {
    const fs = require("fs");
    FileInfo.fileSize = fs.statSync(FileInfo.serverFilePath).size;
    ///let {filesize} = require("filesize"); 
    //FileInfo.file_size = filesize(size, {standard: "jedec"});
    let buff = fs.readFileSync(FileInfo.serverFilePath);
    FileInfo.md5Checksum = (0, crypto_1.createHash)("md5").update(buff).digest("hex");
}
const ping = (req, res) => {
    res.status(201).json({ pong: true });
};
exports.ping = ping;
const time = (req, res) => {
    const date = new Date();
    const gmt_offset = date.getTimezoneOffset();
    res.json({ "timestamp": "1626965716.0" });
};
exports.time = time;
const version = (req, res) => {
    md5GetCheckSum();
    res.status(200).json(FileInfo);
};
exports.version = version;
const update = (req, res) => {
    const { api_key } = req.params;
    console.log(api_key);
    if (process.env.API_KEY === api_key)
        res.download(FileInfo.serverFilePath);
    else
        res.status(401).json({ Erro: 'Não autorizado' });
};
exports.update = update;
