import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TemplatesListComponent } from './templates-list/templates-list.component';
import { TemplateViewComponent } from './template-view/template-view.component';
import { TemplateFieldComponent } from './template-view/template-field.component';
import { TemplateTableComponent } from './template-view/template-table.component';
import { TemplatesRoutingModule } from './templates-routing.module';

import { RestrictionPipe } from '../pipes/restriction.pipe';

import { FieldTypePipe } from '../pipes/field-type.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    TemplatesListComponent,
    TemplateViewComponent,
    TemplateFieldComponent,
    TemplateTableComponent,
    RestrictionPipe,
    FieldTypePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesRoutingModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [],
  exports: [TemplatesListComponent]
})
export class TemplatesModule { }
