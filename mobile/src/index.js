import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	Text,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
	View,
} from 'react-native';

import api from './services/api';

export default function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('projects').then(response => {
			setProjects(response.data);
		});
	}, []);

	async function handleAddProject() {
		const response = await api.post('projects', {
			title: `Project : #${Date.now()} added`,
			owner: 'Victor França',
		});

		const newProject = response.data;

		setProjects([...projects, newProject]);
	}

	async function handleRemoveProject(id) {
		await api.delete(`projects/${id}`);

		const otherProjects = projects.filter(projects => projects.id !== id);
		setProjects(otherProjects);
	}

	return (
		<>
			<StatusBar barStyle='light-content' backgroundColor='#7159c1' />
			<SafeAreaView style={styles.container}>
				<FlatList
					data={projects}
					keyExtractor={project => project.id}
					renderItem={({ item: project }) => {
						return (
							<View style={styles.row}>
								<Text style={styles.project}>{project.title}</Text>
								<TouchableOpacity
									activeOpacity={0.6}
									style={styles.buttonDelete}
									onPress={() => handleRemoveProject(project.id)}
								>
									<Text style={styles.buttonTextDelete}>X</Text>
								</TouchableOpacity>
							</View>
						);
					}}
				/>
				<TouchableOpacity
					activeOpacity={0.6}
					style={styles.button}
					onPress={handleAddProject}
				>
					<Text style={styles.buttonText}>ADD NEW PROJECT</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#7159c1',
		flex: 1,
	},

	project: {
		color: '#2A2A2A',
		fontSize: 20,
	},

	button: {
		backgroundColor: '#FFF',
		margin: 20,
		height: 50,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		justifyContent: 'center',
	},

	buttonDelete: {
		backgroundColor: 'red',
		margin: 20,
		height: 20,
		width: 20,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonTextDelete: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		justifyContent: 'center',
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 8,
		marginHorizontal: 10,
		marginVertical: 15,
		paddingHorizontal: 10,
	},
});
