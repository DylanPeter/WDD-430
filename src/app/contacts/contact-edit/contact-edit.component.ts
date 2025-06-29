import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactItemComponent } from '../contact-item/contact-item.component';



@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, ContactItemComponent],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode = false;
  id: string = '';

  constructor(
    private contactService: ContactService,
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

      const fetched = this.contactService.getContact(this.id);
      if (!fetched) {
        return;
      }

      this.originalContact = fetched;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id ?? '', // fallback if missing
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onDrop(event: CdkDragDrop<any>) {
    const selectedContact = event.item.data;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) return;

    this.groupContacts.push(selectedContact);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) return;
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => newContact.id === c.id);
  }
}