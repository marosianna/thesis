import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseRequestService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  

  protected baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = environment.backendURL;
  }

  protected sendPost<T>(url: string, body: any = {}, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/${url}`, body, this.getHeaders(headers));
  }

  protected sendPut<T>(url: string, body?: any, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}/${url}`, body, this.getHeaders(headers));
  }

  protected sendGet<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}`, this.getHeaders(headers));
  }

  protected sendDelete(url: string, headers?: HttpHeaders): Observable<object> {
    return this.httpClient.delete(`${this.baseUrl}/${url}`, this.getHeaders(headers));
  }

  private getHeaders(headers: HttpHeaders | undefined) {
    if(headers) {
      let httpOptions = this.httpOptions;
      for(let key in headers.keys) {
        httpOptions.headers.append(key, headers.get(key)||'')
      }
      return httpOptions;
    }
    return this.httpOptions;
  }

}
