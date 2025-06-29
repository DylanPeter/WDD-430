import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  subject: string = '';
  msgText: string = '';

  constructor() {}

  onSendMessage() {
    const newMessage = {
      subject: this.subject,
      msgText: this.msgText,
      sender: '1' // static for now; could be set from user context
    };

    console.log('Message sent:', newMessage);

    // Clear the fields after sending
    this.subject = '';
    this.msgText = '';
  }

  onClear() {
    this.subject = '';
    this.msgText = '';
  }
}