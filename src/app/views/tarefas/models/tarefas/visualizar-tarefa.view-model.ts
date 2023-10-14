import { VisualizarItensViewModel } from "../itens-tarefas/visualizar-itens.viewl-model"

export class VisualizarTarefasViewModel {
    id: string
    titulo: string
    dataCriacao: Date
    dataConclusao: Date
    quantidadeItens: number
    percentualConcluido: number
    prioridade: string
    situacao: string
    itens: VisualizarItensViewModel[]

    constructor(
        id: string,
        titulo: string,
        dataCriacao: Date,
        dataConclusao: Date,
        quantidadeItens: number,
        percentualConcluido: number,
        prioridade: string,
        situacao: string,
        itens: VisualizarItensViewModel[]
    ) {
        this.id = id
        this.titulo = titulo
        this.dataCriacao = dataCriacao
        this.dataConclusao = dataConclusao
        this.quantidadeItens = quantidadeItens
        this.percentualConcluido = percentualConcluido
        this.prioridade = prioridade
        this.situacao = situacao
        this.itens = itens
    }
}