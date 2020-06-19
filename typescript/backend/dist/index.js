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
app.use(cors_1.default());
app.use(express_1.default.json());
var projects = [];
app.get('/projects', function (request, response) {
    return response.json(projects);
});
app.post('/projects', function (request, response) {
    try {
        var _a = request.body, title = _a.title, owner = _a.owner;
        var project = {
            id: uuidv4_1.uuid(),
            title: title,
            owner: owner,
        };
        projects.push(project);
        return response.status(200).json(projects);
    }
    catch (error) {
        return response.status(400).send(error);
    }
});
app.put('/projects/:id', function (request, response) {
    var id = request.params.id;
    var _a = request.body, title = _a.title, owner = _a.owner;
    var findIndex = projects.findIndex(function (project) { return project.id === id; });
    projects[findIndex] = {
        id: id,
        title: title,
        owner: owner,
    };
    return response.status(200).json(projects[findIndex]);
});
app.delete('/projects/:id', function (request, response) {
    var id = request.params.id;
    var findIndex = projects.findIndex(function (project) { return project.id === id; });
    projects.splice(findIndex, 1);
    return response.status(200).json({
        message: 'Project deleted',
        id: id,
    });
});
app.listen(PORT, function () {
    console.log("Server is running at http://localhost:" + PORT);
});
