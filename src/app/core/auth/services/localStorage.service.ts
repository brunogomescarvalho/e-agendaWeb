import { Injectable } from "@angular/core"
import { TokenUsuario } from "src/app/views/login/models/token.view-model"

@Injectable()
export class LocalStorageService {

    public salvarToken(res: any): void {
        const token: TokenUsuario = {
            chave: res.dados.chave,
            usuario: res.dados.usuarioToken,
            dataExpiracao: res.dados.dataExpiracao,
        }

        localStorage.setItem('tokenEAgenda', JSON.stringify(token))
    }


    public obterUsuarioLogado(): TokenUsuario {
        return JSON.parse(localStorage.getItem('tokenEAgenda')!) as TokenUsuario
    }

    public limparDadosLocais() {
        localStorage.removeItem('tokenEAgenda')
    }
}