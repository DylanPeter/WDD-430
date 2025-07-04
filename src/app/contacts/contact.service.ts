import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;
  private contactsUrl = 'https://angular-project-5e72b-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  storeContacts(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.contactsUrl, this.contacts, { headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(original: Contact, newContact: Contact): void {
    if (!original || !newContact) return;
    const pos = this.contacts.findIndex(c => c.id === original.id);
    if (pos < 0) return;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) || null;
  }
}