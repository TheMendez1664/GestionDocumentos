import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../models/Documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private apiUrl = 'http://localhost:3000/documentos';

  constructor(private http: HttpClient) {}

  // Obtener todos los documentos
  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.apiUrl);
  }

  // Obtener un documento por ID
  getDocumentoById(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo documento
  createDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.apiUrl, documento);
  }

  // Actualizar un documento
  updateDocumento(id: number, documento: Documento): Observable<Documento> {
    return this.http.put<Documento>(`${this.apiUrl}/${id}`, documento);
  }

  // Eliminar un documento
  deleteDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Listar documentos por remitente
  getDocumentosByRemitente(remitenteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/remitente/${remitenteId}`);
  }

  // Listar documentos por área de destino
  getDocumentosByAreaDestino(areaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/area/${areaId}`);
  }

  // Listar documentos por tipo de documento
  getDocumentosByTipo(tipoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tipo/${tipoId}`);
  }
}
