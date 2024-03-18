export class Response {
    constructor(
        public err?: boolean,
        public code?: string,
        public message?: string,
        public data?: any
       ){}
}
