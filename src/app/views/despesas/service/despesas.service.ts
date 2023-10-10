import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { FormDespesaViewModel } from '../models/form-despesa.view-model';

@Injectable()

export class DespesasService {

  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas'

  constructor(private httpService: HttpClient) { }

  public selecionarTodos() {
    return this.httpService.get<any>(this.endpoint)
      .pipe(map(res => res.dados))
  }

  public inserir(despesa: FormDespesaViewModel) {
    return this.httpService.post(this.endpoint, despesa)
  }

  public selecionarPorId(id: string) {
    return this.httpService.get<any>(`${this.endpoint}/${id}`)
      .pipe(
        map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro())
      )
  }

  public editar(id: string, despesa: FormDespesaViewModel) {
    return this.httpService
        .put<FormDespesaViewModel>(`${this.endpoint}/${id}`, despesa)
        .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()));
}
}
