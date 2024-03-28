import { User } from "./user";

export class Eventos {

    constructor(
        public id_event?: number,
        public nameEvent?: string,
        public descriptionEvent?: string,
        public date?: Date,
        public hour?: string,
        public place?: string,
        public direction?: string,
        public creator?: string,
        public id_user?: number,
        public participants?: User[],
        public avatar?: string,
        public creatorEvent?: number
        ) { }

}