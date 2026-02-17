import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse{
    success:boolean;
    user?:User;
    accessToken?:string;
    refreshToken?:string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // private userSubject = new BehaviorSubject<User | null>(null);
    // user$ = this.userSubject.asObservable();
    currentUser:User|null=null;

    async login(username: string, password:string): Promise<LoginResponse> {
        if(username==='admin'&&password==='admin'){
            const user:User={username};
            this.currentUser=user;
            return {
                success:true,
                user,
                accessToken:'mock-access-token-405',
                refreshToken:'mock-refresh-token-453'
            };
        }
        //this.userSubject.next(user);
        return { success: false };
    }

    logout(): void {
        this.currentUser = null;
    }

    // get isLoggedIn(): boolean {
    //     return this.userSubject.value !== null;
    // }

    // get user(): User | null {
    //     return this.userSubject.value;
    // }
}