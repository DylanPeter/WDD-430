import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent {
  document: Document = new Document('', '', '', '', null);
  editMode = false;
  private documentId: string | null = null;

  constructor(
    private docService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = params['id'];
      this.editMode = !!this.documentId;

      if (this.editMode && this.documentId) {
        const existingDoc = this.docService.getDocument(this.documentId);
        if (existingDoc) {
          this.document = JSON.parse(JSON.stringify(existingDoc));
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    const updatedDoc = new Document(
      this.document.id,
      form.value.name,
      form.value.description,
      form.value.url,
      null
    );

    if (this.editMode) {
      this.docService.updateDocument(this.document, updatedDoc);
    } else {
      this.docService.addDocument(updatedDoc);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}