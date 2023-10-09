import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormCategoriaViewModel } from '../../models/form-categoria.view-model';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent implements OnInit {

  form!: FormGroup
  @Input() categoria?: FormCategoriaViewModel
  @Input({ required: true }) titulo!: string
  @Output() onEnviarCategoria = new EventEmitter()

  constructor(private formBuilder: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl(null, [Validators.required])
    })

    this.form.patchValue(this.categoria!)
  }

  onSubmit() {
    if (this.form.valid) {
      this.categoria = this.form.value
      this.onEnviarCategoria.emit(this.categoria)
    }
    else {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
    }
  }


}
