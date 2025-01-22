import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentoService } from 'src/app/services/DocumentoService';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
  documentForm!: FormGroup;
  submitted = false;
  documento: Documento | undefined;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      idRemitente: [this.documento?.idRemitente || '', Validators.required],
      fechaElaboracion: [this.documento?.fechaElaboracion || '', Validators.required],
      fechaRecepcion: [this.documento?.fechaRecepcion || '', Validators.required],
      idTipoDocumento: [this.documento?.idTipoDocumento || '', Validators.required],
      sumilla: [this.documento?.sumilla || '', Validators.required],
      idAreaDestino: [this.documento?.idAreaDestino || '', Validators.required],
    });
  }

  get f() { return this.documentForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.documentForm.valid) {
      const formData = this.documentForm.value;
      this.activeModal.close(formData);
    }
  }
}
