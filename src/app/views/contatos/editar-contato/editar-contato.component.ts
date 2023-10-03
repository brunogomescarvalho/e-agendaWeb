import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormContatosViewModel } from '../models/form-contato.view-model';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup

  contato!: FormContatosViewModel

  idSelecionado?: string

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private service: ContatoService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl('')
    })

    this.idSelecionado = this.route.snapshot.paramMap.get('id')!

    this.service.selecionarPorId(this.idSelecionado).subscribe(res => {
      this.contato = res;
      this.form.patchValue(this.contato)
    })
  }

  onSubmit() {
    this.contato = this.form.value

    this.service.editar(this.idSelecionado!, this.contato)
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
