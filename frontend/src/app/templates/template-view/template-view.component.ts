import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TemplatesService } from '../../services/templates.service';
import { InputField, TableField } from '../../models/template-row';
import { DocTemplate, TemplateType } from 'src/app/models/template';
import { RestrictionTypes } from 'src/app/models/template-enums';


@Component({
  selector: 'app-templates-view',
  templateUrl: './template-view.component.html',
  providers: [TemplatesService]
})
export class TemplateViewComponent implements OnInit {
  template: DocTemplate = new DocTemplate(-1, "");
  templateTypes: TemplateType[] = [];
  status?: [boolean, string]; 
  private vacantId: number = 0;
  private id: number = -1;

  static _restrictionTypes = [
    RestrictionTypes.None,
    RestrictionTypes.Only,
    RestrictionTypes.Except,
    RestrictionTypes.Registry
  ]
  
  get restrictionTypes(){
    return TemplateViewComponent._restrictionTypes;
  }

  constructor(private templateSvc: TemplatesService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(data => this.id = +data);
    this.templateSvc.getTemplateById(this.id).subscribe({
      next: data => {
        this.template = data;
        for (let f of data.fields) {
          if (f.id > this.vacantId) {
            this.vacantId = f.id;
          }
        }
        this.vacantId++;
      },
      error: err => {
        this.router.navigate(['error'], { queryParams: {
          "title": `Не удалось загрузить шаблон '${this.template.name}'`, 
          "error": err.error
        }});
      }
    });
    this.templateSvc.getTypes().subscribe(data => this.templateTypes = data);
  }

  
  changeUsage(){
    if(this.template.depricated == 0) this.template.depricated = 1;
    else this.template.depricated = 0;
  }

  changeOrder(oldOrder: number, delta: number){
    let newOrder = oldOrder + delta;
    if (newOrder < this.template.fields.length && newOrder >= 0){
      [this.template.fields[newOrder], this.template.fields[oldOrder]] = [this.template.fields[oldOrder], this.template.fields[newOrder]];
    }
  }

  addField(){
    this.template.fields.push(new InputField({name: "", id: this.vacantId}));
    this.vacantId++;
  }

  addTable(){
    this.template.fields.push(new TableField({name: "", rows: 5, id: this.vacantId}));
    this.vacantId++;
  }

  deleteField(id: number){
    this.template.fields.splice(id, 1);
  }

  save(){
    this.templateSvc.updateTemplate(this.template).subscribe({
      error: error => this.status =  [true, error.error],
      complete: () => this.status = [true, "Шаблон сохранён"]
    });
  }

  delete(){
    this.templateSvc.deleteTemplate(this.template.id).subscribe({
      next: (data) =>  this.router.navigate(["/templates"]),
      error: (err) => this.status = err.error
    });
  }
}