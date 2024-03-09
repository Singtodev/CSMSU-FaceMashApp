import { Component, OnInit } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/api/auth.service';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-setting-gallery-edit',
  standalone: true,
  imports: [SettingNavigateComponent, CommonModule, FormsModule],
  templateUrl: './setting-gallery-edit.component.html',
  styleUrl: './setting-gallery-edit.component.scss',
})
export class SettingGalleryEditComponent {
  public picUrl: any =
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  public formData: any;
  public pid: any;

  public pictureRef: any;

  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router,
    private ac: ActivatedRoute
  ) {}

  public name: string = '';

  ngOnInit(): void {
    this.ac.paramMap.subscribe((value: any) => {
      this.pid = value.params.id || null;
      if (this.auth.currentUserValue === null) {
        this.router.navigate(['/login']);
      }
      this.loadImage();
    });
  }

  public loadImage = () => {
    this.fmapi.getPicById(this.pid).subscribe(
      (data) => {
        this.picUrl = data.picture.url;
        this.pictureRef = data.picture.url;
        this.name = data.picture.name;
      },
      (error: any) => {
        Swal.fire({
          title: 'Warning!',
          text: error.error.text || error.error,
          icon: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#000',
        });
      }
    );
  };

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

  update(): void {
    if (this.formData) {

      try{
        this.fmapi.removePicture(this.pictureRef).subscribe((data)=> {
          console.log(data);
        })
      }catch(err){
        console.log(err);
      }

      this.fmapi.uploadImage(this.formData).subscribe(
        (response) => {
          this.picUrl = response.url;
          this.sendRequest(response.url);
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
      return;
    }
    this.sendRequest(this.picUrl);
  }

  sendRequest(url: string) {
    this.fmapi.updatePicture(this.name, url, this.pid).subscribe(
      (data) => {
        Swal.fire({
          title: 'Updated!',
          text: 'You got updated picture!',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#000',
        }).then(() => {
          this.router.navigate(['/setting/gallery']);
        });
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
  }
}
