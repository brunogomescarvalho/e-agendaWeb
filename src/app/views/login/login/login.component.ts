import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUsuarioViewModel } from '../models/login.view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private service: LoginService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.form.valid) {
      let usuario = new LoginUsuarioViewModel(this.form.value.email, this.form.value.senha)
      this.service.autenticar(usuario)
        .subscribe({
          error: (Error) => this.toast.error(Error),
          next: () => this.router.navigate(['/dashboard'])
        })
    }

    else {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
    }
  }

}




