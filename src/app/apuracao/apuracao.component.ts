import { Component, OnInit } from '@angular/core';
import { Voto } from 'models/voto.model';
import { ApuracaoService } from '../apuracaoServ/apuracao.service';

@Component({
  selector: 'app-apuracao',
  templateUrl: './apuracao.component.html',
  styleUrls: ['./apuracao.component.css']
})
export class ApuracaoComponent implements OnInit {
  votos: any [] = [];
  encerrou: boolean = false;

  constructor(private service: ApuracaoService) { }

  ngOnInit(): void {
    this.service.getAllVotos().subscribe((votosServer: Voto[]) => {
      console.table(votosServer)
      this.votos = votosServer
      this.votacaoEncerrada()
    })
  }

  public votacaoEncerrada(){
    var porcentagem: number = 0;

    for (let i = 0; i < this.votos.length; i++) {
      porcentagem = Number(this.votos[0][3]);
      if (porcentagem > 51) {
        this.encerrou = true;
      } else {
        this.encerrou = false;
      }
    }
  }

}
