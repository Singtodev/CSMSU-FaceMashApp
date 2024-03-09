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

  public getUserById(uid: string): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + '/users/id/'+ uid}`;
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

  public getPicById(id: string): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/picture/id/${id}`}`;
    return this.http.get(url, this.makeHeader());
  }

  public getReportPicById(id: string): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/report/picture/id/${id}`}`;
    return this.http.get(url, this.makeHeader());
  }

  public updatePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/auth/reset_password`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.post(
      url,
      {
        oldPassword,
        newPassword,
      },
      this.makeHeader()
    );
  }

  public getDateRank(): Observable<any> {
    let url = `${configs.facemashConfig.API_PATH + `/report/toprank/date`}`;
    return this.http.get(url);
  }

  public updatePicture(
    name: string,
    url: string,
    pid: string
  ): Observable<any> {
    let urlRequest = `${configs.facemashConfig.API_PATH + `/picture/${pid}`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.put(urlRequest, { name, url }, this.makeHeader());
  }

  public removePicture(
    url: string,
  ): Observable<any> {
    let urlRequest = `${configs.facemashConfig.API_PATH + `/firebase/delete`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.post(urlRequest, { url }, this.makeHeader());
  }

  public getVoteDelay(
  ): Observable<any> {
    let urlRequest = `${configs.facemashConfig.API_PATH + `/cooldown/${configs.facemashConfig.APP_ID}`}`;
    const token = this.as.getToken();
    if (!token) return of(null);
    return this.http.get(urlRequest,this.makeHeader());
  }

  public updateVoteDelay(
    time: number
    ): Observable<any> {
      let urlRequest = `${configs.facemashConfig.API_PATH + `/cooldown/${configs.facemashConfig.APP_ID}`}`;
      const token = this.as.getToken();
      if (!token) return of(null);
      return this.http.put(urlRequest,{app_vote_delay: time},this.makeHeader());
    }
}
