import { Component } from "@angular/core";
import { ToastrService } from "../shared/toastr.service";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './account.component.html'
})

export class AccountComponent {
    user: any = {}
    updateProcess: boolean = false

    constructor(private usersService: UsersService, private toastr: ToastrService){}

    ngOnInit(){
        this.usersService.getUser(+localStorage.getItem('id')!).subscribe((res:any)=>{
            this.user = res.data
        })
    }

    updateAccount(account: {}){
        this.updateProcess = true
        this.usersService.updateUser(account).subscribe((res:any)=>{
            this.updateProcess = false
            if(res['updatedAt']){
                this.toastr.success("Details updated successfully")
            }
            else {
                this.toastr.error("An error has occurred. Please try again")
            }
        }, (error)=>{
            this.updateProcess = false
            this.toastr.error("An error has occurred. Please try again")
        })
    }
}