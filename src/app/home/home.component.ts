import { Component } from "@angular/core";
import { ToastrService } from "../shared/toastr.service";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent {
    user: any = {}
    center: any

    constructor(private usersService: UsersService, private toastr: ToastrService){}

    ngOnInit(){
        this.usersService.getUser(+localStorage.getItem('id')!).subscribe(res => {
            this.user = res

            //user location
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            })
        }, error => {
            this.toastr.error("An error has occurred. Please refresh page")
        })
    }
}