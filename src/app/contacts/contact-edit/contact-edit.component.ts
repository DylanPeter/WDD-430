import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
  contact: Contact = new Contact('', '', '', '', '', null);  private editMode = false;
  private contactId: string | null = null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      this.editMode = !!this.contactId;

      if (this.editMode && this.contactId) {
        const existingContact = this.contactService.getContact(this.contactId);
        if (existingContact) {
          this.contact = JSON.parse(JSON.stringify(existingContact)); // Deep copy
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    const updatedContact = new Contact(
      this.contact.id,
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imageUrl,
      null
    );

    if (this.editMode) {
      this.contactService.updateContact(this.contact, updatedContact);
    } else {
      this.contactService.addContact(updatedContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}