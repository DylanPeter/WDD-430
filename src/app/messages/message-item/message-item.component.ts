import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender = 'Unknown';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const senderContact: Contact | null = this.contactService.getContact(this.message.sender);
    if (senderContact) {
      this.messageSender = senderContact.name;
    }
  }
}