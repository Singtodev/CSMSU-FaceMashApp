import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BattleComponent } from '../../components/battle/battle.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/api/auth.service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    BattleComponent,
    SidebarComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  public hideNavigate: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (!this.auth.currentUserValue) {
      this.hideNavigate = true;
    }
  }

  public isSidebarOpen = false;

  public toggleSidebar(): void {
    if (this.auth.currentUserValue) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      return Toastify({
        text: 'Please login ! ',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right, #B00000, #C9C03D)',
        },
        onClick: function () {},
      }).showToast();
    }
  }

  public goToTopRank() {
    this.router.navigate(['toprank']);
  }
}
