import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import configs from '../../configs';
import { UserResponse } from '../../types/user_model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public user: UserResponse | any = null;

  public isLoggedIn() {
    return this.user != null;
  }

  public setUserLogin(data: UserResponse) {
    this.user = data;
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${configs.facemashConfig.API_PATH}/auth/login`,
      {
        email,
        password,
      }
    );
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token') || null;
    } else {
      // Handle server-side logic here (if needed)
      return '';
    }
  }
  
}
