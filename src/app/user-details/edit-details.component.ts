import { Component } from "@angular/core";
import { ToastrService } from "../shared/toastr.service";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './edit-details.component.html'
})

export class EditDetailsComponent {
    editProcess: boolean = false

    constructor(private usersService: UsersService, private toastr: ToastrService){}

    editDetails(details: {}){
        this.editProcess = true
        this.usersService.addDetails(details).subscribe((res: any)=>{
            this.editProcess = false
            if(res['name']){
                this.toastr.success("Details updated successfully")
            }
            else {
                this.toastr.error("An error has occurred. Please try again.")
            }
        }, (error: any)=>{
            this.editProcess = false
            this.toastr.error("An error has occurred. Please try again.")
        })
    }
}