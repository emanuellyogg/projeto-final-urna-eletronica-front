import { Candidato } from './../../../models/candidato.model';
import { VotacaoService } from './../votacaoServ/votacao.service';
import { Config } from './../../../models/config.model';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {
  config: any = []
  candidatos: Candidato[] = []

  constructor(private service: VotacaoService) { }

  ngOnInit(): void {
    this.service.getConfig().subscribe((configServer: Config) => {
      console.log(configServer);
      this.config = configServer
      this.candidatos = this.config.resp.candidatos
      if(this.config.resp.ehAnonima){
        this.escondeCampoCPF()
      }else{
        this.colocaPlaceHolderNoCPF()
      }
      if(this.candidatos[0].imgCand == ""){
        this.ajustarTelaSemImagem()
      }
    })
  }

  public escondeCampoCPF(){

  }

  public colocaPlaceHolderNoCPF(){

  }

  public ajustarTelaSemImagem(){

  }

}
