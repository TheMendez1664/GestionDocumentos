import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';

const routes: Routes = [
  { path: 'documentos', component: DocumentListComponent }, // Ruta para lista de documentos
  { path: '', redirectTo: '/documentos', pathMatch: 'full' } // Redirección por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
