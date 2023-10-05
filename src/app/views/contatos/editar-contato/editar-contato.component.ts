import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../service/contato.service';
import { FormContatosViewModel } from '../models/form-contato-view-model';
import { ToastrService } from 'ngx-toastr';

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

    this.service.selecionarPorId(this.idSelecionado).subscribe(res => {
      this.contato = res;
    })
  }

  editar(contato: FormContatosViewModel) {
    this.contato = contato
    this.service.editar(this.idSelecionado!, this.contato).subscribe(() => {
      this.toast.success('Contato Editado Com Sucesso!', 'Sucesso!'),
        this.router.navigate(['/contatos/listar'])
    })
  }
}


