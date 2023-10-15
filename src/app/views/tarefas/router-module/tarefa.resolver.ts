import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";

import { ListarTarefasViewModel } from "../models/tarefas/listar-tarefa.view-model";
import { TarefasService } from "../service/tarefas.service";
import { FormTarefasViewModel } from "../models/tarefas/form-tarefas.view-model";
import { VisualizarTarefasViewModel } from "../models/tarefas/visualizar-tarefa.view-model";
import { StatusTarefa } from "../models/tarefas/status-tarefa.enum";

export const listarTarefasResolve: ResolveFn<ListarTarefasViewModel[]> =
    () => { return inject(TarefasService).selecionarTodos(StatusTarefa.Todos) };

export const buscarTarefaPorIdResolve: ResolveFn<[FormTarefasViewModel]> = (route: ActivatedRouteSnapshot) => {
    return inject(TarefasService).selecionarPorId(route.params['id'])
}

export const buscarTarefaCompletaPorIdResolve: ResolveFn<[VisualizarTarefasViewModel]> = (route: ActivatedRouteSnapshot) => {
    return inject(TarefasService).selecionarTarefaCompletaPorId(route.params['id'])
}