import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { AuthService } from '../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Router } from '@angular/router';

import Toastify from 'toastify-js';
import Swal from 'sweetalert2';

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
  public step: number = 0;

  public pwdNew: string = '';
  public pwdOld: string = '';
  public pwdConfirm: string = '';

  public menus = ['Profile', 'Change Password'];

  constructor(
    private auth: AuthService,
    private fmapi: FacemashApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  setStep(step: number) {
    this.step = step;
  }

  loadUser() {
    if (this.auth.currentUserValue === null) {
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

    try{
      this.fmapi.removePicture(this.user.avatar_url).subscribe((data)=> {
        console.log(data);
      })
    }catch(err){
      console.log(err);
    }
    
    this.fmapi.uploadImage(formData).subscribe(
      (response) => {
        this.picUrl = response.url;
        if (response.url) {
          this.fmapi
            .updateUser(this.user.uid, response.url, this.fullName)
            .subscribe(async (data) => {
              Swal.fire({
                title: 'Upload Avatar Success!',
                text: 'System need to reload page',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#000',
              }).then(() => {
                window.location.reload();
              });
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

  updatePassword() {
    if (
      this.pwdNew.length == 0 ||
      this.pwdOld.length == 0 ||
      this.pwdConfirm.length == 0
    ) {
      return Toastify({
        text: 'Field is empty',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right,  #3D6CC9 , #0037FF)',
        },
        onClick: function () {},
      }).showToast();
    }

    if (this.pwdNew === this.pwdOld) {
      return Toastify({
        text: 'New password not equal old pwd!',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right,  #3D6CC9 , #0037FF)',
        },
        onClick: function () {},
      }).showToast();
    }

    if (this.pwdNew !== this.pwdConfirm) {
      return Toastify({
        text: 'Please check your input password is not match',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right,  #3D6CC9 , #0037FF)',
        },
        onClick: function () {},
      }).showToast();
    }

    this.fmapi.updatePassword(this.pwdOld, this.pwdNew).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'Password Change!',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#000',
        }).then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        if (error.error.msg) {
          return Toastify({
            text: error.error.msg,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
              background: 'linear-gradient(to right,  #C93D3D , #FFFB00)',
            },
            onClick: function () {},
          }).showToast();
        }
      }
    );
  }
}
