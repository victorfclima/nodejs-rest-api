import express, { json } from 'express';
import { uuid } from 'uuidv4';
import cors from 'cors';

const app = express();
const PORT = 3333;

interface repositoryData {
	id: string;
	title: string;
	owner: string;
}

const repositories: repositoryData[] = [];

app.use(express.json());
app.use(cors());

app.get('/projects', (request, response) => {
	return response.json(repositories);
});

app.post('/projects', (request, response) => {
	try {
		const { title, owner } = request.body;
		const repository = {
			id: uuid(),
			title,
			owner,
		};
		repositories.push(repository);
		return response.status(200).json(repository);
	} catch (error) {
		return response.status(400).send(error);
	}
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;

	const findIndex = repositories.findIndex(repository => repository.id === id);
	repositories[findIndex] = {
		id,
		title,
		owner,
	};
	return response.status(200).json(repositories[findIndex]);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const findIndex = repositories.findIndex(repository => repository.id === id);
	repositories.splice(findIndex, 1);
	return response.status(200).json({
		message: 'Repository deleted',
		id,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
