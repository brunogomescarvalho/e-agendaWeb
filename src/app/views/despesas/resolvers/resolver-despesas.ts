import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ListarDespesasViewModel } from "../models/listar-despesas.view-model";
import { inject } from "@angular/core";
import { DespesasService } from "../service/despesas.service";
import { FormDespesaViewModel } from "../models/form-despesa.view-model";
import { VisualizarDespesasViewModel } from "../models/visualizar-despesa.view-model";

export const selecionarTodasDespesasResolve: ResolveFn<ListarDespesasViewModel[]> = () => {
    return inject(DespesasService).selecionarTodos()
}

export const selecionarDespesasPorId: ResolveFn<FormDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarPorId(route.params['id'])
}

export const visualizarDespesaCompletaResolve: ResolveFn<VisualizarDespesasViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarDespesaCompletaPorId(route.params['id'])
}