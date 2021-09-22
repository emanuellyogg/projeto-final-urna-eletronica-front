import { Component, OnInit } from '@angular/core';
import { Config } from 'models/config.model';
import { LoginService } from '../service login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any;
  public inputUser: string = ""
  public config: any = []
  public inicioVotacao: any 
  public finalVotacao: any

  constructor(private service: LoginService) {}

  ngOnInit(): void {
    
    this.service.getConfig().subscribe((configServer: Config) => {
      this.config = configServer

      console.log(this.config);
      console.log(typeof(this.config.resp.inicioVotacao));
      console.log(this.config.resp.finalVotacao);

      this.inicioVotacao = new Date(this.config.resp.inicioVotacao) 
      this.finalVotacao = new Date(this.config.resp.finalVotacao) 

      console.log(this.inicioVotacao);
      console.log(this.finalVotacao);
      

    })
  }

  logar() {

    const user = {nmUser: this.inputUser}

    this.service.getUser(user).subscribe((userServer) => {
      console.log(userServer.id);
      this.user = userServer.id
    })

  }
}
