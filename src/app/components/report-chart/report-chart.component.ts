import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { Chart, PluginOptionsByType } from 'chart.js/auto';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-report-chart',
  standalone: true,
  imports: [],
  templateUrl: './report-chart.component.html',
  styleUrl: './report-chart.component.scss',
})
export class ReportChartComponent implements OnInit {


  @Input() datasets: any[] = [];

  chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        console.log(this.datasets);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: [],
            datasets: this.datasets,
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    } catch (err) {}
  }
}
