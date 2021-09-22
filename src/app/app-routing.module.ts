import { VotacaoComponent } from './votacao/votacao.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApuracaoComponent } from "./apuracao/apuracao.component";

export const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "resultado", component: ApuracaoComponent },
  { path: "votacao", component: VotacaoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
