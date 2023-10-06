import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../service/contato.service';
import { FormContatosViewModel } from '../models/form-contato-view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {

  contato!: FormContatosViewModel

  idSelecionado?: string

  constructor(private route: ActivatedRoute, private service: ContatoService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id')!
    this.route.data.pipe(map((dados => dados['contato'])))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (res: any) => this.contato = res
      })

  }

  editar(contato: FormContatosViewModel) {
    this.contato = contato
    this.service.editar(this.idSelecionado!, this.contato).subscribe({
      error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
      next: () => {
        this.toast.success('Contato Editado Com Sucesso!', 'Sucesso!'),
          this.router.navigate(['/contatos/listar'])
      }
    })
  }
}


