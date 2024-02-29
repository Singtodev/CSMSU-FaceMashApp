import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
 
  public isLoading = false;

  constructor(private auth: AuthService, private fmapi: FacemashApiService) {
  }

  async ngOnInit() {
    await this.initializeApp();
    setTimeout(()=> {
      this.isLoading = false;
    },3000)
  }

  async initializeApp() {
    this.isLoading = true;
    if (this.auth.getToken()) {
      try {
        const refreshed = await this.fmapi.refreshToken().toPromise();
        if (refreshed.isExpire) {
          sessionStorage.setItem('token', refreshed.newToken);
          const user = await this.fmapi.getMe().toPromise();
          this.auth.setUser(user);
        } else {
          const user = await this.fmapi.getMe().toPromise();
          this.auth.setUser(user);
        }
      } catch (error) {
        // Handle error appropriately, e.g., show error message to the user
        console.error('Error occurred during initialization:', error);
      }
    }
  }
}
