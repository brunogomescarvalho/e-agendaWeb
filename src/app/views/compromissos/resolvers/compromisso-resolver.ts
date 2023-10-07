import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { FormCompromissoViewModel } from "../models/form-compromisso.view-model";
import { CompromissoService } from "../service/compromisso.service";
import { ListaCompromissosViewModel } from "../models/listar-compromissos.view-model";

export const formCompromissoResolve: ResolveFn<[FormCompromissoViewModel]> =
    (route: ActivatedRouteSnapshot) => {
        return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!)
    };

export const listarCompromissoResolve: ResolveFn<[ListaCompromissosViewModel]> =
    (route: ActivatedRouteSnapshot) => {
        return inject(CompromissoService).selecionarTodos()
    };

export const compromissoCompletoResolve: ResolveFn<[ListaCompromissosViewModel]> =
    (route: ActivatedRouteSnapshot) => {
        return inject(CompromissoService).selecionarCompletoPorId(route.paramMap.get('id')!)
    };