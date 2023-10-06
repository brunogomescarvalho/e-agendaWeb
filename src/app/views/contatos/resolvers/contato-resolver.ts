import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { FormContatosViewModel } from "../models/form-contato-view-model";
import { ContatoService } from "../service/contato.service";
import { ListarContatosViewModel } from "../models/listar-contato.view-model";

export const formContatoResolve: ResolveFn<FormContatosViewModel> =
    (route: ActivatedRouteSnapshot) => {
        return inject(ContatoService).selecionarPorId(route.paramMap.get('id')!);
    };

export const listarContatoResolve: ResolveFn<ListarContatosViewModel> =
    () => { return inject(ContatoService).selecionarTodos() }

export const contatoCompletoResolve: ResolveFn<FormContatosViewModel> =
    (route: ActivatedRouteSnapshot) => {
        return inject(ContatoService).selecionarContatoCompletoPorId(route.paramMap.get('id')!);
    };

