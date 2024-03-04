import { Component, OnInit } from '@angular/core';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/api/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';
import { ReportChartComponent } from '../../components/report-chart/report-chart.component';

@Component({
  selector: 'app-picture-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    CardVoteComponent,
    ReportChartComponent,
  ],
  templateUrl: './picture-detail.component.html',
  styleUrl: './picture-detail.component.scss',
})
export class PictureDetailComponent implements OnInit {
  constructor(
    private fmapi: FacemashApiService,
    private location: Location,
    private ac: ActivatedRoute
  ) {}

  public picture: any;
  public others: any[] = [];
  public id: any = null;
  public datasets: any[] = [];
  public loadingChart: boolean = false;

  ngOnInit() {
    this.loadId();
  }

  async loadId() {
    this.ac.paramMap.subscribe((value: any) => {
      this.id = value.params.id || null;
      this.loadPic();
      this.loadGraph();
    });
  }

  async loadPic() {
    this.fmapi.getPicById(this.id).subscribe((data) => {
      if (data) {
        this.picture = data.picture || null;
        this.others = data.others_picture || [];
      }
    });
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

  async loadGraph() {
    this.loadingChart = true;
    await this.fmapi.getReportPicById(this.id).subscribe((data) => {
      let datasets: any = {};
      for (let item of data) {
        if (!datasets[item.pid]) {
          let color = this.getRandomColor();
          datasets[item.pid] = {
            label: item.name,
            data: [{ x: this.convertToLocaleDate(item.date), y: item.rank }],
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
            y: item.rank,
          });
        }
      }
      this.datasets = Object.values(datasets);
      this.loadingChart = false;
    });
  }

  getDifferenceRank(): number | null {
    if (!this.picture) return null;

    let length = this.datasets[0]?.data?.length;

    if (length == null || length === 0) {
      // Return a default value or handle the case where there is no data
      return 0;
    }

    let lastIndex = length - 1;
    let todayRank = this.picture?.rank;
    let yesterdayRank = this.datasets[0]?.data[lastIndex]?.y;

    if (todayRank == null || yesterdayRank == null) {
      // Return a default value or handle the case where either today's or yesterday's rank is nullish
      return null;
    }

    // Perform the calculation
    return todayRank - yesterdayRank;
  }

  getPlus(num: any) {
    if (num == null) return;
    return Math.abs(num);
  }

  goBack() {
    this.location.back();
  }
}
