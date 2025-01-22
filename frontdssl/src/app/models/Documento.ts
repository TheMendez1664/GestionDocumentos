export interface Documento {
    id: number;
    idRemitente: number;
    fechaElaboracion: string; // ISO format: "YYYY-MM-DD"
    fechaRecepcion: string;  // ISO format: "YYYY-MM-DD"
    idTipoDocumento: number;
    sumilla: string;
    idAreaDestino: number;
  }
  