import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {RegisterCredentials} from "../../../core/interfaces/auth/register-credentials";
import {HttpErrorResponse} from "@angular/common/http";
import {MEDIUM_REGEX, STRONG_REGEX} from "../../../core/constants/password";
import {LanguageService} from "../../../core/services/language/language.service";
import {extractMessage} from "../../../core/utils/apiErrors";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  public apiError: string = '';
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private messageService: MessageService,
  ) {}

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials: RegisterCredentials = {
      email: this.email?.value || '',
      name: this.name?.value || '',
      password: this.password?.value || '',
    };

    this.authService.register(credentials).subscribe({
      next: () => {
        this.messageService.add({severity: "success", summary: this.languageService.instant("register.createdSuccess")});
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.apiError = extractMessage(error);
        this.messageService.add({severity: "error", summary: this.languageService.instant(this.apiError), life: 1000 * 15});
        this.isLoading = false;
      },
      complete: () => {
        this.registerForm.reset();
      }
    })
  }

  setPasswordPrompt() {
    return this.languageService.instant('input.passwordPromptLabel');
  }

  setEmailRequired() {
    return this.languageService.instant('input.emailRequired');
  }

  setEmailError() {
    return this.languageService.instant('input.emailError');

  }

  setUsernameRequired() {
    return this.languageService.instant('input.userNameRequired');
  }

  setUsernameMin() {
    return this.languageService.instant('input.userNameMin');
  }

  setUsernameMax() {
    return this.languageService.instant('input.userNameMax');
  }

  setPasswordRequired() {
    return this.languageService.instant('input.passwordRequired');
  }

  setPasswordMin() {
    return this.languageService.instant('input.passwordMin');
  }

  setEmailPlaceholder() {
    return this.languageService.instant('input.placeholderEmail')
  }

  setNamePlaceholder() {
    return this.languageService.instant('input.placeholderName')
  }

  setPasswordPlaceholder() {
    return this.languageService.instant('input.placeholderPassword')
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  protected readonly MEDIUM_REGEX = MEDIUM_REGEX;
  protected readonly STRONG_REGEX = STRONG_REGEX;
}
