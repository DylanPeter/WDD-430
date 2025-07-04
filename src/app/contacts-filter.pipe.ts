import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts/contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: true
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.trim().length === 0) {
      return contacts;
    }

    const lowerTerm = term.toLowerCase();

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerTerm)
    );

    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}