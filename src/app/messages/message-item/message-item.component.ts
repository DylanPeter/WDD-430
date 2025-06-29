import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.messageSender = this.contactService.getContact(this.message.sender);
  }
}