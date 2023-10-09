import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Observable, catchError, map, throwError } from "rxjs";
import { VisualizarContatoViewModel } from "../models/visualizar-contato.view-model";
import { FormContatosViewModel } from "../models/form-contato-view-model";

@Injectable()

export class ContatoService {

    constructor(private httpClient: HttpClient) { }

    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos'

    private obterHeadersAutorizacao() {
        const token = environment.apiKey;

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        };
    }

    public inserir(contato: FormContatosViewModel) {
        return this.httpClient
            .post<FormContatosViewModel>(this.endpoint, contato, this.obterHeadersAutorizacao())
            .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
    }

    public selecionarTodos() {
        return this.httpClient
            .get<any>(this.endpoint, this.obterHeadersAutorizacao())
            .pipe(
                map((res) => res.dados),
                catchError((erro: HttpErrorResponse) => erro.processarErro()))
    }

    public selecionarPorId(id: string): Observable<FormContatosViewModel> {
        return this.httpClient
            .get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
            .pipe(
                map((res) => res.dados),
                catchError((erro: HttpErrorResponse) => erro.processarErro()))
    }

    public selecionarContatoCompletoPorId(id: string): Observable<VisualizarContatoViewModel> {
        return this.httpClient
            .get<any>(this.endpoint + '/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
            .pipe(
                map((res) => res.dados),
                catchError((erro: HttpErrorResponse) => erro.processarErro()))
    }

    public editar(id: string, contato: FormContatosViewModel) {
        return this.httpClient
            .put<any>(`${this.endpoint}/${id}`, contato, this.obterHeadersAutorizacao())
            .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
    }

    public excluir(id: string) {
        return this.httpClient
            .delete<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
            .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
    }

   

}