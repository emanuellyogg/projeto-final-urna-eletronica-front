import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'models/config.model';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {
  private urlGet = "http://localhost:3001/config"
  constructor(private httpClient: HttpClient) { }

  public getConfig(): Observable<Config>{
    return this.httpClient.get<Config>(this.urlGet)
  }
}
