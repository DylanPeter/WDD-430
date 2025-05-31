import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  templateUrl: './document-item.component.html',
})
export class DocumentItemComponent {
  @Input() document!: Document;
}