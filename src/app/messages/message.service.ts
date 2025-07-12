import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();   // RxJS Subject is better than EventEmitter here
  private baseUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  /** GET all messages from the Node / Express API */
  getMessages(): void {
    this.http.get<{ message: string; messages: Message[] }>(this.baseUrl)
      .subscribe({
        next: response => {
          this.messages = response.messages;
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('GET /messages error', err)
      });
  }

  /** GET one message (by id) */
  getMessage(id: string) {
    return this.http.get<{ message: string; messageObj: Message }>(
      `${this.baseUrl}/${id}`
    );
  }

  /** ADD */
  addMessage(newMsg: Message) {
    if (!newMsg) return;

    // backend will assign the id
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; messageObj: Message }>(
      this.baseUrl,
      newMsg,
      { headers }
    ).subscribe({
      next: res => {
        this.messages.push(res.messageObj);
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: err => console.error('POST /messages error', err)
    });
  }

  /** UPDATE */
  updateMessage(original: Message, updated: Message) {
    if (!original || !updated) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      `${this.baseUrl}/${original.id}`,
      updated,
      { headers }
    ).subscribe({
      next: () => {
        const pos = this.messages.findIndex(m => m.id === original.id);
        this.messages[pos] = updated;
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: err => console.error('PUT /messages error', err)
    });
  }

  /** DELETE */
  deleteMessage(message: Message) {
    if (!message) return;

    this.http.delete(`${this.baseUrl}/${message.id}`)
      .subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.id !== message.id);
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('DELETE /messages error', err)
      });
  }
}