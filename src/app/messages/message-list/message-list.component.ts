import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent, NgFor],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message("1", "Subject 1", "This is the first message", "Alice"),
    new Message("2", "Subject 2", "This is the second message", "Bob"),
    new Message("3", "Subject 3", "Here's a third one", "Carol")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}