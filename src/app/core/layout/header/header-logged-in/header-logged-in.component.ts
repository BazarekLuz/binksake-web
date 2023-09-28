import { Component } from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {LanguageService} from "../../../services/language/language.service";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss']
})
export class HeaderLoggedInComponent {
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
}
