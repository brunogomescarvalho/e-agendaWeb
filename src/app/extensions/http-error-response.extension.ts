import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

declare module '@angular/common/http' {
    interface HttpErrorResponse {
        processarErro(): Observable<any>
    }
}

HttpErrorResponse.prototype.processarErro = function () {
    let messagemErro!: string;

    if (!this) {
        return throwError(() => new Error('Erro inesperado.'));
    }

    switch (this.status) {
        case 0:
            messagemErro = 'Ocorreu um erro ao efetuar a requisição.';
            break;
        case 401:
            messagemErro = 'Usuário sem permissão. Efetue login e tente novamente.';
            break;
        default:
            messagemErro = this.error.erros[0]
    }

    return throwError(() => new Error(messagemErro));
}