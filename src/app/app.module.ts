import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DocumentsComponent } from './documents/document-component/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

import { AppRoutingModule } from './app-routing.module'; // ✅ IMPORT THIS
import { RouterModule } from '@angular/router'; // ✅ ADD THIS


@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      DocumentsComponent,
      MessageListComponent,
      ContactsComponent
    ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule // ✅ USE THIS INSTEAD OF DEFINING ROUTES HERE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}