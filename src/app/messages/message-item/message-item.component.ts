import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message;
}