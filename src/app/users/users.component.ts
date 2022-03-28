import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "../shared/toastr.service";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './users.component.html'
})

export class UsersComponent {
    users: any
    page: number = 1
    totalPages!: any
    constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

    ngOnInit(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false
        this.route.queryParams.subscribe(params => {
            if(params['page']){
                this.page = params['page']
            }
        })

        this.usersService.getUsers(this.page).subscribe((res: any) => {
            //for pagination control
            this.totalPages = Array(res['total_pages']).fill(1)
            this.users = res['data']
        })
    }

    deleteDetails(id: number){
        if(window.confirm("Delete user details?")){
            this.usersService.deleteDetails(id).subscribe((response: any) => {
                if(response.status == 204){
                    this.toastr.success("Details deleted successfully.")
                }
                else {
                    this.toastr.error("An error has occurred. Please try again")
                }
            },(error: any)=>{
                this.toastr.error("An error has occurred. Please try again")
            })
        }
    }
}