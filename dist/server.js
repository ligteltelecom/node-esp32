"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use('/api', routes_1.default);
server.use('/', (req, res) => {
    res.status(404).send("Rota não encontrada.");
});
const serverPort = process.env.PORT || 3333;
server.listen(serverPort, () => {
    console.log(`Server rodando na porta ${serverPort}`);
});
