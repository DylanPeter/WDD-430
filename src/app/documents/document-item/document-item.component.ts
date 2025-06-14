import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'cms-document-item',
  standalone: true,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  imports: [
    RouterModule
  ]
})
export class DocumentItemComponent {
  @Input() document!: Document;
}