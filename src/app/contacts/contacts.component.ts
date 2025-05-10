import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { NgIf } from '@angular/common'; 
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent, NgIf], 
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  selectedContact!: Contact;
}