import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document | null = null;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onDelete(): void {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']);
    }
  }

  onView(): void {
    if (this.document?.url) {
      window.open(this.document.url, '_blank');
    }
  }
}