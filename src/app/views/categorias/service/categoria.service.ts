import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { FormCategoriaViewModel } from '../models/form-categoria.view-model';

@Injectable()

export class CategoriaService {

  private endpoint = 'https://e-agenda-web-api.onrender.com/api/categorias'

  constructor(private httpService: HttpClient) { }


  public selecionarTodos() {
    return this.httpService
      .get<any>(this.endpoint)
      .pipe(map(res => res.dados),
      catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarCategoriaCompletaPorId(id: string) {
    return this.httpService
      .get<any>(this.endpoint + '/visualizacao-completa/' + id)
      .pipe(map(res => res.dados),
      catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarPorId(id: string) {
    return this.httpService
      .get<any>(`${this.endpoint}/${id}`)
      .pipe(map(res => res.dados), catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public inserir(categoria: FormCategoriaViewModel) {
    return this.httpService
      .post<FormCategoriaViewModel>(this.endpoint, categoria)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public editar(id: string, categoria: FormCategoriaViewModel) {
    return this.httpService
      .put(`${this.endpoint}/${id}`, categoria)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public excluir(id: string) {
    return this.httpService
      .delete(`${this.endpoint}/${id}`)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }



}
