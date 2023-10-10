import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ListarDespesasViewModel } from "../models/listar-despesas.view-model";
import { inject } from "@angular/core";
import { DespesasService } from "../service/despesas.service";

export const selecionarTodasDespesasResolve: ResolveFn<[ListarDespesasViewModel]> = () => {
    return inject(DespesasService).selecionarTodos()
}

export const selecionarDespesasPorId: ResolveFn<[ListarDespesasViewModel]> = (route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarPorId(route.params['id'])
}