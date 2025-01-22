const CrudRepository = require('../lib/crudRepository');
const Documento = require('../models/Documento');

class DocumentoRepository extends CrudRepository {
    constructor() {
        super(Documento);
    }

    // Listar documentos por remitente
    async findByRemitente(remitenteId) {
        try {
            const sql = `
                SELECT d.fechaElaboracion AS Fecha_Elabora, 
                       d.fechaRecepcion AS Fecha_Recibe,
                       td.nombreTipo AS Tipo, 
                       d.sumilla AS Sumilla,
                       a.nombreArea AS Area_Destino
                FROM ${this.tableName} d
                JOIN TipoDocumento td ON d.idTipoDocumento = td.idTipoDocumento
                JOIN Area a ON d.idAreaDestino = a.idArea
                WHERE d.idRemitente = ?`;
            const [rows] = await this.pool.query(sql, [remitenteId]);
            return rows;
        } catch (error) {
            console.error(`Error en findByRemitente: ${error.message}`);
            throw error;
        }
    }

    // Listar documentos por área de destino
    async findByAreaDestino(areaId) {
        try {
            const sql = `
                SELECT d.fechaElaboracion AS Fecha_Elabora,
                       d.fechaRecepcion AS Fecha_Recibe,
                       td.nombreTipo AS Tipo,
                       d.sumilla AS Sumilla,
                       r.nombres AS Remitente
                FROM ${this.tableName} d
                JOIN TipoDocumento td ON d.idTipoDocumento = td.idTipoDocumento
                JOIN Remitente r ON d.idRemitente = r.idRemitente
                WHERE d.idAreaDestino = ?`;
            const [rows] = await this.pool.query(sql, [areaId]);
            return rows;
        } catch (error) {
            console.error(`Error en findByAreaDestino: ${error.message}`);
            throw error;
        }
    }

    // Listar documentos por tipo de documento
    async findByTipoDocumento(tipoId) {
        try {
            const sql = `
                SELECT d.fechaElaboracion AS Fecha_Elabora,
                       d.fechaRecepcion AS Fecha_Recibe,
                       r.nombres AS Remitente,
                       a.nombreArea AS Destino,
                       d.sumilla AS Sumilla
                FROM ${this.tableName} d
                JOIN Remitente r ON d.idRemitente = r.idRemitente
                JOIN Area a ON d.idAreaDestino = a.idArea
                WHERE d.idTipoDocumento = ?`;
            const [rows] = await this.pool.query(sql, [tipoId]);
            return rows;
        } catch (error) {
            console.error(`Error en findByTipoDocumento: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new DocumentoRepository();
