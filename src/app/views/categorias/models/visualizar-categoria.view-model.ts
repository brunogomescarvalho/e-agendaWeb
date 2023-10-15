import { ListarDespesasViewModel } from "../../despesas/models/listar-despesas.view-model"

export class VisualizarCategoriaViewModel {
    id: string
    titulo: string
    despesas: ListarDespesasViewModel[]

    constructor(id: string, titulo: string, despesas: ListarDespesasViewModel[]) {
        this.id = id
        this.titulo = titulo
        this.despesas = despesas
    }
}