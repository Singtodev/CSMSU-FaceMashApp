import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import configs from '../../configs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FacemashApiService {
  constructor(private http: HttpClient, private as: AuthService) {}

  public makeHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`,
        'Content-Type': 'application/json',
      },
    };
  }

  public getUserAll(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + '/users'}`;

    const token = this.as.getToken();

    if (!token) return of(null);

    return this.http.get(url, this.makeHeader());
  }

  public getMe(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + '/users/me'}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(url, this.makeHeader());
  }

  public getMePicture(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/picture/me`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(url, this.makeHeader());
  }

  public refreshToken(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + '/auth/refresh_token'}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(url, this.makeHeader());
  }

  public randomPictures(cooldownItems: any[]): Observable<any> {
    let url = `${
      configs.facemashConfig.API_PATH +
      `/picture/random?notshow=${cooldownItems.join(',')}`
    }`;
    return this.http.get(url);
  }

  public getAllPictures(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/picture`}`;
    return this.http.get(url);
  }

  public vote(
    uid: string,
    winnerId: string,
    opponentId: string
  ): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/picture/vote`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.post(
      url,
      {
        uid,
        winnerId,
        opponentId,
      },
      this.makeHeader()
    );
  }

  public updateUser(
    uid: string,
    avatar_url: string,
    full_name: string
  ): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/users/${uid}`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.put(url, { avatar_url, full_name }, this.makeHeader());
  }

  public uploadImage(formData: any): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/firebase/upload`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.post(url, formData, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`,
      },
    });
  }

  public getReport(uid: string = ''): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/report/${uid}`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(url, this.makeHeader());
  }

  public getReportVote(uid: string = ''): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/report/votelog/${uid}`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(url, this.makeHeader());
  }

  public createPicture(name: string, picture: string): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/picture`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.post(
      url,
      {
        name,
        url: picture,
      },
      this.makeHeader()
    );
  }
}
