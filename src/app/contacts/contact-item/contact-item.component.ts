// contact-item.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}