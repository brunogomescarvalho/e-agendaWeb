export class ListarContatosViewModel {
    id: string;
    nome: string;
    telefone: string;
    cargo: string;
    empresa: string;
    favorito: boolean


    constructor(id: string, nome: string, telefone: string, cargo: string, empresa: string) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.cargo = cargo
        this.empresa = empresa
        this.favorito = false
    }
}