import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;
}