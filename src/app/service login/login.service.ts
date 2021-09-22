import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'models/login.model';
import { map } from 'rxjs/operators';
import { Config } from 'models/config.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private url = 'http://localhost:3001/validaUsuario';

  constructor(private httpClient: HttpClient) {}

  public getUser(user: any): Observable<User> {
    return this.httpClient.post<User>(this.url, user).pipe(
      map((res) => {
        return res as User;
      })
    );
  }

  private urlGet = "http://localhost:3001/config"

  public getConfig(): Observable<Config>{
    return this.httpClient.get<Config>(this.urlGet)
  }
}

