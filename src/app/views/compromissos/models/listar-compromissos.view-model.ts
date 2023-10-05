export class ListaCompromissosViewModel {
    id: string;
    assunto: string;
    data: Date;
    horaInicio: string;
    horaTermino: string;
    nomeContato: string;

    constructor(
        id: string,
        assunto: string,
        data: Date,
        horaInicio: string,
        horaTermino: string,
        nomeContato: string,
    ) {
        this.id = id
        this.assunto = assunto
        this.data = data
        this.horaInicio = horaInicio
        this.horaTermino = horaTermino
        this.nomeContato = nomeContato
    }
}