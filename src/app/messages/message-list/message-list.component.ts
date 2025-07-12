import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    // Fetch messages from the server
    this.messageService.getMessages();

    // Subscribe to changes
    this.subscription = this.messageService.messageChangedEvent
      .subscribe((messages: Message[]) => {
        console.log('✅ messages received →', messages);   // <-- add this line
        this.messages = messages;
      });
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.subscription.unsubscribe();
  }
}