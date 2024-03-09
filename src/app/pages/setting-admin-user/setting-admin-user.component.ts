import { Component, OnInit } from '@angular/core';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-setting-admin-user',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './setting-admin-user.component.html',
  styleUrl: './setting-admin-user.component.scss'
})
export class SettingAdminUserComponent implements OnInit {

  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  currentPage: number = 1;

  pageChanged(event: any): void {
    this.currentPage = event;
  }

  public users: any[] = [];

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

  ngOnInit() {
    if (this.auth.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
    if (this.auth?.currentUserValue?.role != null && this.auth?.currentUserValue?.role != 1) {
      this.router.navigate(['/setting']);
    }

    this.fmapi.getUserAll().subscribe((data)=> {
      this.users = data;
    })
    
  }

  public goUserDetail(id: number){
    this.router.navigate(['setting/admin/users/'+ id])
  }
}
