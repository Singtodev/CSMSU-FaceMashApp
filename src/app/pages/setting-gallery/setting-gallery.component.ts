import { Component, OnInit } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule } from '@angular/common';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';

@Component({
  selector: 'app-setting-gallery',
  standalone: true,
  imports: [SettingNavigateComponent, CommonModule , CardVoteComponent],
  templateUrl: './setting-gallery.component.html',
  styleUrl: './setting-gallery.component.scss',
})
export class SettingGalleryComponent implements OnInit {
  public pictures: any[] | null = [];

  constructor(private fmapi: FacemashApiService) {}

  ngOnInit(): void {
    this.loadUserPictures();
  }

  public loadUserPictures() {
    this.fmapi.getMePicture().subscribe((data) => {
      this.pictures = data;
    });
  }
}
