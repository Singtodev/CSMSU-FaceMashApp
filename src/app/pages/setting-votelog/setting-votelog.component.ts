import { Component } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-votelog',
  standalone: true,
  imports: [SettingNavigateComponent],
  templateUrl: './setting-votelog.component.html',
  styleUrl: './setting-votelog.component.scss',
})
export class SettingVotelogComponent {
  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
  }
}
