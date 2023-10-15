export class FormRegistroUsuarioViewModel {

    nome: string
    email: string
    senha: string
    confirmarSenha: string

    constructor(
        nome: string,
        email: string,
        senha: string,
        confirmarSenha: string
    ) {
        this.nome = nome
        this.email = email
        this.senha = senha
        this.confirmarSenha = confirmarSenha
    }

}