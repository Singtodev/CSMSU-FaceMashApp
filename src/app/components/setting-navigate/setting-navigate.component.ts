import { CommonModule, Location } from '@angular/common';
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

  public adminPaths: any[] = [
    {
      path: '/setting/admin/users',
      label: 'Manage Users',
    },
    {
      path: '/setting/admin/app',
      label: 'Setting App',
    }
  ]

  public activeIndex = 0;
  public activeIndexAdmin = 0;
  public user: any = null;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.auth.currentUserValue != null) {
      this.user = this.auth.currentUserValue;
    }

    this.activeIndex = this.paths.findIndex(
      (item) => item.path === this.router.url
    );

    this.activeIndexAdmin = this.adminPaths.findIndex(
      (item) => item.path === this.router.url
    )
    
    if (this.router.url.startsWith('/setting/gallery/') ) {
      this.activeIndex = 1;
    }

    if (this.router.url.startsWith('/setting/admin/users/') ) {
      this.activeIndexAdmin = 0;
    }

  }

  public goPath(path: string) {
    this.activeIndex = this.paths.findIndex((item) => item.path === path);
    this.activeIndexAdmin = this.adminPaths.findIndex(
      (item) => item.path === path
    )
    this.router.navigate([path]);
  }

  public goBack() {
    this.router.navigate(['']);
  }
}
