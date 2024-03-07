import { Component, OnInit } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/api/auth.service';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting-gallery-add',
  standalone: true,
  imports: [SettingNavigateComponent, CommonModule, FormsModule],
  templateUrl: './setting-gallery-add.component.html',
  styleUrl: './setting-gallery-add.component.scss',
})
export class SettingGalleryAddComponent implements OnInit {
  public picUrl: any =
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  public formData: any;
  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router
  ) {}
  public name: string = '';
  ngOnInit(): void {
    if (this.auth.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.picUrl = reader.result;
    };
    reader.readAsDataURL(file);
    this.formData = new FormData();
    this.formData.append('file', file);
  }

  upload() {
    this.fmapi.uploadImage(this.formData).subscribe(
      (response) => {
        this.picUrl = response.url;
        this.fmapi.createPicture(this.name, response.url).subscribe(
          (data) => {
            Swal.fire({
              title: 'Added!',
              text: 'You got new picture!',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#000',
            }).then(()=> {
              this.router.navigate(['/setting/gallery'])
            })
          },
          (error) => {
            console.log(error);
            Swal.fire({
              title: 'Warning!',
              text: error.error.text || error.error,
              icon: 'warning',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#000',
            });
          }
        );
      },
      (error) => {
        console.error('Error uploading file:', error);
        Swal.fire({
          title: 'Warning!',
          text: error.error.error,
          icon: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#000',
        });
      }
    );
  }
}
