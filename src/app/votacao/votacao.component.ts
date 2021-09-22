import { Voto } from './../../../models/voto.model';
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
  voto: Voto = {
    value: "",
    name: ""
  }
  candSelecionado: string = ""
  cpf: string = ""
  votou: {} = {}
  msgVoto: string = ""

  constructor(private service: VotacaoService) { }

  ngOnInit(): void {
    this.service.getConfig().subscribe((configServer: Config) => {
      this.config = configServer
      this.candidatos = this.config.resp.candidatos
      this.cpf = ""
    })
  }

  public colocaPlaceHolderNoCPF() {

  }

  public votarEmBranco() {
    let timestamp = new Date()
    this.voto = {
      cpf: "",
      value: "00",
      name: "branco",
      timestamp: timestamp
    }
    this.enviaVoto()
  }

  public votar(){
    let timestamp = new Date()
    this.voto = {
      cpf: "09667961858",
      value: this.candSelecionado,
      name: this.buscaNomeCandidato(),
      timestamp: timestamp
    }
    this.enviaVoto()
  }

  private enviaVoto() {
    console.log(this.voto);
    this.service.postVoto(this.voto).subscribe(
      response => {
        if (response.Status == "200") {
          this.votou = true
        }
        this.msgVoto = response.Mensagem
      }
    )
  }

  private buscaNomeCandidato(){
    let nome:string = ""
    for(let candidato of this.candidatos){
      if(candidato.numCand == this.candSelecionado){
        nome = candidato.nomeCand
      }
    }
    if(nome == ""){
      nome = "null"
    }
    return nome
  }
}
