import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'models/config.model';
import Swal from 'sweetalert2';
import { LoginService } from '../loginServ/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any;
  public inputUser: string = '';
  public config: any = [];
  public inicioVotacao: any;
  public finalVotacao: any;
  public horaAtual: any;
  public horaValida: any;
  public votacaoInic: boolean = true;

  constructor(private service: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.service.getConfig().subscribe((configServer: Config) => {
      this.config = configServer;

      this.inicioVotacao = new Date(this.config.resp.inicioVotacao);
      this.finalVotacao = new Date(this.config.resp.finalVotacao);

      this.validarHorarioVotacao();
    });
  }

  validarHorarioVotacao() {
    this.horaAtual = new Date();

    if (
      this.horaAtual > this.inicioVotacao &&
      this.horaAtual < this.finalVotacao
    ) {
      this.horaValida = 'valida';
    } else {
      if (this.horaAtual < this.inicioVotacao) {
        this.horaValida = 'naoIniciada';
        this.votacaoInic = false;
      }
      if (this.horaAtual > this.finalVotacao) {
        this.horaValida = 'finalizada';
      }
    }
  }

  logar() {
    const user = { nmUser: this.inputUser };

    this.service.getUser(user).subscribe((userServer) => {
      console.log(userServer.id);
      this.user = userServer.id;

      console.log(user);


      this.validarUser()
    });

  }

  validarUser() {

    if (this.user == 'invalido') {
      console.log('Usuário inválido');
      this.alertUserInvalido()
      return;
    }

    this.service.receberUser(this.user)

    this.chamarTelas()
  }

  alertUserInvalido(){
    Swal.fire({
      title: 'Erro!',
      text: 'Usuário inválido',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: `Fechar`,
      cancelButtonColor: '#d33',
      showConfirmButton: false
    })
  }

  chamarTelas() {


    if (this.horaValida == 'valida') {
      this.router.navigateByUrl("votacao");

    } else if (this.horaValida == 'finalizada') {
      this.router.navigateByUrl("resultado");
    }
  }
}
