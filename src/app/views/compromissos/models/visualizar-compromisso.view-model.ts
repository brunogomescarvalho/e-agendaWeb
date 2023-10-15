import { ListarContatosViewModel } from "../../contatos/models/listar-contato.view-model";
import { TipoLocal } from "./tipoLocal-compromisso";



export class VisualizarCompromissoViewModel {
    id: string;
    assunto: string
    local: string
    tipoLocal
    link: string
    data: Date
    horaInicio: string
    horaTermino: string
    contato: ListarContatosViewModel

    constructor(
        id: string,
        assunto: string,
        local: string,
        tipoLocal: TipoLocal,
        link: string,
        data: Date,
        horaInicio: string,
        horaTermino: string,
        contato: ListarContatosViewModel
    ) {
        this.id = id
        this.assunto = assunto
        this.local = local
        this.tipoLocal = tipoLocal
        this.link = link
        this.data = data
        this.horaInicio = horaInicio
        this.horaTermino = horaTermino
        this.contato = contato
    }
}