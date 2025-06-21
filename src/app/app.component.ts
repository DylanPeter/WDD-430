import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';  // ✅ import HeaderComponent

@Component({
  selector: 'cms-root',
  imports: [RouterModule, HeaderComponent],  // ✅ add HeaderComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
}