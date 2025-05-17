import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Invoice Q1', 'Quarterly invoice', 'https://example.com/invoice1.pdf', null),
    new Document('2', 'Meeting Notes', 'Notes from client meeting', 'https://example.com/meeting.pdf', null),
    new Document('3', 'Budget 2025', 'Proposed budget for next year', 'https://example.com/budget.pdf', null),
    new Document('4', 'Project Plan', 'Timeline and deliverables', 'https://example.com/plan.pdf', null)
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
