import { Component } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { ReportChartComponent } from '../../components/report-chart/report-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-report',
  standalone: true,
  imports: [SettingNavigateComponent, ReportChartComponent, CommonModule],
  templateUrl: './setting-report.component.html',
  styleUrl: './setting-report.component.scss',
})
export class SettingReportComponent {
  public datasets = [];
  public user: any = {};
  public loadingChart: boolean = false;

  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  getRandomColor() {
    // Generate random values for RGB (Red, Green, Blue)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Construct the CSS color string
    const color = `rgb(${r},${g},${b})`;

    return color;
  }

  formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options as any);
  }

  ngOnInit(): void {
    if (this.auth?.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
    this.user = this.auth?.currentUserValue;
    this.loadingChart = true;
    if (this.user?.uid != null) {
      this.fmapi.getReport(this.user?.uid).subscribe((data) => {
        let datasets: any = {};
        for (let item of data) {
          if (!datasets[item.pid]) {
            let color = this.getRandomColor();
            datasets[item.pid] = {
              label: item.name,
              data: [{ x: this.formatDate(item.date), y: item.rating_score }],
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
              x: this.formatDate(item.date),
              y: item.rating_score,
            });
          }
        }
        this.datasets = Object.values(datasets);
        this.loadingChart = false;
      });
    }
  }
}
