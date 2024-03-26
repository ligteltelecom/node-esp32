import { Request, Response, request } from "express";
import { createHash } from 'crypto'
import path from 'path'
import 'dotenv/config'


interface IFileInfo {
    serverFilePath: string,
    fileSize: number | string | undefined,
    companyName: string,
    buildNum: number,
    buildDate: string,
    api_key: string,
    md5Checksum: string | undefined
}

const FileInfo: IFileInfo = {
    serverFilePath: path.join(__dirname, process.env.TARGET_FILE_PATH as string),
    fileSize: undefined,
    companyName: process.env.COMPANY_NAME as string,
    buildNum: parseInt(process.env.BUILD_NUM as string),
    buildDate: process.env.BUILD_DATE as string,
    api_key: process.env.API_KEY as string,
    md5Checksum: undefined
}

 function md5GetCheckSum() {
    const fs = require("fs")

    FileInfo.fileSize  = fs.statSync(FileInfo.serverFilePath).size;
    
    ///let {filesize} = require("filesize"); 
    //FileInfo.file_size = filesize(size, {standard: "jedec"});

    let buff = fs.readFileSync(FileInfo.serverFilePath)
    FileInfo.md5Checksum = createHash("md5").update(buff).digest("hex");
}

export const ping = (req: Request, res: Response) => {
    res.status(201).json({ pong: true });
}

export const time = (req: Request, res: Response) => {
    const date = new Date();
    const gmt_offset = date.getTimezoneOffset();
    
    res.json({"timestamp": "1626965716.0"})
}

export const version = (req: Request, res: Response) => {
    md5GetCheckSum();
    res.status(200).json(FileInfo);
}

export const update = (req: Request, res: Response) => {
    const {api_key} = req.params;
    console.log(api_key);
 
    if (process.env.API_KEY === api_key)
    
       res.download(FileInfo.serverFilePath as string)
    else
       res.status(401).json({Erro: 'Não autorizado'})
}