import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroCompromisso } from '../../models/filtroCompromisso.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filtro-compromissos',
  templateUrl: './filtro-compromissos.modal.component.html',
  styleUrls: ['./filtro-compromissos.modal.component.css']
})
export class FiltroCompromissosModalComponent implements OnInit {

  form!: FormGroup

  @Input() abrirFiltro?: EventEmitter<boolean>

  filtro = {} as FiltroCompromisso

  opcaoFiltro: string[] = ['Hoje', 'Passados', 'Futuros']

  @Output() onEnviarFiltro = new EventEmitter<FiltroCompromisso>()

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private toast: ToastrService) { }

  @ViewChild('content', { static: true }) contentTemplate!: TemplateRef<any>;

  ngOnInit(): void {

    this.abrirFiltro?.asObservable().subscribe(() => {
      this.modalService.open(this.contentTemplate)
    })

    this.form = this.formBuilder.group({
      Data_Inicial: new FormControl(null),
      Data_Final: new FormControl(null),
      Data: new FormControl(null),
      opcaoSelecionada: new FormControl(null),
    })
    this.observarCampos()
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
      return
    }

    this.filtro = this.form.value

    this.onEnviarFiltro.emit(this.filtro)

    this.modalService.dismissAll()
  }

  private observarCampos() {
    this.form.get('opcaoSelecionada')?.valueChanges.subscribe((opcaoSelecionada) => {
      this.form.get('Data_Inicial')?.clearValidators();
      this.form.get('Data_Final')?.clearValidators();
      this.form.get('Data')?.clearValidators();

      if (opcaoSelecionada === 'Passados') {
        this.form.get('Data')?.setValidators([Validators.required]);
        this.form.patchValue({ Data_Inicial: null })
        this.form.patchValue({ Data_Final: null })

      } else if (opcaoSelecionada === 'Futuros') {
        this.form.get('Data_Inicial')?.setValidators([Validators.required]);
        this.form.get('Data_Final')?.setValidators([Validators.required]);
        this.form.patchValue({ Data: null })
      }

      this.form.get('Data_Inicial')?.updateValueAndValidity();
      this.form.get('Data_Final')?.updateValueAndValidity();
      this.form.get('Data')?.updateValueAndValidity();
    });
  }
}
