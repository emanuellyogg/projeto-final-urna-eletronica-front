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
  candSelect: string = ""
  voto: Voto = {
    value: "",
    name: ""
  }
  candSelecionado: Candidato = {
    numCand: "",
    nomeCand: "",
    imgCand: "",
    descCand: ""

  }
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

  public votar() {
    let timestamp = new Date()
    this.voto = {
      cpf: "09657961858",
      value: this.candSelect,
      name: this.buscaCandidato().nomeCand,
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

  private buscaCandidato() {
    let cand: Candidato = {
      nomeCand:"null",
      numCand: "null"
    }
    for (let candidato of this.candidatos) {
      if (candidato.numCand == this.candSelect) {
        cand = candidato
      }
    }

    return cand
  }

  public atualizaCandSelecionado(){

    this.candSelecionado = this.buscaCandidato()
    console.log(this.candSelecionado);

  }

  public limpaSelect(){

    this.candSelect = ""
  }


}
