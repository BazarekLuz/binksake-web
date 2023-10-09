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
  public isLoggedIn: boolean = false;
  private authSubscription?: Subscription;
  public menuItems: MenuItem[] = [];

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
  ) {
    const id = this.authService.getUserId();
    this.menuItems.push({
      label: this.languageService.instant('header.menu.profile'),
      routerLink: `${environment.url}/users/${id}`,
      replaceUrl: true,
    })
    this.menuItems.push({
      label: this.languageService.instant('header.menu.logout'),
      routerLink: `${environment.url}/`,
      command() { authService.logout(); },
    })
  }

  ngOnInit() {
    this.authSubscription = this.authService
      .isAuthObservable()
      .subscribe((val: boolean) => {
        this.isLoggedIn = val;
      })
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  setSignUpButton() {
    return this.languageService.instant('header.register')
  }

  setLoginButton() {
    return this.languageService.instant('header.login')
  }

  protected readonly console = console;
}
