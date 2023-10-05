import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ListarContatosViewModel } from 'src/app/views/contatos/models/listar-contato.view-model';
import { FormCompromissoViewModel } from '../../models/form-compromisso.view-model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-compromisso',
  templateUrl: './formulario-compromisso.component.html',
  styleUrls: ['./formulario-compromisso.component.css']
})
export class FormularioCompromissoComponent implements OnInit, OnChanges {

  @Output() onEnviarCompromisso = new EventEmitter<FormCompromissoViewModel>()

  @Input({ required: true }) titulo!: string

  @Input({ required: true }) contatos!: ListarContatosViewModel[]

  @Input() compromisso!: FormCompromissoViewModel

  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes['compromisso']) {

      const compromissoFormatado = {
        ...this.compromisso,
        data: this.datePipe.transform(this.compromisso.data, 'yyyy-MM-dd')
      };

      this.form.patchValue(compromissoFormatado);
    }

  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl(0, [Validators.required]),
      local: new FormControl('', []),
      link: new FormControl('', [Validators.required]),
      data: new FormControl(new Date(), [this.validarData]),
      horaInicio: new FormControl('08:00', [Validators.required]),
      horaTermino: new FormControl('09:00', [Validators.required]),
      contatoId: new FormControl('', [Validators.required])
    })

    this.observarCampoTipoLocal()
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

  private mostrarErros(): void {
    let camposParaValidar = [
      { campo: 'assunto', mensagem: '* Assunto é obrigatorio' },
      { campo: 'tipoLocal', mensagem: '* Tipo local é obrigatorio' },
      { campo: 'link', mensagem: '* Link é obrigatorio' },
      { campo: 'local', mensagem: '* Local é obrigatorio' },
      { campo: 'data', mensagem: '* Data Inválida' },
      { campo: 'horaInicial', mensagem: '* Hora Inicial é obrigatorio' },
      { campo: 'horaTermino', mensagem: '* Hora Término é obrigatorio' },
      { campo: 'contatoId', mensagem: '* Contato é obrigatorio' },
    ];

    let erros: string[] = [];

    for (let item of camposParaValidar) {
      if (this.form.get(item.campo)?.invalid)
        erros.push(item.mensagem);
    }

    this.toast.error(erros.join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
  }

  private observarCampoTipoLocal() {
    this.form.get('tipoLocal')!.valueChanges.subscribe((tipoLocal) => {

      this.form.get('link')!.clearValidators();
      this.form.get('local')!.clearValidators();

      if (tipoLocal === 0) {
        this.form.get('link')!.setValidators([Validators.required]);
      } else if (tipoLocal === 1) {
        this.form.get('local')!.setValidators([Validators.required]);
      }

      this.form.get('link')!.updateValueAndValidity();
      this.form.get('local')!.updateValueAndValidity();
    });
  }

  validarData(control: AbstractControl): { [key: string]: any } | null {
    const dataSelecionada = new Date(control.value);
    const hoje = new Date();

    if (dataSelecionada < hoje) {
      return { 'dataInvalida': true };
    }

    return null;
  }


}



