import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router"
import { CategoriaService } from "../service/categoria.service"
import { ListarCategoriasViewModel } from "../models/listar-categorias-view-model"
import { FormCategoriaViewModel } from "../models/form-categoria.view-model";

export const listarCategoriasResolve: ResolveFn<[ListarCategoriasViewModel]> =
    () => { return inject(CategoriaService).selecionarTodos() };

export const buscarCategoriaPorIdResolve: ResolveFn<[FormCategoriaViewModel]> = (route: ActivatedRouteSnapshot) => {
    return inject(CategoriaService).selecionarPorId(route.params['id'])
}

export const buscarCategoriaCompletaPorIdResolve: ResolveFn<[FormCategoriaViewModel]> = (route: ActivatedRouteSnapshot) => {
    return inject(CategoriaService).selecionarCategoriaCompletaPorId(route.params['id'])
}