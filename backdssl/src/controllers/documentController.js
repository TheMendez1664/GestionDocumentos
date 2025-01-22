const express = require('express');
const documentoService = require('../services/DocumentoService');
const router = express.Router();

// Obtener todos los documentos
router.get('/', async (req, res) => {
    try {
        const documentos = await documentoService.getAllDocumentos();
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener documentos', error: error.message });
    }
});

// Obtener un documento por ID
router.get('/:id', async (req, res) => {
    try {
        const documento = await documentoService.getDocumentoById(req.params.id);
        if (!documento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.json(documento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el documento', error: error.message });
    }
});

// Crear un nuevo documento
router.post('/', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Datos del documento son necesarios' });
        }
        const newDocumento = await documentoService.createDocumento(req.body);
        res.status(201).json(newDocumento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el documento', error: error.message });
    }
});

// Actualizar un documento
router.put('/:id', async (req, res) => {
    try {
        const updatedDocumento = await documentoService.updateDocumento(req.params.id, req.body);
        if (!updatedDocumento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.json(updatedDocumento);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el documento', error: error.message });
    }
});

// Eliminar un documento
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await documentoService.deleteDocumento(req.params.id);
        if (deleted) {
            return res.status(200).json({ message: 'Documento eliminado con éxito' });
        }
        res.status(404).json({ message: 'Documento no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el documento', error: error.message });
    }
});

// Listar documentos por remitente
router.get('/remitente/:idRemitente', async (req, res) => {
    try {
        const documentos = await documentoService.getDocumentosByRemitente(req.params.idRemitente);
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar documentos por remitente', error: error.message });
    }
});

// Listar documentos por área de destino
router.get('/area/:idArea', async (req, res) => {
    try {
        const documentos = await documentoService.getDocumentosByAreaDestino(req.params.idArea);
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar documentos por área de destino', error: error.message });
    }
});

// Listar documentos por tipo de documento
router.get('/tipo/:idTipo', async (req, res) => {
    try {
        const documentos = await documentoService.getDocumentosByTipo(req.params.idTipo);
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar documentos por tipo', error: error.message });
    }
});

module.exports = router;