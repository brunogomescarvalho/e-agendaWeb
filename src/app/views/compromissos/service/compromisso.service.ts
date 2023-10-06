import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { catchError, map, throwError } from 'rxjs';

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
      .pipe(catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }

  public selecionarTodos() {
    return this.httpClient.get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }


  public selecionarPorId(id: string) {
    return this.httpClient.get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }

  public selecionarCompletoPorId(id: string) {
    const url = `${this.endpoint}/visualizacao-completa/${id}`
    return this.httpClient.get<any>(url, this.obterHeadersAutorizacao())
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }

  public editar(id: string, compromisso: FormCompromissoViewModel) {
    return this.httpClient.put<any>(`${this.endpoint}/${id}`, compromisso, this.obterHeadersAutorizacao())
      .pipe(catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }

  public excluir(id: string) {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(catchError((erro: HttpErrorResponse) => throwError(() => this.processarErro(erro))))
  }

  private processarErro(erro: HttpErrorResponse): Error {
    let messagemErro!: string

    if (!erro)
      return new Error('Erro inesperado.')

    switch (erro.status) {
      case 0:
        messagemErro = 'Ocorreu um erro ao efetuar a requisição.'
        break
      case 401:
        messagemErro = 'Usuário sem permissão. Efetue login e tente novamente.'
        break
      default:
        messagemErro = erro.error[0]
    }

    return new Error(messagemErro)

  }
}
