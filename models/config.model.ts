import { Candidato } from "./candidato.model";

export interface Config{
  ehAnonima: boolean,
  inicioVotacao: string,
  finalVotacao: string,
  candidatos: Candidato[]
}
