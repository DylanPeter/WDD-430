import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Add this
import { HeaderComponent } from './header.component'; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // ✅ Add it here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}