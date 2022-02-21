import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplatesListComponent } from './templates-list/templates-list.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { TemplateViewComponent } from './template-view/template-view.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { ErrorComponent } from './shared-items/error.component';
import { PrintformComponent } from './printform/printform.component';

const routes: Routes = [
  { path: 'documents', component: DocumentsListComponent },
  { path: 'documents/:id', component: DocumentViewComponent },
  { path: 'documents/print/:id', component: PrintformComponent },
  { path: 'templates', component: TemplatesListComponent },
  { path: 'templates/:id', component: TemplateViewComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
