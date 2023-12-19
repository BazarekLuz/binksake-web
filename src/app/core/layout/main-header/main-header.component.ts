import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language/language.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {MenuItem} from "primeng/api";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  public userId: number | null = null;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
  ) {
    const id = this.authService.getUserId();
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
  }

  ngOnDestroy() {
  }

  setSignUpButton() {
    return this.languageService.instant('header.register')
  }

  setLoginButton() {
    return this.languageService.instant('header.login')
  }

  setLogoutButton() {
    return this.languageService.instant('header.logout')
  }

  logoutAction() {
    this.authService.logout();
  }
}
