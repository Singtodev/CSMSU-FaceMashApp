import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { AuthService } from '../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    SettingNavigateComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit {
  public user: any = null;
  public picUrl: any = null;
  public fullName: any = null;
  public file: File | undefined;

  constructor(private auth: AuthService, private fmapi: FacemashApiService , private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {

    if(this.auth.currentUserValue === null){
      this.router.navigate(['/login']);
    }

    this.user = this.auth.currentUserValue;
    this.picUrl = this.auth.currentUserValue?.avatar_url;
    this.fullName = this.auth.currentUserValue?.full_name;
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.picUrl = reader.result;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    this.fmapi.uploadImage(formData).subscribe(
      (response) => {
        this.picUrl = response.url;
        if(response.url){
          this.fmapi
          .updateUser(this.user.uid, response.url, this.fullName)
          .subscribe(async (data) => {
            console.log('Uploaded image!');
          });
        }
      },
      (error) => {
        // Handle upload error
        console.error('Error uploading file:', error);
      }
    );
  }

  update() {
    if (!this.auth.currentUserValue) return;
    this.fmapi
      .updateUser(this.user.uid, this.picUrl, this.fullName)
      .subscribe(async (data) => {
        window.location.reload();
      });
  }
}
