import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any;
  public inputUser: string = ""

  constructor(private service: LoginService) {}

  ngOnInit(): void {}

  logar() {

    const user = {nmUser: this.inputUser}

    this.service.getUser(user).subscribe((userServer) => {
      console.log(userServer.id);
      this.user = userServer.id
    })

  }

}
