import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { interceptorToken } from './core/auth/interceptor/token.interceptor';
import './extensions/form-group.extension'
import './extensions/http-error-response.extension';
import { UsuarioService } from './core/auth/services/usuario.service';

export function logarUsuarioSalvoFactory(usuarioService: UsuarioService) {
  return () => usuarioService.logarUsuarioSalvo()
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    DashboardModule,
    CoreModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [UsuarioService],
      multi: true
    },
    provideHttpClient(withInterceptors([interceptorToken]))],

  bootstrap: [AppComponent]
})
export class AppModule { }
