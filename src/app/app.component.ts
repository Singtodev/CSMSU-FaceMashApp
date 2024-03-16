import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/api/auth.service';
import { FacemashApiService } from './services/api/facemash-api.service';
import { UserResponse } from './types/user_model';
import { VoteCooldownService } from './services/vote-cooldown.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isLoading = false;

  constructor(
    private auth: AuthService,
    private fmapi: FacemashApiService,
    private votecd: VoteCooldownService
  ) {}

  async ngOnInit() {
    await this.initializeApp();
    setTimeout(()=> {
      this.isLoading = false;
    },2000)
  }

  async initializeApp() {
    this.isLoading = true;

    try {
      this.fmapi.getVoteDelay().subscribe((data) => {
        let cd = data[0];
        this.votecd.setCooldownTime(cd.app_vote_delay);
      });
    } catch (err) {}

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
