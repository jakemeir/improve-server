"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./util/database"));
const swagger = require('../swagger.json');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger));
app.get('/users', (req, res) => {
    const data = {
        isSuccessful: true,
        displayMessage: null,
        description: null,
        exception: null,
        timestamp: null,
        data: {}
    };
    res.json(data);
});
database_1.default.authenticate().then(t => console.log('Connection has been established successfully.')).catch(e => console.log(e));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
