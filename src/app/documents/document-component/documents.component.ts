import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DocumentListComponent } from '../document-list/document-list.component';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';
import { DocumentEditComponent } from '../document-edit/document-edit.component';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [CommonModule, RouterModule, DocumentListComponent, DocumentDetailComponent, DocumentEditComponent],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}