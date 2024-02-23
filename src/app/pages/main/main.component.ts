import { Component, OnInit } from '@angular/core';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {

  constructor(private fmapi: FacemashApiService) {}

  public pictures: any[] = [];

  ngOnInit() {
    this.fmapi.getAll().subscribe((data) => {
      this.pictures = data;
    })
  }

}
