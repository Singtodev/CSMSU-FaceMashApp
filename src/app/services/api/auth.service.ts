import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, map } from 'rxjs';
import configs from '../../configs';
import { UserResponse } from '../../types/user_model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserResponse | null>;
  public currentUser: Observable<UserResponse | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public user: UserResponse | any = null;

  public get currentUserValue(): UserResponse | null {
    return this.currentUserSubject.value;
  }


  public setUser(user: UserResponse | null): void {
    this.currentUserSubject.next(user);
  }

  public logout(){
    sessionStorage.clear();
  }

  public goLogin(){
    this.router.navigate(["login"]);
  }

  public goRegister(){
    this.router.navigate(["register"]);
  }

  public goHome(){
    this.router.navigate(['']);
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
