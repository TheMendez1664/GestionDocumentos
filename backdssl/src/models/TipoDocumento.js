class TipoDocumento {
    static tableName = 'TipoDocumento';
  
    constructor(id, nombreTipo) {
      this.id = id;
      this.nombreTipo = nombreTipo;
    }
  }
  
  module.exports = TipoDocumento;
  