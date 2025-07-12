import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  private baseUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  getDocuments(): void {
    this.http.get<{ message: string; documents: Document[] }>(this.baseUrl)
      .subscribe({
        next: (res) => {
          this.documents = res.documents;
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('GET /documents error', err)
      });
  }

  getDocument(id: string) {
    return this.http.get<{ message: string; document: Document }>(
      `${this.baseUrl}/${id}`
    );
  }

  addDocument(newDoc: Document) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; document: Document }>(
      this.baseUrl,
      newDoc,
      { headers }
    ).subscribe({
      next: res => {
        this.documents.push(res.document);
        this.documentChangedEvent.next(this.documents.slice());
      },
      error: err => console.error('POST /documents error', err)
    });
  }

  updateDocument(original: Document, updated: Document) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      `${this.baseUrl}/${original.id}`,
      updated,
      { headers }
    ).subscribe({
      next: () => {
        const pos = this.documents.findIndex(d => d.id === original.id);
        this.documents[pos] = updated;
        this.documentChangedEvent.next(this.documents.slice());
      },
      error: err => console.error('PUT /documents error', err)
    });
  }

  deleteDocument(document: Document) {
    this.http.delete(`${this.baseUrl}/${document.id}`)
      .subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.id !== document.id);
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('DELETE /documents error', err)
      });
  }
}