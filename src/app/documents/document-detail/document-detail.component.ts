import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';  // Adjust path if needed

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DocumentDetailComponent {
  document: any;  

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) { }

  onView() {
    if (this.document?.url) {
      window.open(this.document.url, '_blank');
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}