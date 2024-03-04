import { Component, OnInit } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule } from '@angular/common';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-gallery',
  standalone: true,
  imports: [SettingNavigateComponent, CommonModule , CardVoteComponent],
  templateUrl: './setting-gallery.component.html',
  styleUrl: './setting-gallery.component.scss',
})
export class SettingGalleryComponent implements OnInit {
  public pictures: any[] | null = [];
  public isLoad = false;
  constructor(private fmapi: FacemashApiService , private auth: AuthService , private router: Router) {}

  ngOnInit(): void {
    if(this.auth.currentUserValue === null){
      this.router.navigate(['/login']);
    }
    this.loadUserPictures();
  }

  public loadUserPictures() {
    this.isLoad = true;
    this.fmapi.getMePicture().subscribe((data) => {
      this.pictures = data;
      this.isLoad = false;
    });
  }

  public goAdd(){
    this.router.navigate(['/setting/gallery/add']);
  }


}
