class Area {
    static tableName = 'Area';
  
    constructor(id, iniciales, nombreArea) {
      this.id = id;
      this.iniciales = iniciales;
      this.nombreArea = nombreArea;
    }
  }
  
  module.exports = Area;
  