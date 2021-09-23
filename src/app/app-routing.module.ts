import { VotacaoComponent } from './votacao/votacao.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApuracaoComponent } from "./apuracao/apuracao.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "resultado", component: ApuracaoComponent },
  { path: "votacao", component: VotacaoComponent},
  { path: "**", redirectTo: "login"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
