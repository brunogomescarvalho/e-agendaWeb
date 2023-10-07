import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarContatosViewModel } from '../../contatos/models/listar-contato.view-model';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { CompromissoService } from '../service/compromisso.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-compromissos',
  templateUrl: './editar-compromissos.component.html',
  styleUrls: ['./editar-compromissos.component.css']
})
export class EditarCompromissosComponent implements OnInit {

  compromisso!: FormCompromissoViewModel
  contatos!: ListarContatosViewModel[]
  idSelecionado!: string

  constructor(private toast: ToastrService, private route: ActivatedRoute, private compromissoService: CompromissoService, private router: Router) { }

  ngOnInit(): void {

    this.idSelecionado = this.route.snapshot.params['id'];
    this.contatos = this.route.snapshot.data['contatos']
    this.compromisso = this.route.snapshot.data['compromisso']

  }

  editar(compromisso: FormCompromissoViewModel) {
    this.compromisso = compromisso
    this.compromissoService.editar(this.idSelecionado, this.compromisso)
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: () => {
          this.toast.success('Compromisso editado com sucesso!', 'Sucesso')
          this.router.navigate(['/compromissos/listar'])
        }
      })
  }
}


