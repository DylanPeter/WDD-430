import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';  // ✅ import HeaderComponent

@Component({
  selector: 'cms-root',
  standalone: true,  // ✅ You have this or Angular thinks this is standalone
  imports: [RouterModule, HeaderComponent],  // ✅ add HeaderComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
}