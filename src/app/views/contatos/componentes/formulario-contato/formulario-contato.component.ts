import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormContatosViewModel } from '../../models/form-contato-view-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-contato',
  templateUrl: './formulario-contato.component.html',
  styleUrls: ['./formulario-contato.component.css']
})
export class FormularioContatoComponent implements OnInit {

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
      empresa: new FormControl('', [Validators.required]),
      favorito: new FormControl(false, [Validators.required]),
    })
    if (this.contato)
      this.form.patchValue(this.contato!)
  }

  onSubmit() {
    if (this.form.valid) {
      this.contato = this.form.value
      this.onEnviarContato.emit(this.contato)
    }
    else
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
  }

}
