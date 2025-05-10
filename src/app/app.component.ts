import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/document-component/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ContactsComponent,
    DocumentsComponent,
    MessageListComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFeature: string = 'documents'; // Default view

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}