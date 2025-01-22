import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/services/DocumentoService';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentos: Documento[] = [];

  constructor(private documentoService: DocumentoService) {}

  ngOnInit(): void {
    this.loadDocumentos();
  }

  loadDocumentos(): void {
    this.documentoService.getDocumentos().subscribe(
      (data) => this.documentos = data,
      (error) => console.error('Error al cargar documentos', error)
    );
  }

  editDocumento(documento: Documento): void {
    console.log('Editar Documento:', documento);
  }

  deleteDocumento(id: number): void {
    if (confirm('¿Está seguro de eliminar este documento?')) {
      this.documentoService.deleteDocumento(id).subscribe(() => {
        this.loadDocumentos();
      });
    }
  }
}
