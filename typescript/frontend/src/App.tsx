import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

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

	async function handleAddProject() {
		await api
			.post('projects', {
				title: `Project #${Date.now()}`,
				owner: 'Victor França Cavalcanti de Lima',
			})
			.then(response => setProjects(response.data));
	}

	async function handleDeleteProject(id: string) {
		await api.delete(`projects/${id}`);
		const updateProjects = projects.filter(project => project.id !== id);
		setProjects(updateProjects);
	}

	function handleDeleteAllProjects() {
		if (window.confirm('Delete all projects?')) {
			projects.map(project => {
				return api.delete(`projects/${project.id}`);
			});
			const updateProjects = projects.filter(project => '');
			setProjects(updateProjects);
		}
	}
	return (
		<>
			<button type='button' className='addButton' onClick={handleAddProject}>
				Add new project
			</button>
			<button
				type='button'
				className='addButton'
				onClick={handleDeleteAllProjects}
			>
				Delete all projects
			</button>
			<ul>
				{projects.map(project => {
					return (
						<li key={project.id} className='projectContainer'>
							<div className='projectHeader'>
								<p className='projectTitle'>{project.title}</p>
								<button
									type='button'
									className='deleteButton'
									onClick={() => handleDeleteProject(project.id)}
								>
									X
								</button>
							</div>
							<div className='projectOwner'>
								<p className='projectOwner'>{project.owner}</p>
							</div>
							<div className='projectFooter'>
								<p className='projectId'>#{project.id}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default App;
