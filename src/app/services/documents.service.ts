import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Document, DocumentStatus } from '../models/document';
import { AppConfig } from '../app.config';
import { DocumentDataItem } from '../models/document-data-item';


@Injectable()
export class DocumentsService{
    private url = "";
    
    constructor(private http: HttpClient, private config: AppConfig){
        this.url = this.config.apiUrl + "/documents";
    }
    

    getDocuments(type?: DocumentStatus){
        return this.http.get<Document[]>(`${this.url}/list`);
    }

    getDocument(id: number){
        return this.http.get<Document>(`${this.url}/${id}/get`);
    }

    updateDocument(document: Document){
        return this.http.put(`${this.url}/${document.Id}/put`, document);
    }

    updateItem(docId: number, item: DocumentDataItem){
        
        return this.http.put(`${this.url}/${docId}/put-field`, item);
    }

    updateToTemplate(id: number){
        return this.http.put(`${this.url}/${id}/update`, document);
    }

    createDocument(templateId: number, previousVersionId?: number){
        const body = {
            TemplateId: templateId, 
            PreviousVersionId: previousVersionId,
            AuthorId: 0
        };
        return this.http.post<number>(`${this.url}/post`, body);
    }

    deleteDocument(id: number){
        return this.http.delete(`${this.url}/${id}/delete`);
    }
}