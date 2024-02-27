import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { UserResponse } from '../../types/user_model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  @Output() openGallery = new EventEmitter<any>();

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

  async logout(){
    this.auth.logout();
    await Swal.fire({
      title: 'Logout Successful!',
      text: 'Wait a moment, the system will navigate',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#000',
    }).then(() => {
      window.location.reload();
    });
  }

  validEvent(){
    console.log("hi");
    this.openGallery.emit();
  }

  
}
