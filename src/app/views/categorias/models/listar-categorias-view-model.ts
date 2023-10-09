export class ListarCategoriasViewModel {
    id: string
    titulo: string

    constructor(id: string, titulo: string, despesas: any[]) {
        this.id = id
        this.titulo = titulo
    }
}