import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { map } from 'rxjs';

@Injectable()
export class CompromissoService {


  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/compromissos'

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  constructor(private httpClient: HttpClient) { }

  public inserir(compromisso: FormCompromissoViewModel) {
    return this.httpClient.post<FormCompromissoViewModel>(this.endpoint, compromisso, this.obterHeadersAutorizacao())
  }

  public selecionarTodos() {
    return this.httpClient.get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados))
  }

  public selecionarPorId(id: string) {
    return this.httpClient.get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados))
  }

  public editar(id: string, compromisso: FormCompromissoViewModel) {
    return this.httpClient.put<any>(`${this.endpoint}/${id}`, compromisso, this.obterHeadersAutorizacao())
  }
}
