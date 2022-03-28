import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { timeInterval } from "rxjs";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "../shared/toastr.service";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    isAuthenticated: boolean = false
    timeLeft!: string
    timeInterval: any
    
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){}

    ngOnInit(){
        let thisClass = this
        this.timeInterval = setInterval(() => {
            thisClass.isAuthenticated = thisClass.authService.isAuthenticated()
            if(thisClass.isAuthenticated){
                let expiry = +localStorage.getItem('startTime')! + 600000
                let now = new Date().getTime()
                let distance = expiry - now             
                let minutes:any = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                let seconds: any = Math.floor((distance % (1000 * 60)) / 1000)
                if(seconds/10 < 1){
                    seconds = '0'+seconds
                }
                if(minutes/10 < 1){
                    minutes = '0'+minutes
                }

                thisClass.timeLeft = minutes + ":" + seconds
                
                if(distance < 0) {
                    clearInterval(thisClass.timeInterval)
                    thisClass.timeLeft = "EXPIRED"
                    thisClass.refreshLogin()
                }
            }
        }, 1000)
    }

    refreshLogin(){
        let start = new Date().getTime() + ''
        localStorage.setItem('startTime', start)
        this.ngOnInit()
    }

    logout(){
        localStorage.clear()
        this.toastr.info("You have been logged out")
        this.timeLeft = ""
        this.router.navigate(['/login'])
    }
}