import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FormContatosViewModel } from "../models/form-contato-view-model";
import { map } from "rxjs";

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
        return this.httpClient.post<FormContatosViewModel>(this.endpoint, contato, this.obterHeadersAutorizacao())
    }

    public selecionarTodos() {
        return this.httpClient.get<any>(this.endpoint, this.obterHeadersAutorizacao())
            .pipe(
                map((res => res.dados))
            )
    }
}