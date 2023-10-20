import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../auth/services/usuario.service';
import { Observable } from 'rxjs';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';
import { AuthService } from '../auth/services/auth.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaColapsada: boolean = true;

  usuarioLogado$!: Observable<TokenUsuario | null>;

  mostrarCarregamento$!: Observable<boolean>

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado()
    this.mostrarCarregamento$ = this.loadingService.estaCarregando()
  }

  sair() {

    this.authService.logout()
      .subscribe(() => this.router.navigate(['/login']))
  }
}
