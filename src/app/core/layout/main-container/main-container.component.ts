import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  public isLoggedIn!: boolean;
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
    console.log(this.isLoggedIn)
  }
}
