import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  @Input() document!: Document;
}