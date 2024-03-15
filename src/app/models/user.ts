export class User {
    constructor(
        public id_user: number,
        public nameUser: string,
        public emailUser: string,
        public passwordUser: string,
        public icon?: string,
        public avatar?: string
        // añadir
        // public description?: string
 
        ) { }
}
