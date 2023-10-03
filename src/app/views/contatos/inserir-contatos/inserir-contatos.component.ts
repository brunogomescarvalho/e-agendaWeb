import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormContatosViewModel } from '../models/form-contato.view-model';
import { ContatoService } from '../service/contato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent implements OnInit {

  form!: FormGroup

  contato!: FormContatosViewModel

  constructor(private formBuilder: FormBuilder, private service: ContatoService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.contato = this.form.value

    this.service.inserir(this.contato)
      .subscribe(res => { this.router.navigate(['/contatos/listar']); console.log(res) })
  }

  campoValido(campo: string) {

    let campoValido = undefined;

    if (!this.form.get(campo)?.valid && !this.form.get(campo)?.pristine)
      campoValido = false

    if (this.form.get(campo)?.valid)
      campoValido = true

    return campoValido
  }

}
