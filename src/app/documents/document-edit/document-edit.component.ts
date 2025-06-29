import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;
  id: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      const original = this.documentService.getDocument(this.id);
      if (!original) {
        return;
      }

      this.originalDocument = original;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(original));
    });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;

    const newDocument = new Document(
      value.id ?? '', // fallback in case id isn't bound in form
      value.name,
      value.description,
      value.url,
      [] // children
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel(): void {
    this.router.navigate(['/documents']);
  }
}