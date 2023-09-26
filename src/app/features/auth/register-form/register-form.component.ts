import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {RegisterCredentials} from "../../../core/interfaces/auth/register-credentials";
import {HttpErrorResponse} from "@angular/common/http";
import {MEDIUM_REGEX, STRONG_REGEX} from "../../../core/constants/password";
import {LanguageService} from "../../../core/services/language/language.service";
import {PopupService} from "../../../core/services/popup/popup.service";
import {extractMessage} from "../../../core/utils/apiErrors";

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
      Validators.maxLength(250),
    ]),
  });
  public apiError: string | null = null;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private popupService: PopupService,
  ) {}

  setPasswordPrompt(): string {
    return this.languageService.instant('input.passwordPromptLabel');
  }

  onSubmit() {
    this.apiError = null;

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
      next: (response) => {
        this.router.navigate(["login"]).then();
        this.popupService.createSuccessMessage()

        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.apiError = extractMessage(error);
      }
    })
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
