const CrudRepository = require('../lib/crudRepository');
const Documento = require('../models/Documento');

class DocumentoRepository extends CrudRepository {
    constructor() {
        super(Documento);
    }

    // Listar documentos por remitente
    async findByRemitente(remitenteId) {
        const sql = `
            SELECT 
                r.dni AS Dni,
                r.nombres AS Remitente,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Fecha_Elabora', d.fechaElaboracion,
                        'Fecha_Recibe', d.fechaRecepcion,
                        'Tipo', td.nombreTipo,
                        'Sumilla', d.sumilla,
                        'Area_Destino', a.nombreArea
                    )
                ) AS Documentos
            FROM ${this.tableName} d
            JOIN Remitente r ON d.idRemitente = r.idRemitente
            JOIN TipoDocumento td ON d.idTipoDocumento = td.idTipoDocumento
            JOIN Area a ON d.idAreaDestino = a.idArea
            WHERE d.idRemitente = ?
            GROUP BY r.idRemitente, r.dni, r.nombres;
        `;
        const [rows] = await this.pool.query(sql, [remitenteId]);
        return rows[0] || null;
    }

    // Listar documentos por área de destino
    async findByAreaDestino(areaId) {
        const sql = `
            SELECT 
                a.iniciales AS Inicial,
                a.nombreArea AS Nombre,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Fecha_Elabora', d.fechaElaboracion,
                        'Fecha_Recibe', d.fechaRecepcion,
                        'Tipo', td.nombreTipo,
                        'Sumilla', d.sumilla,
                        'Remitente', r.nombres
                    )
                ) AS Documentos
            FROM ${this.tableName} d
            JOIN Area a ON d.idAreaDestino = a.idArea
            JOIN TipoDocumento td ON d.idTipoDocumento = td.idTipoDocumento
            JOIN Remitente r ON d.idRemitente = r.idRemitente
            WHERE d.idAreaDestino = ?
            GROUP BY a.idArea, a.iniciales, a.nombreArea;
        `;
        const [rows] = await this.pool.query(sql, [areaId]);
        return rows[0] || null;
    }
    

    // Listar documentos por tipo de documento
    async findByTipoDocumento(tipoId) {
        const sql = `
            SELECT 
                td.nombreTipo AS Tipo,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Fecha_Elabora', d.fechaElaboracion,
                        'Fecha_Recibe', d.fechaRecepcion,
                        'Remitente', r.nombres,
                        'Destino', a.nombreArea,
                        'Sumilla', d.sumilla
                    )
                ) AS Documentos
            FROM ${this.tableName} d
            JOIN TipoDocumento td ON d.idTipoDocumento = td.idTipoDocumento
            JOIN Remitente r ON d.idRemitente = r.idRemitente
            JOIN Area a ON d.idAreaDestino = a.idArea
            WHERE d.idTipoDocumento = ?
            GROUP BY td.idTipoDocumento, td.nombreTipo;
        `;
        const [rows] = await this.pool.query(sql, [tipoId]);
        return rows[0] || null;
    }
    
}

module.exports = new DocumentoRepository();
