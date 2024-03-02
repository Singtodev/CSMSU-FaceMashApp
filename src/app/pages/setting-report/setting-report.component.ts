import { Component } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-report',
  standalone: true,
  imports: [SettingNavigateComponent],
  templateUrl: './setting-report.component.html',
  styleUrl: './setting-report.component.scss',
})
export class SettingReportComponent {
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
