import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  templateUrl: './message-edit.component.html',
})
export class MessageEditComponent {
  currentSenderId = '1';

  constructor(private messageService: MessageService) {}

  onSendMessage(value: string) {
    if (!value) return;
  
    const newMessage = new Message(
      (Math.random() * 10000).toFixed(0),
      'New Message',
      value,
      this.currentSenderId
    );
  
    this.messageService.addMessage(newMessage);
  }
  
  onClear(input: HTMLInputElement) {
    input.value = '';
  }
  }
  
