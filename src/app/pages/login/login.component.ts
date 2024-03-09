import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteCooldownService } from '../../services/vote-cooldown.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;

  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router,
    private votecd: VoteCooldownService
  ) {}

  async ngOnInit() {
    // await this.auth.currentUser.subscribe((user) => {
    //   this.loading = true;
    //   if (user) {
    //     setTimeout(()=> {
    //       this.goHome()
    //     },2000)
    //   }
    // });
    // this.loading = false;
  }

  public goHome() {
    this.router.navigate(['/']);
  }

  public goRegister(){
    this.auth.goRegister();
  }

  public SignIn(): void {
    this.auth.login(this.email, this.password).subscribe(
      (data) => {
        if (data.token) {
          // step one set session
          sessionStorage.setItem('token', data.token);
          // fetch current user
          this.fmapi.getMe().subscribe((user) => {
            this.auth.setUser(user);
          });

          try{
            this.fmapi.getVoteDelay().subscribe((data) => {
              let cd = data[0];
              this.votecd.setCooldownTime(cd.app_vote_delay);
            })
          }catch(err){
            
          }
          // alert notifycation
          Swal.fire({
            title: 'Login Successful!',
            text: 'Wait a moment, the system will navigate to the next page.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#000',
          }).then(() => {
            this.goHome();
          });
        }
      },
      (err) => {
        Swal.fire({
          title: err.statusText,
          text: err.error,
          icon: 'info',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#000',
        });
      }
    );
  }
}
