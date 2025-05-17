import { Component, Output, EventEmitter } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive'; // Adjust path if needed

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}