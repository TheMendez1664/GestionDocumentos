class Documento {
    static tableName = 'Documento';
  
    constructor(id, idRemitente, fechaElaboracion, fechaRecepcion, idTipoDocumento, sumilla, idAreaDestino) {
      this.id = id;
      this.idRemitente = idRemitente;
      this.fechaElaboracion = fechaElaboracion;
      this.fechaRecepcion = fechaRecepcion;
      this.idTipoDocumento = idTipoDocumento;
      this.sumilla = sumilla;
      this.idAreaDestino = idAreaDestino;
    }
  }
  
  module.exports = Documento;
  