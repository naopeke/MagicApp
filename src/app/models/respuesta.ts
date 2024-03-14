import { Eventos } from "./eventos";

export class Respuesta {

    constructor(
        public error: boolean,
        public codigo: number,
        public mensaje: string,
        public misEventos: Eventos[]
 
        ) { }
}