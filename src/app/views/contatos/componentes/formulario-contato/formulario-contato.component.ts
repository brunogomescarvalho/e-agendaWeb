import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormContatosViewModel } from '../../models/form-contato-view-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-contato',
  templateUrl: './formulario-contato.component.html',
  styleUrls: ['./formulario-contato.component.css']
})
export class FormularioContatoComponent implements OnInit, OnChanges {

  @Output() onEnviarContato = new EventEmitter<FormContatosViewModel>()
  @Input({ required: true }) titulo!: string
  @Input() contato?: FormContatosViewModel
  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.form = this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required])
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes['contato']) {
      this.form.patchValue(this.contato!)
    }
  }

  onSubmit() {
    if (this.form.valid) {

      this.contato = this.form.value
      this.onEnviarContato.emit(this.contato)
    }
    else {
      this.mostrarErros();
      this.form.reset()
    }
  }

  campoValido(campo: string): boolean | undefined {

    let campoValido = undefined;

    if (!this.form.get(campo)?.valid && !this.form.get(campo)?.pristine)
      campoValido = false

    if (this.form.get(campo)?.valid)
      campoValido = true

    return campoValido
  }

  private mostrarErros(): void {
    let camposParaValidar = [
      { campo: 'nome', mensagem: '* Nome é obrigatorio' },
      { campo: 'email', mensagem: '* E-mail é obrigatorio' },
      { campo: 'telefone', mensagem: '* Telefone é obrigatorio' },
      { campo: 'cargo', mensagem: '* Cargo é obrigatorio' },
      { campo: 'empresa', mensagem: '* Empresa é obrigatorio' },
    ];

    let erros: string[] = [];

    for (let item of camposParaValidar) {
      if (this.form.get(item.campo)?.invalid)
        erros.push(item.mensagem);
    }

    this.toast.error(erros.join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
  }


}
