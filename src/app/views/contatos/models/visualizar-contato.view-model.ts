import { ListaCompromissosViewModel } from "../../compromissos/models/listar-compromissos.view-model";

export class VisualizarContatoViewModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
  favorito: boolean;
  compromissos: ListaCompromissosViewModel[]

  constructor(
    id: string,
    nome: string,
    email: string,
    telefone: string,
    cargo: string,
    empresa: string,
    favorito: boolean,
    compromissos: ListaCompromissosViewModel[]
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;
    this.favorito = favorito
    this.compromissos = compromissos
  }
}