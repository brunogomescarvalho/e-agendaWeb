import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUsuarioViewModel } from '../models/login.view-model';
import { UsuarioService } from 'src/app/core/auth/services/usuario.service';
import { TokenUsuario } from '../models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  submitDesabilitado = false
  mostrarCarregamento$!: Observable<boolean>

  constructor(private formBuilder: FormBuilder,
    private service: AuthService,
    private toast: ToastrService,
    private router: Router,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.mostrarCarregamento$ = this.loadingService.estaCarregando()

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitDesabilitado = true
      let usuario = new LoginUsuarioViewModel(this.form.value.email, this.form.value.senha)
      this.service.autenticar(usuario)
        .subscribe({
          error: (erro: Error) => {
            this.toast.error(erro.message, 'Usuário não encontrado'),
            this.submitDesabilitado = false
          },
          next: (usuario) => {
            const tokenUsuario: TokenUsuario = {
              chave: usuario.dados.chave,
              usuario: usuario.dados.usuarioToken,
              dataExpiracao: usuario.dados.dataExpiracao,
            }
            this.usuarioService.logarUsario(tokenUsuario)
            this.router.navigate(['/dashboard'])
          }
        })
    }

    else {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
    }
  }

}




