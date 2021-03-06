import { AccountComponent } from "./account/account.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./shared/auth-guard.service";
import { AddDetailsComponent } from "./user-details/add-details.component";
import { EditDetailsComponent } from "./user-details/edit-details.component";
import { UsersComponent } from "./users/users.component";

export const appRoutes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
    { path: 'users/add/:id', component: AddDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'users/edit/:id', component: EditDetailsComponent, canActivate: [AuthGuardService] }
]