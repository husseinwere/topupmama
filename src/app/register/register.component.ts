import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    email!: string
    password!: string
    passwordVisibility: boolean = false
    registerProcess: boolean = false
    responseData!: any
    serverError!: boolean
    @ViewChild('passwordInput') pass!: ElementRef

    constructor(private authService: AuthService, private router: Router){}

    showPassword(){
        this.pass.nativeElement.setAttribute("type", "text")
        this.passwordVisibility = true
    }

    hidePassword(){
        this.pass.nativeElement.setAttribute("type", "password")
        this.passwordVisibility = false
    }

    register(user: {}){
        this.registerProcess = true
        this.serverError = false
        this.authService.register(user).subscribe(res => {
            this.responseData = res
            if(this.responseData.token){
                localStorage.setItem('token', this.responseData.token)
                localStorage.setItem('id', this.responseData.id)
                let start = new Date().getTime() + ''
                localStorage.setItem('startTime', start)

                this.router.navigate(['/'])
            }
            else {
                this.registerProcess = false
                this.serverError = true
            }
        }, error => {
            this.serverError = true
        })
    }
}