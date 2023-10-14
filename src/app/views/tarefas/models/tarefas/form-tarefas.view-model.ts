import { ItemTarefaViewModel } from "../itens-tarefas/item-tarefa.view-model"

export class FormTarefasViewModel {   
    titulo: string
    prioridade: PrioridadeTarefa
    itens: ItemTarefaViewModel[]


    constructor(     
        titulo: string,
        prioridade: PrioridadeTarefa,
        itens: ItemTarefaViewModel[]) {
        this.titulo = titulo
        this.prioridade = prioridade
        this.itens = itens
    }
}

export enum PrioridadeTarefa {
    'Baixa', 'Normal', 'Alta'
}