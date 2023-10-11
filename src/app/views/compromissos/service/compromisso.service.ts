import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { catchError, map, throwError } from 'rxjs';

@Injectable()
export class CompromissoService {


  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/compromissos'

  constructor(private httpClient: HttpClient) { }

  public inserir(compromisso: FormCompromissoViewModel) {
    return this.httpClient
      .post<FormCompromissoViewModel>(this.endpoint, compromisso)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarTodos() {
    return this.httpClient
      .get<any>(this.endpoint)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }


  public selecionarPorId(id: string) {
    return this.httpClient
      .get<any>(`${this.endpoint}/${id}`)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarCompletoPorId(id: string) {
    const url = `${this.endpoint}/visualizacao-completa/${id}`;

    return this.httpClient
      .get<any>(url)
      .pipe(
        map((res) => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public editar(id: string, compromisso: FormCompromissoViewModel) {
    return this.httpClient
      .put<any>(`${this.endpoint}/${id}`, compromisso)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
  }

  public excluir(id: string) {
    return this.httpClient
      .delete<any>(`${this.endpoint}/${id}`)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
  }


}
