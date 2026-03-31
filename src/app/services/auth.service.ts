import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UserDto } from "../models/user.model";
import { of } from "rxjs";
import { tap } from 'rxjs/operators';
import { environment } from "../../environments/env";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    currentUser = this.currentUserSubject.asObservable();


    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                this.currentUserSubject.next(JSON.parse(savedUser));
            } catch (e) {
                this.currentUserSubject.next({ user: { userName: savedUser } } as any);
            }
        }
    }

    register(userData: RegisterRequest): Observable<RegisterResponse> {
        let result = this.http.post<RegisterResponse>(`${environment.reg}`, userData);
        return result;
    }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.auth}`, credentials).pipe(
            tap((response: LoginResponse) => {
                localStorage.setItem('user', response.user.userName);
                localStorage.setItem('accessToken', response.accessToken);
                this.currentUserSubject.next(response);
            })
        );
    }
    isLoggedIn(): Boolean {
        return this.currentUserSubject.value !== null;
        // return !!localStorage.getItem('accessToken');
    }
    getusername(): string {
        const val = this.currentUserSubject.value as any;
        return val?.user?.userName || '';
    }
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        this.currentUserSubject.next(null);
    }

    // get isLoggedIn(): boolean {
    //     return this.userSubject.value !== null;
    // }

    // get user(): User | null {
    //     return this.userSubject.value;
    // }
}