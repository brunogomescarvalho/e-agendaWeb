import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { FormDespesaViewModel } from '../models/form-despesa.view-model';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';
import { VisualizarDespesasViewModel } from '../models/visualizar-despesa.view-model';

@Injectable()

export class DespesasService {

  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas'

  constructor(private httpService: HttpClient) { }

  public selecionarTodos(): Observable<ListarDespesasViewModel[]> {
    return this.httpService.get<any>(this.endpoint)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarAntigas(): Observable<ListarDespesasViewModel[]> {
    return this.httpService.get<any>(this.endpoint + '/antigas')
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarUltimos30Dias(): Observable<ListarDespesasViewModel[]> {
    return this.httpService
      .get<any>(this.endpoint + '/ultimos-30-dias')
      .pipe(map(res => res.dados), catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public inserir(despesa: FormDespesaViewModel) {
    return this.httpService.post(this.endpoint, despesa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))

  }

  public selecionarPorId(id: string): Observable<FormDespesaViewModel> {
    return this.httpService.get<any>(`${this.endpoint}/${id}`)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarDespesaCompletaPorId(id: string): Observable<VisualizarDespesasViewModel> {
    return this.httpService.get<any>(`${this.endpoint}/visualizacao-completa/${id}`)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro())
      )
  }

  public editar(id: string, despesa: FormDespesaViewModel) {
    return this.httpService
      .put<FormDespesaViewModel>(`${this.endpoint}/${id}`, despesa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
  }

  public excluir(id: string) {
    return this.httpService
      .delete<any>(`${this.endpoint}/${id}`)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
  }
}
