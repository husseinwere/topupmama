import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../shared/users.service";

@Component({
    templateUrl: './users.component.html'
})

export class UsersComponent {
    users: any
    page: number = 1
    totalPages!: any
    constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false
        this.route.queryParams.subscribe(params => {
            if(params['page']){
                this.page = params['page']
            }
        })

        this.usersService.getUsers(this.page).subscribe((res: any) => {
            console.log(res)
            //for pagination control
            this.totalPages = Array(res['total_pages']).fill(1)
            this.users = res['data']
        })
    }
}