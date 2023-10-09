import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth/auth.service";
import {LoginCredentials} from "../../../core/interfaces/auth/login-credentials";
import {HttpErrorResponse} from "@angular/common/http";
import {extractMessage} from "../../../core/utils/apiErrors";
import {LanguageService} from "../../../core/services/language/language.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  apiError: string = '';
  isLoading: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService,
    private messageService: MessageService,
  ) {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials: LoginCredentials = {
      email: this.email?.value || '',
      password: this.password?.value || '',
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response?.token) {
          this.router.navigate(['/']).then();
        }

        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.apiError = extractMessage(error);
        this.messageService.add({severity: "error", summary: this.languageService.instant(this.apiError), life: 1000 * 15})
    },
    });
  }

  setEmailPlaceholder() {
    return this.languageService.instant('input.loginPlaceholderEmail');
  }

  setPasswordPlaceholder() {
    return this.languageService.instant('input.loginPlaceholderPassword');
  }

  setEmailRequired() {
    return this.languageService.instant('input.emailRequired');
  }

  setPasswordRequired() {
    return this.languageService.instant('input.passwordRequired');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
