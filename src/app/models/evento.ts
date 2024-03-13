import { User } from "./user";

export class Evento {

    constructor(
        public id_event?: number,
        public title?: string,
        public descriptionEvent?: string,
        public date?: Date,
        public hour?: string,
        public place?: string,
        public direction?: string,
        public participation?: boolean,
        public participants?: User[],
        public id_user?: number,
        ) { }

}
