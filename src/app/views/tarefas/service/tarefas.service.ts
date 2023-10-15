import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { FormTarefasViewModel } from '../models/tarefas/form-tarefas.view-model';
import { StatusTarefa } from '../models/tarefas/status-tarefa.enum';


@Injectable()

export class TarefasService {

  private endpoint = 'https://e-agenda-web-api.onrender.com/api/tarefas'

  constructor(private httpService: HttpClient) { }


  public selecionarTodos(status: StatusTarefa) {
    return this.httpService
      .get<any>(this.endpoint + `?status=${status}`)
      .pipe(map(res => res.dados),
        catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public selecionarTarefaCompletaPorId(id: string) {
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

  public inserir(tarefa: FormTarefasViewModel) {
    return this.httpService
      .post<FormTarefasViewModel>(this.endpoint, tarefa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public editar(id: string, tarefa: FormTarefasViewModel) {
    return this.httpService
      .put(`${this.endpoint}/${id}`, tarefa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }

  public excluir(id: string) {
    return this.httpService
      .delete(`${this.endpoint}/${id}`)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))
  }



}
