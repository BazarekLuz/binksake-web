import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;

  private authSubscription?: Subscription;
  constructor(
    private authService: AuthService,
  ) {}

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
}
