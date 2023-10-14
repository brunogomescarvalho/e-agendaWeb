import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarioService/usuario.service';
import { Observable } from 'rxjs';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaColapsada: boolean = true;

  usuarioLogado!: Observable<TokenUsuario | null>;

  tokenValido: boolean = false

  constructor(private router: Router, private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuarioLogado()
    this.tokenValido = this.usuarioService.tokenValido()
  }

  sair() {

    localStorage.removeItem('tokenEAgenda')
    this.router.navigate(['/login'])
    this.tokenValido = false

  }
}
