import { Component } from "@angular/core";
import { ToastrService } from "../shared/toastr.service";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './add-details.component.html'
})

export class AddDetailsComponent {
    addProcess: boolean = false

    constructor(private usersService: UsersService, private toastr: ToastrService){}

    addDetails(details: {}){
        this.addProcess = true
        this.usersService.addDetails(details).subscribe((res: any)=>{
            this.addProcess = false
            if(res['name']){
                this.toastr.success("Details added successfully")
            }
            else {
                this.toastr.error("An error has occurred. Please try again.")
            }
        }, (error: any)=>{
            this.addProcess = false
            this.toastr.error("An error has occurred. Please try again.")
        })
    }
}