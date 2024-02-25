import { AuthService } from './../../services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../types/user_model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(private fmapi: FacemashApiService, private auth: AuthService) {}

  public users: any[] = [];
  public me: UserResponse | null = null;
  public isLogin: boolean  = false;

  ngOnInit() {
    this.fmapi.getUserAll().subscribe((data) => {
      this.users = data;
    });
    this.isLogin = this.auth.isLoggedIn()
  }

  onClickLoginButton() {
    this.auth.login('midoriya_izuku@gmail.com', '123456').subscribe((data) => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        this.fmapi.getMe().subscribe((user)=> {
          this.auth.setUserLogin(user);
        })
      }
    });
  }


  
}
