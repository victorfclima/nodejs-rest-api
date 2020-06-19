import React, { useState, useEffect } from 'react';
import api from './services/api';

function App() {
	interface projectData {
		id: string;
		title: string;
		owner: string;
	}

	const [projects, setProjects] = useState<projectData[]>([]);

	useEffect(() => {
		api.get('projects').then(response => setProjects(response.data));
	}, []);

	return (
		<>
			<ul>
				{projects.map(project => {
					return (
						<li key={project.id}>
							<p>ID: {project.id}</p>
							<p>Title: {project.title}</p>
							<p>Owner: {project.owner}</p>
						</li>
					);
				})}
			</ul>
			<button type='button'>Adicionar projeto</button>
		</>
	);
}

export default App;
