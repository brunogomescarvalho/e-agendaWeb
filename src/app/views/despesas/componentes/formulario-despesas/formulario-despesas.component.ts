import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDespesaViewModel } from '../../models/form-despesa.view-model';
import { ToastrService } from 'ngx-toastr';
import { ListarCategoriasViewModel } from 'src/app/views/categorias/models/listar-categorias-view-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-despesas',
  templateUrl: './formulario-despesas.component.html',
  styleUrls: ['./formulario-despesas.component.css']
})
export class FormularioDespesasComponent implements OnInit {

  @Output() onEnviarDespesa = new EventEmitter<FormDespesaViewModel>()

  @Input({ required: true }) titulo!: string

  form!: FormGroup

  @Input() despesa?: FormDespesaViewModel

  @Input() categorias!: ListarCategoriasViewModel[]

  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private datePipe: DatePipe) { }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      formaPagamento: new FormControl(null, [Validators.required]),
      categoriasSelecionadas: new FormControl(null, [this.validarCategoria]),
    })

    if (this.despesa) {
      let despesaFormatada = {
        ...this.despesa,
        data: this.datePipe.transform(this.despesa.data, 'yyyy-MM-dd')
      }
      this.form.patchValue(despesaFormatada)
    }

  }


  onSubmit() {
    if (this.form.valid) {
      this.despesa = this.form.value
      this.onEnviarDespesa.emit(this.despesa)
    }
    else
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
  }

  validarCategoria(control: AbstractControl): { [key: string]: boolean } | null {
    let categorias = []

    if (control.value)
      categorias = Array.from(control.value)

    if (categorias.length == 0) {
      return { 'categoriaDespesaNaoSelecionada': true };
    }

    return null;
  }

}
