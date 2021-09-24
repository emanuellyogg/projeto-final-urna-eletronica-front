import { StatusVoto } from './../../../models/confirmaVoto.model';
import { LoginService } from '../loginServ/login.service';
import { Voto } from './../../../models/voto.model';
import { Candidato } from './../../../models/candidato.model';
import { VotacaoService } from './../votacaoServ/votacao.service';
import { Config } from './../../../models/config.model';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {
  temimagem: boolean = false
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
  votou: StatusVoto = {}
  msgVoto: string = ""

  constructor(private service: VotacaoService, private login: LoginService) { }

  ngOnInit(): void {
    this.service.getConfig().subscribe((configServer: Config) => {
      this.config = configServer
      this.candidatos = this.config.resp.candidatos
      for(let candidato of this.candidatos){
        if(candidato.imgCand != ''){
          this.temimagem = true
        }
      }
      this.cpf = ""
    })
  }

  public colocaPlaceHolderNoCPF() {

  }

  public votarEmBranco() {
    let timestamp = new Date()
    this.voto = {
      cpf: "125",
      value: "00",
      name: "branco",
      timestamp: timestamp
    }
    this.enviaVoto()
  }

  public votar() {
    let timestamp = new Date()
    this.voto = {
      cpf: "125",
      value: this.candSelect,
      name: this.buscaCandidato().nomeCand,
      timestamp: timestamp
    }
    console.log(this.voto);

    this.enviaVoto()
  }

  private enviaVoto() {
    this.service.postVoto(this.voto).subscribe(
      response => {
        this.votou = response
        this.mostrarModal()
        console.log(this.votou);
      }
    )



  }

  private mostrarModal(){
    if (this.votou.status == "200") {
      Swal.fire({

        icon: 'success',

        title: 'Voto computado com sucesso!',

        text: 'Para acessar o resultado, faça login a partir de' + this.montaDataFim(),

        showConfirmButton: true
      })

    }else{
      Swal.fire({

        icon: 'error',

        title: 'Erro ao votar',

        text: this.votou.mensagem,

        showConfirmButton: true
      })
    }

  }

  private montaDataFim(){
    let data = new Date(this.config.resp.finalVotacao)
    return data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + " às " + data.getHours() + ":" + data.getMinutes()
  }

  private buscaCandidato() {
    let cand: Candidato = {
      nomeCand:"null",
      numCand: "null",
      imgCand: "",
      descCand: ""
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

  }

  public limpaSelect(){

    this.candSelect = ""
  }


}
