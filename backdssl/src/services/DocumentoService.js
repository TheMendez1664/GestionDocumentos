const documentoRepository = require('../repositories/DocumentoRepository');

class DocumentoService {
    async getAllDocumentos() {
        return await documentoRepository.findAll();
    }

    async getDocumentoById(id) {
        const documento = await documentoRepository.findById(id);
        if (!documento) {
            throw new Error('Documento no encontrado');
        }
        return documento;
    }

    async createDocumento(documentoData) {
        return await documentoRepository.create(documentoData);
    }

    async updateDocumento(id, documentoData) {
        const documentoExistente = await documentoRepository.findById(id);
        if (!documentoExistente) {
            throw new Error('Documento no encontrado');
        }
        return await documentoRepository.update(id, documentoData);
    }

    async deleteDocumento(id) {
        const documentoExistente = await documentoRepository.findById(id);
        if (!documentoExistente) {
            throw new Error('Documento no encontrado');
        }
        return await documentoRepository.delete(id);
    }

    // Método para listar documentos por remitente
    async getDocumentosByRemitente(remitenteId) {
        const documentos = await documentoRepository.findByRemitente(remitenteId);
        if (!documentos || documentos.length === 0) {
            throw new Error('No se encontraron documentos para el remitente');
        }
        return documentos;
    }

    // Método para listar documentos por área de destino
    async getDocumentosByAreaDestino(areaId) {
        const documentos = await documentoRepository.findByAreaDestino(areaId);
        if (!documentos || documentos.length === 0) {
            throw new Error('No se encontraron documentos para el área de destino');
        }
        return documentos;
    }

    // Método para listar documentos por tipo de documento
    async getDocumentosByTipo(tipoId) {
        const documentos = await documentoRepository.findByTipoDocumento(tipoId);
        if (!documentos || documentos.length === 0) {
            throw new Error('No se encontraron documentos para el tipo especificado');
        }
        return documentos;
    }
}

module.exports = new DocumentoService();
