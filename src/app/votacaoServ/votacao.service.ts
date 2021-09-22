import { Voto } from './../../../models/voto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'models/config.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {
  private urlGet = "http://localhost:3001/config"
  private urlPost = "http://localhost:3001/voto"
  constructor(private httpClient: HttpClient) { }

  public getConfig(): Observable<Config>{
    return this.httpClient.get<Config>(this.urlGet)
  }

  public postVoto(voto: Voto):Observable<any>{
    return this.httpClient.post(this.urlPost, voto).pipe(take(1))
  }


}
