import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListarContatosViewModel } from 'src/app/views/contatos/models/listar-contato.view-model';
import { FormCompromissoViewModel } from '../../models/form-compromisso.view-model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { TipoLocal } from '../../models/tipoLocal-compromisso';


@Component({
  selector: 'app-formulario-compromisso',
  templateUrl: './formulario-compromisso.component.html',
  styleUrls: ['./formulario-compromisso.component.css']
})
export class FormularioCompromissoComponent implements OnInit {

  @Output() onEnviarCompromisso = new EventEmitter<FormCompromissoViewModel>()

  @Input({ required: true }) titulo!: string

  @Input({ required: true }) contatos!: ListarContatosViewModel[]

  @Input() compromisso!: FormCompromissoViewModel

  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl(0, [Validators.required]),
      local: new FormControl(null, []),
      link: new FormControl(null, [Validators.required]),
      data: new FormControl(null, [Validators.required, this.validarData]),
      horaInicio: new FormControl('08:00', [Validators.required, this.validarHoraInicial]),
      horaTermino: new FormControl('09:00', [Validators.required, this.validarHoraFinal]),
      contatoId: new FormControl('', [Validators.required])
    })
    this.carregarFormulario();
    this.observarCampoTipoLocal();
  }

  onSubmit() {
    if (this.form.valid) {
      this.compromisso = this.form.value
      this.onEnviarCompromisso.emit(this.compromisso)
    }
    else {
      this.mostrarErros()
    }
  }

  private carregarFormulario() {
    if (this.compromisso) {
      const compromissoFormatado = {
        ...this.compromisso,
        data: this.datePipe.transform(this.compromisso.data, 'yyyy-MM-dd', 'UTC')
      };

      this.form.patchValue(compromissoFormatado);
    }
  }

  private mostrarErros(): void {
    this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
  }

  private observarCampoTipoLocal() {
    this.form.get('tipoLocal')!.valueChanges.subscribe((tipoLocal) => {

      this.form.get('link')!.clearValidators();
      this.form.get('local')!.clearValidators();

      if (tipoLocal === TipoLocal.REMOTO) {
        this.form.get('link')!.setValidators([Validators.required]);
        this.form.patchValue({ local: null })

      } else if (tipoLocal === TipoLocal.PRESENCIAL) {
        this.form.get('local')!.setValidators([Validators.required]);
        this.form.patchValue({ link: null })
      }

      this.form.get('link')!.updateValueAndValidity();
      this.form.get('local')!.updateValueAndValidity();
    });

  }

  validarData(control: FormControl): { [key: string]: boolean } | null {
    const horaInicio = control.parent?.get('horaInicio')?.value;

    const dataSelecionada = new Date(`${control.value} ${horaInicio}`);

    const hoje = new Date();

    if (dataSelecionada < hoje) {
      return { 'dataInvalida': true };
    }

    return null;
  }

  validarHoraInicial(control: FormControl): { [key: string]: boolean } | null {
    const data = control.parent?.get('data') as FormControl
    const horaTermino = control.parent?.get('horaTermino') as FormControl

    horaTermino?.updateValueAndValidity()
    data?.updateValueAndValidity();

    return null
  }

  validarHoraFinal(control: FormControl): { [key: string]: boolean } | null {
    const horaInicial = control.parent?.get('horaInicio')?.value
    const horaTermino = control.parent?.get('horaTermino')?.value

    if (horaInicial > horaTermino) {
      return { 'horaInvalida': true };
    }
    return null
  }

}



