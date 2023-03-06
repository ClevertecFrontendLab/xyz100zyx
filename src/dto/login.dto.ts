export class LoginDto{

    constructor(login: string, password: string){
        this.identifier = login;
        this.password = password
    }

    identifier: string;
    password: string;
}