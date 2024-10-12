// /routes/projectRoutes.js
const express = require('express');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/projectController'); // Ensure this path is correct
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this path is correct

const router = express.Router();

// Protect these routes with authMiddleware
router.post('/', authMiddleware, createProject); // POST /api/projects
router.get('/', authMiddleware, getAllProjects); // GET /api/projects
router.get('/:id', authMiddleware, getProjectById); // GET /api/projects/:id
router.put('/:id', authMiddleware, updateProject); // PUT /api/projects/:id
router.delete('/:id', authMiddleware, deleteProject); // DELETE /api/projects/:id

module.exports = router;
