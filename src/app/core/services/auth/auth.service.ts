import { Injectable } from '@angular/core';
import {Observable, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NavigationStart, Router} from "@angular/router";
import {JwtService} from "../jwt/jwt.service";
import {RegisterCredentials} from "../../interfaces/auth/register-credentials";
import {environment} from "../../../../environments/environment";
import {LoginCredentials} from "../../interfaces/auth/login-credentials";
import {AuthResponse} from "../../interfaces/auth/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject!: Subject<boolean>;
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.authSubject = new Subject<boolean>();
    this.authSubject.next(this.isAuth());

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.authSubject.next(this.isAuth());
      }
    })
  }

  register(credentials: RegisterCredentials): Observable<RegisterCredentials> {
    return this.http
      .post<RegisterCredentials>(`${environment.apiUrl}/users/register`, credentials)
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap((res) => this.handleSetJwt(res)));
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.jwtService.getRefreshToken();

    return this.http
      .post<AuthResponse>(
        `${environment.apiUrl}/refresh-token`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      )
      .pipe(tap((res) => this.handleSetJwt(res)));
  }

  handleSetJwt(response: AuthResponse) {
    if (response?.token) {
      this.jwtService.setToken(response.token);
      this.jwtService.setRefreshToken(response.refreshToken);
    }

    this.authSubject.next(this.isAuth());
    return response;
  }

  refreshAuth() {
    let isAuth = this.isAuth();

    this.authSubject.next(!isAuth);
    this.authSubject.next(isAuth);
  }

  logout() {
    this.jwtService.removeToken();
    this.jwtService.removeRefreshToken();
    this.authSubject.next(false);
    localStorage.setItem('selectedOrganization', '');
    this.router.navigateByUrl('/login').then();
  }

  isAuth(): boolean {
    return this.jwtService.isTokenValid();
  }

  isAuthObservable(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  getUserEmail(): string | null {
    return this.jwtService.getUserEmail();
  }

  getUserId(): number | null {
    return this.jwtService.getUserId();
  }
}
