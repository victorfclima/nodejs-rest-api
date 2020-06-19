"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuidv4_1 = require("uuidv4");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var PORT = 3333;
var repositories = [];
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/projects', function (request, response) {
    return response.json(repositories);
});
app.post('/projects', function (request, response) {
    try {
        var _a = request.body, title = _a.title, owner = _a.owner;
        var repository = {
            id: uuidv4_1.uuid(),
            title: title,
            owner: owner,
        };
        repositories.push(repository);
        return response.status(200).json(repository);
    }
    catch (error) {
        return response.status(400).send(error);
    }
});
app.put('/repositories/:id', function (request, response) {
    var id = request.params.id;
    var _a = request.body, title = _a.title, owner = _a.owner;
    var findIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    repositories[findIndex] = {
        id: id,
        title: title,
        owner: owner,
    };
    return response.status(200).json(repositories[findIndex]);
});
app.delete('/repositories/:id', function (request, response) {
    var id = request.params.id;
    var findIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    repositories.splice(findIndex, 1);
    return response.status(200).json({
        message: 'Repository deleted',
        id: id,
    });
});
app.listen(PORT, function () {
    console.log("Server is running at http://localhost:" + PORT);
});
