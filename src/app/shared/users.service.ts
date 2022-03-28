import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class UsersService {
    BASE_URL: string = "https://reqres.in/api/"

    constructor(private http: HttpClient){}

    getUser(id: number){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.get(this.BASE_URL + 'users/' + id, { headers: headers })
    }

    getUsers(page?: number){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.get(this.BASE_URL + 'users?page=' + page, { headers: headers })
    }

    updateUser(user: {}){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        let id = +window.localStorage.getItem('id')!
        return this.http.put(this.BASE_URL + 'users/' + id, user, { headers: headers })
    }

    addDetails(details: {}){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.post(this.BASE_URL + 'users', details, { headers: headers })
    }

    updateDetails(details: {}, id: number){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.put(this.BASE_URL + 'users/' + id, details, { headers: headers })
    }

    deleteDetails(id: number){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.delete(this.BASE_URL + 'users/' + id, { headers: headers, observe: 'response' })
    }
}