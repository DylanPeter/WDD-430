import { Component } from '@angular/core';
import { DocumentListComponent } from '../document-list/document-list.component';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, NgIf],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument!: Document;
}