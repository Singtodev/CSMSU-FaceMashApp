import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/api/auth.service';
import { FacemashApiService } from './services/api/facemash-api.service';
import { UserResponse } from './types/user_model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private auth: AuthService, private fmapi: FacemashApiService) {
    if (this.auth.getToken()) {
      this.fmapi.refreshToken().subscribe((data) => {
        if (data.isExpire) {
          sessionStorage.setItem('token', data.newToken);
          console.log('token หมดอายุ');
        }
        console.log('token ยังไม่หมด');
      });
    }
  }
}
