import express, { json } from 'express';
import { uuid } from 'uuidv4';
import cors from 'cors';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

interface projectData {
	id: string;
	title: string;
	owner: string;
}

const projects: projectData[] = [];

app.get('/projects', (request, response) => {
	return response.json(projects);
});

app.post('/projects', (request, response) => {
	try {
		const { title, owner } = request.body;
		const project = {
			id: uuid(),
			title,
			owner,
		};
		projects.push(project);
		return response.status(200).json(projects);
	} catch (error) {
		return response.status(400).send(error);
	}
});

app.put('/projects/:id', (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;

	const findIndex = projects.findIndex(project => project.id === id);
	projects[findIndex] = {
		id,
		title,
		owner,
	};
	return response.status(200).json(projects[findIndex]);
});

app.delete('/projects/:id', (request, response) => {
	const { id } = request.params;
	const findIndex = projects.findIndex(project => project.id === id);
	projects.splice(findIndex, 1);
	return response.status(200).json({
		message: 'Project deleted',
		id,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
