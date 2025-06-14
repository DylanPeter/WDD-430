import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';  // Adjust the path + model if needed

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ContactDetailComponent {
  contact!: Contact;  // Assuming Contact is your model, adjust as needed

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  onDelete() {
    if (!this.contact) {
      return;
    }
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}