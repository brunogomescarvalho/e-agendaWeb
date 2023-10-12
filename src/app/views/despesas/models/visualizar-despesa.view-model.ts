export class VisualizarDespesasViewModel {
    id: string
    descricao: string
    valor: number
    data: Date
    formaPagamento: string
    categorias: string[]


    constructor(
        id: string,
        descricao: string,
        valor: number,
        data: Date,
        formaPagamento: string,
        categorias: string[]) {
        this.id = id
        this.descricao = descricao
        this.valor = valor
        this.data = data
        this.formaPagamento = formaPagamento
        this.categorias = categorias
    }
}