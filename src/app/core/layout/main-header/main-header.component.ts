import { Component } from '@angular/core';
import {LanguageService} from "../../services/language/language.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  constructor(
    private languageService: LanguageService,
  ) {}

  setSignUpButton() {
    return this.languageService.instant('header.register')
  }

  setLoginButton() {
    return this.languageService.instant('header.login')
  }
}
