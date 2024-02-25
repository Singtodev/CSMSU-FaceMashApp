import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public email: string = '';
  public password: string = '';
  public displayName: string = '';
  public loading: boolean = false;

  constructor(private auth: AuthService) {}

  goLogin() {
    this.auth.goLogin();
  }

  public goHome() {
    this.auth.goHome();
  }

  SignUp() {
    Swal.fire({
      title: 'SignUp Successful!',
      text: 'Wait a moment, the system will navigate to the next page.',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#000',
    }).then(() => {
      this.goHome();
    });
  }
}
