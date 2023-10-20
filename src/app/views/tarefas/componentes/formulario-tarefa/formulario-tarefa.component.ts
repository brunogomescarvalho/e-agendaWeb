import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FormTarefasViewModel, PrioridadeTarefa } from '../../models/tarefas/form-tarefas.view-model';
import { ItemTarefaViewModel, StatusItemTarefa } from '../../models/itens-tarefas/item-tarefa.view-model';
import { ToastrService } from 'ngx-toastr';
import { CardItemTarefa } from '../card-itens-tarefa/card-itens-tarefa.component';

@Component({
  selector: 'app-formulario-tarefa',
  templateUrl: './formulario-tarefa.component.html',
  styleUrls: ['./formulario-tarefa.component.css']
})
export class FormularioTarefaComponent implements OnInit {
  form!: FormGroup;

  prioridadeTarefa: any = []

  itemValido: boolean = true

  @Input() tipoCard!: CardItemTarefa

  @Input() tarefa!: FormTarefasViewModel

  @Input({ required: true }) titulo!: string

  @Output() onEnviarTarefa = new EventEmitter<FormTarefasViewModel>()

  constructor(private formBuilder: FormBuilder, private toast: ToastrService) { }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      titulo: new FormControl(null, [Validators.required]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: this.formBuilder.array([]),
    });

    this.obterEnumPrioridade()

    if (this.tarefa) {
      this.form.patchValue(this.tarefa)
      this.tarefa.itens.forEach(i => this.itens.push(this.formBuilder.group(i)))
    }
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  get itensFiltrados() {
    return Array.from(this.itens.value).filter((x: any) => x.status != StatusItemTarefa.Removido) as ItemTarefaViewModel[]
  }

  adicionarItem(titulo: HTMLInputElement) {
    if (titulo.value == '') {
      this.itemValido = false
      this.toast.error('Informe o título do item')
      return
    }

    const item = new ItemTarefaViewModel("550e8400-e29b-41d4-a716-446655440000", titulo.value, StatusItemTarefa.Adicionado, false)
    this.itens.push(this.formBuilder.group(item));
    titulo.value = ''
    this.itemValido = true

  }

  removerItem(item: ItemTarefaViewModel) {
    item.status = StatusItemTarefa.Removido
  }

  onSubmit() {
    if (this.form.valid) {
      this.tarefa = this.form.value
      this.onEnviarTarefa.emit(this.tarefa)
      return
    }
    this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });

  }

  finalizar(item: ItemTarefaViewModel) {
    item.concluido = !item.concluido
  }


  private obterEnumPrioridade() {
    for (const item in PrioridadeTarefa) {
      if (isNaN(Number(PrioridadeTarefa[item])))
        this.prioridadeTarefa.push({ descricao: PrioridadeTarefa[item], valor: Number(item) });
    }
  }
}
