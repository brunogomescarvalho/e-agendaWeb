import { Injectable } from '@angular/core';
import { FormRegistroUsuarioViewModel } from '../models/form-registro.view-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/registrar'
  constructor(private httpService: HttpClient) { }

  public registrar(despesa: FormRegistroUsuarioViewModel) {
    return this.httpService.post(this.endpoint, despesa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))

  }
}
