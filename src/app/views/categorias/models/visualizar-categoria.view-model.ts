export class VisualizarCategoriaViewModel {
    id: string
    titulo: string
    despesas: any[]

    constructor(id: string, titulo: string, despesas: any[]) {
        this.id = id
        this.titulo = titulo
        this.despesas = despesas
    }
}