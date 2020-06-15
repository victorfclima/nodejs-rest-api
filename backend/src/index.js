const express = require('express');

const app = express();
const PORT = 3333;

app.get('/projects', (request, response) => {
	return response.json(['Project 1', 'Project 2', 'Project 3']);
});

app.post('/projects', (request, response) => {
	return response.json(['Project 1', 'Project 2', 'Project 3']);
});

app.put('/projects/:id', (request, response) => {
	return response.json(['Project 4', 'Project 5', 'Project 6']);
});

app.delete('/projects/:id', (request, response) => {
	return response.json(['Project 5', 'Project 6']);
});

app.listen(PORT, () => {
	console.log(`Server is running at: http://localhost:${PORT}`);
});
