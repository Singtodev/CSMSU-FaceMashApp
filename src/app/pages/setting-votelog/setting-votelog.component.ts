import { Component, Input } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-setting-votelog',
  standalone: true,
  imports: [SettingNavigateComponent , CommonModule , NgxPaginationModule],
  templateUrl: './setting-votelog.component.html',
  styleUrl: './setting-votelog.component.scss',
})
export class SettingVotelogComponent {
  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  @Input() currentPage: number = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }

  public logs: any[] = [];
  public totalLogs = this.logs.length;

  formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options as any);
  }

  ngOnInit(): void {
    if (this.auth.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
    if (this.auth?.currentUserValue?.uid != null) {
      let uid: any = this.auth?.currentUserValue.uid;
      this.fmapi.getReportVote(uid).subscribe((data) => {
        this.logs = data;
      });
    }
  }
}
