import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../core/services/auth/auth.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  public userId: number | null = null;
  public isLoggedIn!: boolean;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // this.authSubscription = this.authService
    //   .isAuthObservable()
    //   .subscribe((val: boolean) => {
    //     this.isLoggedIn = val;
    //   })
  }
  ngOnDestroy() {
    // this.authSubscription?.unsubscribe();
  }
}
