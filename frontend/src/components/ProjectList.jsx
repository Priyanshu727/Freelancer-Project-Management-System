import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProjects = async () => {
        setLoading(true);
        setError('');

        try {
            // Make the GET request with credentials to include cookies
            const response = await axios.get('/api/projects', { withCredentials: true });
            setProjects(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch projects.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <ProjectForm refreshProjects={fetchProjects} />

            <h2 className="text-3xl font-bold mt-6 mb-4">Projects</h2>

            {loading && (
                <div className="flex justify-center items-center">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                    <span className="ml-2">Loading projects...</span>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && projects.length === 0 && (
                <p className="text-gray-500">No projects found. Please create a new project.</p>
            )}

            {!loading && projects.length > 0 && (
                <ul className="mt-4 space-y-4">
                    {projects.map((project) => (
                        <li key={project._id} className="bg-white p-4 rounded shadow-md">
                            <h3 className="font-bold text-xl">{project.title}</h3>
                            <p className="text-gray-700">{project.description}</p>
                            <p className="text-gray-500">
                                {project.startDate} - {project.endDate}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;
