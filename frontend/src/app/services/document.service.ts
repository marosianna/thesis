import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService{

  protected base: string;
  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router, private tokenServie: TokenService) {
    this.base = environment.backendURL;
  }

  url = 'api/document';

  upload(formData: FormData) {
    return this.httpClient.post<string[]>(this.base + '/' + this.url + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(id: any) {
    return this.httpClient.get(this.base + '/' + this.url + '/download/' + id, {responseType: 'blob'});
  }

  getResultByExaminationId(id: any): Observable<any> {
    return this.httpClient.get(this.base + '/' + this.url + '/result/' + id );
  }
}
