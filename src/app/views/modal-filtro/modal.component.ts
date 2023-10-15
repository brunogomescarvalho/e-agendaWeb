import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
 
})
export class ModalComponent implements OnInit {

  @ViewChild('content', { static: true }) contentTemplate!: TemplateRef<any>

  @Input() onAbrirModalFiltro!: EventEmitter<boolean>

  @Output() onEnviarFiltro = new EventEmitter()

  @Input({ required: true }) opcoesFiltro!: any[]

  @Input({ required: true }) tipo!: string

  opcaoSelecionada!: number

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.onAbrirModalFiltro?.asObservable().subscribe(() => {
      this.modalService.open(this.contentTemplate)
    })
  }

  filtrar() {
    this.onEnviarFiltro.emit(this.opcaoSelecionada);
    this.modalService.dismissAll()
  }
}

