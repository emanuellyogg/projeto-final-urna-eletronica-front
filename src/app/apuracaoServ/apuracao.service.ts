import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voto } from 'models/voto.model';

@Injectable({
  providedIn: 'root'
})

export class ApuracaoService {
  private _listaVotos: any[] = [];
  private url = "http://localhost:3001/apuracao";

  constructor(private httpClient: HttpClient) { }

  public getAllVotos(): Observable<Voto[]> {
    return this.httpClient.get<Voto[]>(this.url)
  }

  public get listaVotos(): any[] {
    return this._listaVotos;
  }
  public set listaVotos(value: any[]) {
    this._listaVotos = value;
  }
}
