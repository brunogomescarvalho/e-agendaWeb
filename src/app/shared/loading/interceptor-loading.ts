import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "./loading.service";
import { finalize } from "rxjs";


export const interceptorLoading = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const loadingService = inject(LoadingService)

  loadingService.mostrarCarregamento();

  return next(request).pipe(finalize(() => loadingService.ocultarCarregamento()))
}