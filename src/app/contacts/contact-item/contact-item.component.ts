import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact-item.component.html',
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}