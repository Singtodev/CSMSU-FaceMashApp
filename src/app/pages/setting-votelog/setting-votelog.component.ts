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
  imports: [SettingNavigateComponent, CommonModule, NgxPaginationModule],
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

  convertToLocaleTime(isoDateTimeStr: string) {
    // Parse the input string into a Date object
    var dateObj = new Date(isoDateTimeStr);

    // Get the local time zone offset in minutes
    var localOffset = dateObj.getTimezoneOffset();

    // Convert UTC time to local time
    var localTime = new Date(dateObj.getTime() + (localOffset * 60000));

    // Extract date components
    var day = localTime.getDate();
    var monthIndex = localTime.getMonth();
    var year = localTime.getFullYear();
    var hours = localTime.getHours();
    var minutes = localTime.getMinutes();

    // Define month names array
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format the date part of the output string
    var formattedDate = day.toString().padStart(2, '0') + ' ' +
                        monthNames[monthIndex] + ' ' +
                        year.toString().padStart(4, '0');

    // Format the time part of the output string
    var formattedTime = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0');

    // Concatenate date and time with a space
    var formattedDateTime = formattedDate + ' ' + formattedTime;

    return formattedDateTime;
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
