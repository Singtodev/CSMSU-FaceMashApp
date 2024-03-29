import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';
import { CommonModule, Location } from '@angular/common';
import { ReportChartComponent } from '../../components/report-chart/report-chart.component';

@Component({
  selector: 'app-setting-admin-user-id',
  standalone: true,
  imports: [CardVoteComponent, CommonModule, ReportChartComponent],
  templateUrl: './setting-admin-user-id.component.html',
  styleUrl: './setting-admin-user-id.component.scss',
})
export class SettingAdminUserIdComponent implements OnInit {
  public uid: number = 0;
  public datasets = [];
  public user: any = {};
  public loadingChart: boolean = false;
  public isLoad: boolean = false;

  constructor(
    private ac: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private fmapi: FacemashApiService,
    private location: Location
  ) {}


  goBack(){
    this.location.back();
  }

  convertToLocaleTime(isoDateTimeStr: string) {
    // Parse the input string into a Date object
    var dateObj = new Date(isoDateTimeStr);

    // Get the local time zone offset in minutes
    var localOffset = dateObj.getTimezoneOffset();

    // Convert UTC time to local time
    var localTime = new Date(dateObj.getTime() + localOffset * 60000);

    // Extract date components
    var day = localTime.getDate();
    var monthIndex = localTime.getMonth();
    var year = localTime.getFullYear();
    var hours = localTime.getHours();
    var minutes = localTime.getMinutes();

    // Define month names array
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Format the date part of the output string
    var formattedDate =
      day.toString().padStart(2, '0') +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year.toString().padStart(4, '0');

    // Format the time part of the output string
    var formattedTime =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0');

    // Concatenate date and time with a space
    var formattedDateTime = formattedDate + ' ' + formattedTime;

    return formattedDateTime;
  }

  convertToLocaleDate(isoDateTimeStr: string) {
    // Parse the input string into a Date object
    var dateObj = new Date(isoDateTimeStr);

    // Get the local time zone offset in minutes
    var localOffset = dateObj.getTimezoneOffset();

    // Convert UTC time to local time
    var localTime = new Date(dateObj.getTime() + localOffset * 60000);

    // Extract date components
    var day = localTime.getDate();
    var monthIndex = localTime.getMonth();
    var year = localTime.getFullYear();

    // Define month names array
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Format the date part of the output string
    var formattedDate =
      day.toString().padStart(2, '0') +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year.toString().padStart(4, '0');

    return formattedDate;
  }

  getRandomColor() {
    // Generate random values for RGB (Red, Green, Blue)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Construct the CSS color string
    const color = `rgb(${r},${g},${b})`;

    return color;
  }

  async ngOnInit() {
    this.isLoad = true;
    await this.loadData();
    setTimeout(()=> {
      this.isLoad = false;
    },1000)
  }

  async loadData() {
    await this.ac.paramMap.subscribe((value: any) => {
      this.uid = value.params.id || null;
      if (this.auth.currentUserValue === null) {
        this.router.navigate(['/login']);
      }
      if (
        this.auth?.currentUserValue?.role != null &&
        this.auth?.currentUserValue?.role != 1
      ) {
        this.router.navigate(['/setting']);
      }

      if (this.uid != null) {
        this.fmapi.getUserById(String(this.uid)).subscribe((data : any) => {
          if (data && data.length > 0) {
            this.user = data[0];
          }
        });
        this.fmapi.getReport(String(this.uid)).subscribe((data : any) => {
          let datasets: any = {};
          if(!data) return;
          for (let item of data) {
            if (!datasets[item.pid]) {
              let color = this.getRandomColor();
              datasets[item.pid] = {
                label: item.name,
                data: [
                  {
                    x: this.convertToLocaleDate(item.date),
                    y: item.rating_score,
                  },
                ],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                fill: false,
                pointStyle: () => {
                  let img = new Image(30, 30);
                  img.src = item.url;
                  img.style.borderRadius = '20px';
                  img.style.objectFit = 'cover';
                  return img;
                },
              };
            } else {
              datasets[item.pid].data.push({
                x: this.convertToLocaleDate(item.date),
                y: item.rating_score,
              });
            }
          }
          this.datasets = Object.values(datasets);
          this.loadingChart = false;
        });
      }
    });
  }
}
