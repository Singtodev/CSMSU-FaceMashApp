import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-setting-navigate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setting-navigate.component.html',
  styleUrl: './setting-navigate.component.scss',
})
export class SettingNavigateComponent implements OnInit {
  public paths = [
    {
      path: '/setting',
      label: 'My Personal Profile',
    },
    {
      path: '/setting/gallery',
      label: 'My Gallery',
    },
    {
      path: '/setting/report',
      label: 'My Report',
    },
    {
      path: '/setting/votelog',
      label: 'Vote Logs',
    },
  ];

  public activeIndex = 0;
  public user: any = null;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.currentUserValue != null) {
      this.user = this.auth.currentUserValue;
    }

    this.activeIndex = this.paths.findIndex(
      (item) => item.path === this.router.url
    );

    if (this.router.url === '/setting/gallery/add') {
      this.activeIndex = 1;
    }
  }

  public goPath(path: string) {
    this.router.navigate([path]);
    this.activeIndex = this.paths.findIndex((item) => item.path === path);
  }

  public goBack() {
    this.router.navigate(['']);
  }
}
