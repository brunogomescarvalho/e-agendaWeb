export class FormDespesaViewModel {

    descricao: string
    valor: number
    data: Date
    formaPagamento: string
    categorias: string[]


    constructor(

        descricao: string,
        valor: number,
        data: Date,
        formaPagamento: string,
        categorias: string[]) {

        this.descricao = descricao
        this.valor = valor
        this.data = data
        this.formaPagamento = formaPagamento
        this.categorias = categorias
    }
}