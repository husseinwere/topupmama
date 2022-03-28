import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthService {
    BASE_URL: string = "https://reqres.in/api/"

    constructor(private http: HttpClient){}

    login(user: {}){
        return this.http.post(this.BASE_URL + 'login', user)
    }
    register(user: {}){
        return this.http.post(this.BASE_URL + 'register', user)
    }
    isAuthenticated(){
        return !!localStorage.getItem('token')
    }
}