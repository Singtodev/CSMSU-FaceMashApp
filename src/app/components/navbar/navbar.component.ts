import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { UserResponse } from '../../types/user_model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public user: UserResponse | any = null;

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.currentUser.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {}
    );
  }


  goLogin(){
    this.auth.goLogin();
  }

  goRegister(){
    this.auth.goRegister();
  }

  logout(){
    this.auth.logout();
    this.goLogin();
  }

  
}
