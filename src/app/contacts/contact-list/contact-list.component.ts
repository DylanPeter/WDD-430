import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactItemComponent, DragDropModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
}