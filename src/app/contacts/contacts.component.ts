import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactListComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent { }