import { StatusVoto } from './../../../models/confirmaVoto.model';
import { LoginService } from '../loginServ/login.service';
import { Voto } from './../../../models/voto.model';
import { Candidato } from './../../../models/candidato.model';
import { VotacaoService } from './../votacaoServ/votacao.service';
import { Config } from './../../../models/config.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private service: VotacaoService, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.service.getConfig().subscribe((configServer: Config) => {
      this.config = configServer
      this.candidatos = this.config.resp.candidatos
      for(let candidato of this.candidatos){
        if(candidato.imgCand != ''){
          this.temimagem = true
        }
      }
      this.cpf = this.login.userId
    })
  }

  public votarEmBranco() {
    let timestamp = new Date()
    this.voto = {
      cpf: this.cpf,
      value: "00",
      name: "branco",
      timestamp: timestamp
    }
    this.enviaVoto()
  }

  public votar() {
    let timestamp = new Date()
    this.voto = {
      cpf: this.cpf,
      value: this.candSelect,
      name: this.buscaCandidato().nomeCand,
      timestamp: timestamp
    }
    this.enviaVoto()
  }

  private enviaVoto() {
    this.service.postVoto(this.voto).subscribe(
      response => {
        this.votou = response
        this.mostrarModal()
      }
    )



  }

  private mostrarModal(){
    if (this.votou.status == "200") {
      Swal.fire({

        icon: 'success',

        title: 'Voto computado com sucesso!',

        text: 'Para acessar o resultado, fa??a login a partir de ' + this.montaDataFim(),

        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          this.router.navigateByUrl("login");
        }
      })

    }else{
      Swal.fire({

        icon: 'error',

        title: 'Erro ao votar',

        text: this.votou.mensagem,

        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          this.router.navigateByUrl("login");
        }
      })
    }

  }

  private montaDataFim(){
    let data = new Date(this.config.resp.finalVotacao)
    let minutos: any = String(data.getMinutes())
    if(minutos == "0"){
      minutos = String(minutos) + "0"
    }else if(minutos.length == 1){
      minutos = "0" + String(minutos)
    }
    return `${data.getDate()}/${Number(data.getMonth())+1}/${data.getFullYear()} ??s ${data.getHours()}:${minutos}h`
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
    this.atualizaCandSelecionado()
  }

}
