import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/auth/services/usuario.service';
import { FormRegistroUsuarioViewModel } from '../models/form-registro.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { TokenUsuario } from '../../login/models/token.view-model';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  form!: FormGroup
  submitDesabilitado = false
  mostrarCarregamento$!: Observable<boolean>

  constructor
    (private formBuilder: FormBuilder,
      private service: AuthService,
      private toast: ToastrService,
      private router: Router,
      private usuarioService:UsuarioService,
      private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.mostrarCarregamento$ = this.loadingService.estaCarregando()

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, this.validarSenhas]),
      confirmarSenha: new FormControl('', [Validators.required,]),
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
      return;
    }
    this.submitDesabilitado = true
    let novoUsuario: FormRegistroUsuarioViewModel = this.form.value
    this.service.registrar(novoUsuario)
      .subscribe({
        error: (erro: Error) => {
          this.toast.error(erro.message),
          this.submitDesabilitado = false
        },
        next: (usuario) => {
          const tokenUsuario: TokenUsuario = {
            chave: usuario.dados.chave,
            usuario: usuario.dados.usuarioToken,
            dataExpiracao: usuario.dados.dataExpiracao,
          }
          this.usuarioService.logarUsario(tokenUsuario)
          this.toast.success("Usuário cadastrado com sucesso!", "Sucesso")
          this.router.navigate(['/dashboard'])
        }
      })
  }

  validarSenhas(control: FormControl): { [key: string]: boolean } | null {
    const senhaConfirma = control.value;
    const senha = control.parent?.get('senha')?.value;

    if (senha !== senhaConfirma) {
      return { 'senhasDiferentes': true };
    }

    if (senha.length < 6) {
      return { 'senhaMinLength': true };
    }

    const caixaAlta = /[A-Z]/.test(control.value);
    const caixaBaixa = /[a-z]/.test(control.value);

    if (!caixaAlta) {
      return { 'letraCaixaAlta': true };
    }

    if (!caixaBaixa) {
      return { 'letraCaixaBaixa': true };
    }

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const ehValido = regex.test(control.value);

    if (!ehValido) {
      return { 'caracterEspecial': true };
    }

    return null;
  }


}
