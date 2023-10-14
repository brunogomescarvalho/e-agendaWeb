export class ListarTarefasViewModel {
    id: string
    titulo: string
    dataCriacao: Date
    prioridade: string
    situacao: string

    constructor(id: string,
        titulo: string,
        dataCriacao: Date,
        prioridade: string,
        situacao: string,) {
        this.id = id
        this.titulo = titulo
        this.dataCriacao = dataCriacao
        this.prioridade = prioridade
        this.situacao = situacao
    }



}