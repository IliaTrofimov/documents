import { Component, OnInit } from '@angular/core';
import { SiteError, SiteErrorCodes } from '../models/site-error';
import { ErrorService } from '../services/errors.service';

@Component({
  selector: 'error',
  template: `
    <h2 *ngIf="error.Status != Codes.Ok">Не удалось загрузить страницу :(</h2>
    <h4>{{error.Title}}</h4>
    <b><small class="text-muted">Код: {{error.Status}}</small></b>
    <hr>
    <p>{{error.Message}}</p>
    <div *ngIf="error.Info" style="width: 80%;">
      <a (click)="hidden = !hidden" class="link" data-toggle="collapse" href="#collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
        {{hidden ? "Подробности" : "Скрыть"}}
      </a>
      <div class="collapse" id="collapse">
        <pre style="font-family: consolas; font-size: 10pt;">Error: {{error.Info}} </pre>
      </div>
    </div>

  `
})
export class ErrorComponent implements OnInit {
  Codes = SiteErrorCodes;
  hidden: boolean = true;
  error: SiteError = new SiteError(200);

  constructor(private errorSvc: ErrorService){}

  ngOnInit(){
    this.error = this.errorSvc.lastError;   
  }
}